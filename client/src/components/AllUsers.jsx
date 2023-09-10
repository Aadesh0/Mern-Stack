import React, { useEffect, useState } from "react";
import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  styled,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getUsers } from "../service/api";
import VisibilityIcon from "@mui/icons-material/Visibility";

//import { Link } from "react-router-dom";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  {
    /*
   const deleteUserDetails = async (id) => {
    await deleteUser(id);
    getAllUser();
  }; 
  */
  }

  const handleViewFile = (fileURL) => {
    setSelectedFile(fileURL);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
  };

  return (
    <Grid container spacing={2} item xs={12}>
      <Typography
        variant="h4"
        color="blue"
        align="center"
        marginLeft={70}
        marginTop={5}
        fontStyle="Bold"
      >
        Students Detail Landing Page
      </Typography>
      {users.length > 0 && (
        <Grid item xs={15}>
          <Paper elevation={10}>
            <StyledTable>
              <TableHead>
                <THead>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell></TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TBody key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell>{user.DOB}</TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>{user.Address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewFile(user.File)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    {/*<TableCell>
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
          </TableCell>*/}
                  </TBody>
                ))}
              </TableBody>
            </StyledTable>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogContent>
                {selectedFile && (
                  <iframe
                    src={selectedFile}
                    title="File Preview"
                    width="100%"
                    height="500px"
                  />
                )}
              </DialogContent>
            </Dialog>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default AllUsers;
