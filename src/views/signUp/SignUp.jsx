import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import "./styles.css";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/actions";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [background, setBackground] = useState("");

  React.useEffect(() => {}, []);

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const avatarChangeHandler = (e) => {
    setAvatar(e.target.files[0]);
  };
  // const backgroundChangeHandler = (e) => {
  //   setBackground(e.target.files[0]);
  // };
  const itemToSend = {
    name: name,
    surname: surname,
    email: email,
    password: password,
  };
  const onSubmitHandler = () => {
    setLoading(true);
    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append("avatar", avatar);
    // formData2.append("background", background);
    newPostAction(formData1, formData2);
  };

  //---------------------------------------------------------------------------------------
  const newPostAction = (formData1, formData2) => {
    const options = {
      method: "POST",
      body: JSON.stringify(itemToSend),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(process.env.REACT_APP_BE_URL + "/authors/register", options)
      .then((response) => response.json())
      .then((s) => {
        console.log(s);
        return s;
      }).then((s) => {
              if (s) {
                console.log(s);
                dispatch({
                  type: SET_USER,
                  payload: s,
                });

                setLoading(false);
                window.location.replace("/home");
              }
            })
  };
  if (loading) {
    return (
      <div className="text-light" id="full-screen">
        <div className="text-center">
          <h3>Creating your account...</h3>
          <Spinner animation="border" className="mt-2" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Container className="w-75 text-light">
          <Form>
            <Form.Group className=" d-flex mt-2" controlId="formBasicEmail">
              <div className="w-50 me-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => onChangeHandler(e.target.value, setName)}
                />
              </div>

              <div className="w-50">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="surname"
                  placeholder="Enter your surname"
                  value={surname}
                  onChange={(e) => onChangeHandler(e.target.value, setSurname)}
                />
              </div>
            </Form.Group>
            <div className=" d-flex">
              <div className="w-50 me-2">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="exiting_user"
                    aria-label="exiting_user"
                    value={email}
                    onChange={(e) =>
                      onChangeHandler(e.target.value, setEmail)
                    }
                  />
                </InputGroup>
              </div>
              <div className="w-50">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      onChangeHandler(e.target.value, setPassword)
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="d-flex mb-3 mt-2">
              <div className="justify-content-start w-50 me-2">
                <Form.Label>Upload Your Profile Picture:</Form.Label>

                <Form.Control
                  type="file"
                  // onChange={(e) => posterChangeHandler(e)}
                  accept=".jpg, .jpeg"
                  onChange={(e) => avatarChangeHandler(e)}
                />
              </div>
              {/* <div className="justify-content-start w-50">
                <Form.Label>Upload Your Profile Background:</Form.Label>

                <Form.Control
                  type="file"
                  // onChange={(e) => posterChangeHandler(e)}
                  accept=".jpg, .jpeg"
                />
              </div> */}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-outline-light"
                id="login"
                onClick={onSubmitHandler}
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Container>
      </>
    );
  }
};

export default SignUp;
