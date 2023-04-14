import React, { useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
const NavBar = ({ setLoggedIn, loggedIn }) => {
  const [loggedInAuthor, setLoggedInAuthor] = useState(null);

  const getAuthorDetails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: new Headers({
          Authorization: `Basic ${accessToken}`,
        }),
      };

      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/authors/me",
        config
      );

      if (response.ok) {
        const author = response.json();
        console.log("NAVBAR LOGGED IN AUTHOR: " + author);
        setLoggedInAuthor(author);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getAuthorDetails();
    }
  }, [loggedIn]);

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/home">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        {loggedInAuthor !== null ? (
          <Navbar.Text>
            Signed in as: {loggedInAuthor.name + " " + loggedInAuthor.surname}
          </Navbar.Text>
        ) : (
          <Navbar.Text>
            <Link to="/">Login/SignUp</Link>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
