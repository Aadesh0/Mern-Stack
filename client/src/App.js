//import logo from './logo.svg';
import "./App.css";
import AddUser from "./components/AddUser.jsx";
import FindUsers from "./components/FindUsers";
import AllUsers from "./components/AllUsers";
import Navbar from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/all" element={<FindUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
