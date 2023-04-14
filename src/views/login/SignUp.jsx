import React, { useState } from "react";
import { Alert, Button, Col, Form, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const navigate = useNavigate()

  const registerAuthor = async () => {
    
    try {
      setPostSuccess(false);
      setErrorOccurred(false);
      setLoading(true);

      const newAuthor = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: "User",
      };

      const config = {
        method: "POST",
        body: JSON.stringify(newAuthor),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/authors/register",
        config
      );

      if (response.ok) {
        setPostSuccess(true);
        navigate("/")
      } else {
        setErrorOccurred(true);
      }
    } catch (error) {
      setErrorOccurred(true);
    } finally {
      setLoading(false);
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setPassword2("");
      infoTimeoutFunc(3000);
    }
  };

  const resetAllState = () => {
    setErrorOccurred(false);
    setPostSuccess(false);
    setLoading(false);
  };

  const infoTimeoutFunc = (time) => {
    const infoTimeout = setTimeout(resetAllState, time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email &&
      name &&
      surname &&
      password &&
      password2 &&
      !loading &&
      !errorOccurred &&
      !postSuccess
    ) {
      if (password !== password2) {
        setErrorOccurred(true);
        infoTimeoutFunc(2000);
      } else {
        registerAuthor();
      }
    } else {
      setErrorOccurred(true);
      infoTimeoutFunc(2000);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        background: "white",
        position: "absolute",
        zIndex: 99,
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
      className="d-flex"
    >
      <div
        style={{
          boxShadow: "-4px 5px 15px 5px rgba(0,0,0,0.39)",
          borderRadius: "40px",
        }}
        className="w-50 p-4 mx-auto text-center"
      >
        <h2>Create an account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter first name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter last name"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          {loading && <Spinner animation="border" role="status"></Spinner>}
          {!loading && errorOccurred && (
            <Alert variant="danger">Error occurred when creating profile</Alert>
          )}
          {!loading && !errorOccurred && postSuccess && (
            <Alert variant="success">Profile created! Now try logging in!</Alert>

          )}
          <Button className="mt-2" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="mt-4">
          <Link to="/">...or login!</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
