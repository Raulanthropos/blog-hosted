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

  const [responseJSON, setResponseJSON] = useState([]);

  const user = useSelector((state) => state.loadedProfile.user)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      email: email,
      password: password
    }
    console.log("logging in")
    dispatch(getAccessToken(credentials))
    setLoggedIn(true);
  };
  const redirectme = () => {
    // setTimeout(() => {
    //
    // }),
    //   3000;
    setTimeout(() => {
      window.location.replace("/home");
    }, 13000);
  };
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  if (loggedIn) {
    return (
      <>
        <div className="mt-5 mb-5 text-light d-flex justify-content-center">
          Welcome, {email}!{}
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
