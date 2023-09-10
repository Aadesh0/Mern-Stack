import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
  Paper,
} from "@mui/material";
import React from "react";

import { useState, useEffect } from "react";
import { editUser, getUser } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(Paper)`
  width: 20%;
  padding: 50px;
  margin: 1% auto;

  & > div {
    margin-top: 20px;
  }
`;
const defaultValue = {
  Name: "",
  DOB: "",
  Email: "",
  Address: "",
  File: "",
};

const EditUser = () => {
  const [user, setUser] = useState(defaultValue);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const edituserDetails = async () => {
    await editUser(user, id);
    navigate("/all");
  };

  return (
    <Container elevation={3}>
      <Typography variant="h4" color="blue" align="center">
        Edit Students Detail
      </Typography>
      <FormControl margin="50px">
        <InputLabel>Name</InputLabel>
        <Input
          type="text"
          onChange={(e) => onValueChange(e)}
          name="Name"
          value={user.Name}
        />
      </FormControl>

      <FormControl>
        <InputLabel>D.O.B</InputLabel>
        <br></br>
        <br></br>
        <Input
          type="date"
          onChange={(e) => onValueChange(e)}
          name="DOB"
          value={user.DOB}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          type="email"
          onChange={(e) => onValueChange(e)}
          name="Email"
          value={user.Email}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Address</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="Address"
          value={user.Address}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Upload Photo and Document</InputLabel>
        <br></br>
        <br></br>
        <Input name="File" type="file" accept=".jpg, .jpeg, .pdf" multiple />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => edituserDetails()}>
          Edit Student
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
