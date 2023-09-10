import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

const Header = styled(AppBar)`
  background: black;
  hover: blue;
`;
const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: blue;
`;
const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/">Students Details</Tabs>
        <Tabs to="/all">Find Students</Tabs>
        <Tabs to="/add">Add Students</Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
