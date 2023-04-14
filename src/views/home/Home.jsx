import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import Login from "../login/Login";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [imgData, setImgData] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postErrorOccurred, setPostErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const getAuthors = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/authors");
      if (response.ok) {
        const authorsLoaded = await response.json();
        console.log("LOADING AUTHORS");
        console.log(authorsLoaded);
        setAuthors(authorsLoaded);
      } else {
        setErrorOccured(true);
      }
    } catch (error) {
      setErrorOccured(true);
    } finally {
      setLoading(false);
    }
  };

  const postAuthorImage = async () => {
    setPostSuccess(false);
    setPostErrorOccurred(false);
    setPostLoading(true);

    const accessToken = localStorage.getItem("accessToken")

    const currentUserId = "juxkzs17l8wr9mq3";
    console.log("starting to post author image");
    const postImgFormData = new FormData();
    if (imgData !== null) {
      postImgFormData.append("avatar", imgData);
    }

    try {
      const imgPostResponse = await fetch(
        process.env.REACT_APP_BE_URL +
          "/authors/" +
          currentUserId +
          "/cloudinary",
        {
          method: "POST",
          body: postImgFormData,
          headers: {
            "Authorization": `Basic ${accessToken}`,
            "X-API-KEY": "392859513733232",
          },
        }
      );
      if (imgPostResponse.ok) {
        setPostSuccess(true);
        getAuthors();
      } else {
        setPostErrorOccurred(true);
      }
    } catch (error) {
      setPostErrorOccurred(true);
    } finally {
      setPostLoading(false);
      setImgData(null);
      infoTimeoutFunc(3000);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgData) {
      postAuthorImage();
    } else {
      setPostErrorOccurred(true);
      infoTimeoutFunc(2000);
    }
  };

  const infoTimeoutFunc = (time) => {
    const infoTimeout = setTimeout(resetAllState, time);
  };

  const resetAllState = () => {
    setPostErrorOccurred(false);
    setPostSuccess(false);
    setPostLoading(false);
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>

      <Button
        as={Link}
        to="/new"
        className="blog-navbar-add-button bg-dark my-2"
        size="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        Post Article
      </Button>

      <BlogList authors={authors} />

      {loading && <Spinner animation="border" role="status"></Spinner>}
      {!loading && errorOccurred && (
        <Alert variant="danger">Error occurred when fetching authors</Alert>
      )}
      {!loading && !errorOccurred && authors.length === 0 && (
        <Alert variant="info">No authors found</Alert>
      )}
      {!loading && !errorOccurred && authors.length > 0 && (
        <>
          <h4>Authors</h4>
          <Container className="mb-3">
            <Row>
              {authors &&
                authors.map((author, i) => (
                  <Col md={3} key={i} style={{ listStyleType: "none" }}>
                    <div
                      className="p-2 my-2 d-flex"
                      style={{ background: "gray", borderRadius: "5px" }}
                    >
                      <div className="">
                        <Image
                          alt="profile pic"
                          style={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                          }}
                          src={author.avatar}
                        />
                      </div>

                      <div className="text-white">
                        {author.name + " " + author.surname}
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      )}
      <div>
        <h4>Edit Profile Pic</h4>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.File
              required
              name="file"
              onChange={(e) => {
                setImgData(e.target.files[0]);
              }}
            />
          </Form.Group>
          {postLoading && <Spinner animation="border" role="status"></Spinner>}
          {!postLoading && postErrorOccurred && (
            <Alert variant="danger">Error occurred when posting</Alert>
          )}
          {!postLoading && !postErrorOccurred && postSuccess && (
            <Alert variant="success">Post successful!</Alert>
          )}
          <Form.Group className="d-flex mt-3 justify-content-start">
            <Button type="reset" size="lg" variant="outline-dark">
              Clear
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Home;
