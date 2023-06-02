import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  Form,
} from "react-bootstrap";
import "./styles.css";
import BlogItem from "../../components/blog/blog-item/BlogItem";
import { SET_USER, updateAuthor } from "../../redux/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loadedProfile.user);
  const updatedUser = useSelector((state) => state.loadedProfile.updatedUser);
  console.log("This is the updated user", updatedUser)
  const logout = () => {
    dispatch({
      type: SET_USER,
      payload: [],
    }).then(setTimeout(() => navigate("/"), 2000));
  };
  function hidePassword() {
    console.log("yes");
    const x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const password = document.getElementById("password").value;
    dispatch(updateAuthor({ ...updatedUser, ...{ name, surname, password } }))
.then(() => {
      setModalShow(false);
    })
    .catch(error => {
      setModalShow(false);
      console.log(error);
    });
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mt-1 mb-1">
            <Form.Control
              placeholder="name"
              aria-label="exiting_user"
              defaultValue={user.name}
              id="name"
            />
          </InputGroup>
          <InputGroup className="mt-1 mb-1">
            <Form.Control
              placeholder="surname"
              aria-label="exiting_user"
              defaultValue={user.surname}
              id="surname"
            />
          </InputGroup>
          <InputGroup className="mt-1 mb-1">
            <Form.Control
              placeholder="password"
              type="password"
              aria-label="exiting_user"
              defaultValue={user.password}
              className="w-100"
              id="password"
            />
            <div className="w-50 mt-1">
              <input type="checkbox" onClick={() => hidePassword()} /> Show
              Password{" "}
            </div>
          </InputGroup>
          <div className="text-center mt-4">
            <Button className="btn btn-primary" type="submit">
              Save changes
            </Button>
            <Button className="btn btn-danger" onClick={logout}>
              Logout
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
const Profile = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const blogs = useSelector((state) => state.loadedProfile.blogPosts);
  const user = useSelector((state) => state.loadedProfile.user);
  const navigate = useNavigate();
  console.log("The user id is this", user?._id)
  const full_name = user?.name + " " + user?.surname;
  const my_blogs = blogs?.filter((blog) => blog.author === full_name);
  console.log("This is the avatar link", user?.avatar)

  if (user?.length === 0) {
    return (
      <>
        <div style={{ minHeight: "100vh" }}>
          <Container
            className="d-flex justify-content-center text-light"
            id="full-screen"
          >
            <div className="text-center">
              <h1>You're not logged in. Redirecting...</h1>
              <p style={{color: "#141414"}}>{setTimeout(() => navigate("/"), 2000)}</p>
            </div>
          </Container>
        </div>
      </>
    );
  } else {
    return (
      <Container className="new-blog-container text-light pt-4">
        <Row className="d-flex justify-content-center mb-5">
          <Col xs={12} id="profile-pictures">
            <div className="position-relative w-100 d-flex justify-content-center">
              <div className=" position-absolute " style={{ bottom: "-500px" }}>
                <img
                  src={user?.avatar}
                  className="rounded-circle"
                  style={{ objectFit: "cover"}}
                  id="profile-picture"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Container
          className="d-flex justify-content-center"
          id="content-under-images"
        >
          <div className="text-center">
            <h6>
              {user?.name} {user?.surname}
            </h6>
            <h6>0 followers • 0 following</h6>
            <h6 style={{ fontSize: "14px" }} className="text-muted">
              1 view this month
            </h6>
          </div>
        </Container>
        <Container className="d-flex justify-content-center">
          <Button
            variant="dark"
            className="m-1 w-25"
            id="setandedit"
            onClick={() => setModalShow(true)}
          >
            Settings
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Container>
        <Container className="d-flex justify-content-center mt-5 mb-5">
          <div className="m-2">
            <a className="no-underline active">Created</a>
          </div>
          <div className="m-2">
            <a className="no-underline ">Saved</a>
          </div>
        </Container>
        <Container>
          <Row>
            {my_blogs?.map((blog) => (
              <Col xs={12} s={6} md={6} lg={4} className="mb-2">
                <BlogItem key={blog.title} {...blog} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    );
  }
};

export default Profile;
