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

import { useState } from "react";
import { addUser } from "../service/api";
import { useNavigate } from "react-router-dom";

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

const AddUser = () => {
  const [user, setUser] = useState(defaultValue);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const adduserDetails = async () => {
    let totalSize = 0;
    for (const file of selectedFiles) {
      totalSize += file.size;
    }
    if (totalSize > 1024 * 1024) {
      alert("File size should not exceed 1MB");
      return;
    }
    await addUser(user);
    navigate("/");
  };

  return (
    <Container elevation={3}>
      <Typography variant="h4" color="blue" align="center">
        Add Students Detail
      </Typography>
      <FormControl margin="50px">
        <InputLabel>Name</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="Name" />
      </FormControl>

      <FormControl>
        <InputLabel>D.O.B</InputLabel>
        <br></br>
        <br></br>
        <Input type="date" onChange={(e) => onValueChange(e)} name="DOB" />
      </FormControl>

      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input type="email" onChange={(e) => onValueChange(e)} name="Email" />
      </FormControl>

      <FormControl>
        <InputLabel>Address</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="Address" />
      </FormControl>

      <FormControl>
        <InputLabel>Upload Photo and Document</InputLabel>
        <br></br>
        <br></br>
        <Input
          name="File"
          type="file"
          accept=".jpg, .jpeg, .pdf"
          multiple
          onChange={(e) => handleFileChange(e)}
        />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => adduserDetails()}>
          Add Student
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
