import React, { useState, useEffect } from "react";
import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getUsers, deleteUser } from "../service/api";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;

const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 20px;
  }
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchQualification, setSearchQualification] = useState("");

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    let response = await getUsers();
    setAllUsers(response.data);
    setUsers(response.data);
  };

  const deleteUserDetails = async (id) => {
    await deleteUser(id);
    getAllUser();
  };

  const handleSearch = () => {
    let filteredUsers = allUsers;
    if (searchName) {
      filteredUsers = filteredUsers.filter((user) =>
        user.Name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchQualification) {
      filteredUsers = filteredUsers.filter((user) =>
        user.Qualification.toLowerCase().includes(
          searchQualification.toLowerCase()
        )
      );
    }
    if (filteredUsers.length === 0) {
      alert("No data found");
    } else {
      setUsers(filteredUsers);
    }
  };

  const handleClearSearch = () => {
    setSearchName(""); // Clear searchName
    setSearchQualification(""); // Clear searchQualification
    setUsers(allUsers); // Reset users to allUsers
  };

  return (
    <Grid container spacing={2}>
      <Typography
        variant="h4"
        color="blue"
        align="center"
        marginLeft={70}
        marginTop={5}
      >
        Find Students & Edit/Delete Detail
      </Typography>
      <Grid item xs={12} sm={6} marginTop={2}>
        <TextField
          fullWidth
          className="search1"
          label="Search by name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} marginTop={2}>
        <TextField
          fullWidth
          label="Search by qualification"
          variant="outlined"
          value={searchQualification}
          onChange={(e) => setSearchQualification(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px", marginLeft: "650px" }}
        >
          Search
        </Button>
        <Button
          onClick={handleClearSearch}
          variant="contained"
          color="secondary"
        >
          Clear Search
        </Button>
      </Grid>

      {users.length > 0 && (
        <Grid item xs={12}>
          <Paper elevation={3}>
            <StyledTable>
              <TableHead>
                <THead>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell></TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TBody key={user._id}>
                    {/* ... Other cells ... */}
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell>{user.DOB}</TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>{user.Address}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ marginRight: 10 }}
                        component={Link}
                        to={`/edit/${user._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteUserDetails(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TBody>
                ))}
              </TableBody>
            </StyledTable>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default AllUsers;
