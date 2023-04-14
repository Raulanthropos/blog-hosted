import React, { useCallback, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./styles.css";

const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const postBlogPost = async () => {
    setPostSuccess(false);
    setErrorOccurred(false);
    setLoading(true);

    const postImgFormData = new FormData();
    if (imgData !== null) {
      postImgFormData.append("cover", imgData);
    }

    const blogPost = {
      category: category,
      title: title,
      cover: "https://ui-avatars.com/api/?name=ER+ER",
      readTime: {
        value: 2,
        unit: "minute",
      },
      author: {
        name: "Sammy",
        avatar: "https://ui-avatars.com/api/?name=Sammy+Testpost",
      },
      content: text,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(blogPost),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/blogPosts", config);
      if (response.ok) {
        const blogPostResponse = await response.json();
        const imgPostResponse = await fetch(
          process.env.REACT_APP_BE_URL + "/blogPosts/" + blogPostResponse._id + "/cloudinary",
          {
            method: 'POST',
            body: postImgFormData,
            headers: {
              "X-API-KEY": "392859513733232"
            }
          }
        );
        if (imgPostResponse.ok) {
          setPostSuccess(true);
        } else {
          setErrorOccurred(true);
        }
      } else {
        setErrorOccurred(true);
      }
    } catch (error) {
      setErrorOccurred(true);
    } finally {
      setLoading(false);
      setText("");
      setCategory("");
      setImgData("");
      setTitle("");
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

  const handleChange = useCallback((value) => {
    setText(value);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && category && title && imgData) {
      postBlogPost();
    } else {
      setErrorOccurred(true);
      infoTimeoutFunc(2000);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Post Cover Image</Form.Label>
          <Form.File
            required
            name="file"
            onChange={(e) => {
              setImgData(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={text}
            onChange={setText}
            className="new-blog-content"
          />
        </Form.Group>
        {loading && <Spinner animation="border" role="status"></Spinner>}
        {!loading && errorOccurred && (
          <Alert variant="danger">Error occurred when posting</Alert>
        )}
        {!loading && !errorOccurred && postSuccess && (
          <Alert variant="success">Post successful!</Alert>
        )}
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
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
    </Container>
  );
};

export default NewBlogPost;
