import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import "./styles.css";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { SET_USER, getAccessToken, setAccessToken } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.loadedProfile.user)
  const fullName = user.name + " " + user.surname;

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      email: email,
      password: password
    }
    console.log("logging in")
    try {
      await new Promise((resolve, reject) => {
        dispatch(getAccessToken(credentials, resolve, reject))
          .then(resolve)
          .catch(reject);
      });
      setLoggedIn(true);
    } catch (error) {
        setErrorMessage("Incorrect email or password. Please try again.");
    }

  }
  const handleSubmitTestUser = async (event) => {
    event.preventDefault()
    const credentials = {
      email: "testuser@example.com",
      password: "123465"
    }
    console.log("logging in")
    try {
      await new Promise((resolve, reject) => {
        dispatch(getAccessToken(credentials, resolve, reject))
          .then(resolve)
          .catch(reject);
      });
      setLoggedIn(true);
    } catch (error) {
        setErrorMessage("Incorrect email or password. Please try again.");
    }

  }
  const redirectme = () => {
    // setTimeout(() => {
    //
    // }),
    //   3000;
    setTimeout(() => {
      window.location.replace("/home");
    }, 4000);
  };
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  if (loggedIn) {
    return (
      <>
        <div className="mt-5 mb-5 text-light d-flex justify-content-center">
          Welcome, {email === "testuser@example.com" ? "Test User" : fullName}!{}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
        {redirectme()}
      </>
    );
  } else {
    return (
      <Container className="w-75 text-light mt-5">
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => onChangeHandler(e.target.value, setEmail)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChangeHandler(e.target.value, setPassword)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              Or, &nbsp;
              <Link to="sign-up" className="text-light">
                <h6 className="p-0 m-0"> Sign-up</h6>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-success"
              id="login-test"
              onClick={handleSubmitTestUser}
            >
              Login as test user
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              id="login"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </Form>
      </Container>
    );
  }
};

export default Login;
