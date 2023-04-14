import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import SignUp from "./views/login/SignUp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Router>
      <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Routes>
        <Route path="/" exact element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
