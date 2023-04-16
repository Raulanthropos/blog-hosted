import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Spinner from "react-bootstrap/Spinner";
import "./styles.css";
import { addPost } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
  let [loading, setLoading] = useState(false);
  // const [poster, setPoster] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [poster, setPoster] = useState("");
  const user = useSelector((state) => state.loadedProfile.user);
  const accessToken = useSelector(state => state.loadedProfile.accessToken);
  const username = user.name + " " + user.surname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
    document
      .querySelector("#submit_button")
      .addEventListener("click", function (event) {
        event.preventDefault();
      });

    // console.log(poster);
    //eslint-disable-next-line
  }, [editorState]);
  const itemToSend = {
    title: title,
    category: category,
    content: `${html}`,
    author: {
      name: username,
      avatar:
        user.avatar ||
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    readTime: {
      value: value,
      unit: "minutes",
    },
    cover: poster,
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const onSubmitHandler = () => {
    setLoading(true);
    dispatch(addPost(accessToken, itemToSend));
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  if (loading === true) {
    return (
      <div className="text-light" id="full-screen">
        <div className="text-center">
          <h3>Posting...</h3>
          <Spinner animation="border" className="mt-2" />
        </div>
      </div>
    );
  } else {
    return (
      <Container className="new-blog-container text-light" id="main-container">
        <Form className="mt-3">
          <Form.Group controlId="blog-form">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title of your blog"
              value={title}
              onChange={(e) => onChangeHandler(e.target.value, setTitle)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="name" className="mt-3 ">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="md"
                  placeholder="Anthony Stark"
                  value={username}
                  onChange={(e) => onChangeHandler(e.target.value, setName)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="category" className="mt-3 ">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  size="md"
                  placeholder="eg. Politics"
                  value={category}
                  onChange={(e) => onChangeHandler(e.target.value, setCategory)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="time" className="mt-3">
                <Form.Label>Read-Time</Form.Label>
                <Form.Control
                  size="md"
                  placeholder="2"
                  value={value}
                  onChange={(e) => onChangeHandler(e.target.value, setValue)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div>
            <div>
              <Form.Group
                controlId="blog-content"
                className="mt-3 p-2 rounded bg-light text-dark"
                id="content"
              >
                <Form.Label>Blog Content</Form.Label>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={setEditorState}
                />
              </Form.Group>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <div>
            <Form.Group controlId="formPicture">
            <Form.Label>Picture URL</Form.Label>
            <Form.Control type="text" placeholder="Enter picture URL" value={poster} onChange={event => setPoster(event.target.value)}/>
          </Form.Group>
            </div>
          </div>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-light">
              Reset
            </Button>

            <Button
              // type="submit"
              size="lg"
              id="submit_button"
              variant="light"
              style={{
                marginLeft: "1em",
              }}
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
};

export default NewBlogPost;
