import React, { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";

const EditComment = ({ blogId, commentId, getBlog}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postErrorOccurred, setPostErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const editComment = async () => {
    setPostSuccess(false);
    setPostErrorOccurred(false);
    setPostLoading(true);

    const newComment = {
      name: commentName,
      text: commentText,
    };

    const config = {
      method: "PUT",
      body: JSON.stringify(newComment),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const commentResponse = await fetch(
        process.env.REACT_APP_BE_URL + "/blogPosts/" + blogId + "/comments/" + commentId,
        config
      );
      if (commentResponse.ok) {
        setPostSuccess(true);
        getBlog()
      } else {
        setPostErrorOccurred(true);
      }
    } catch (error) {
      setPostErrorOccurred(true);
    } finally {
      setPostLoading(false);
      setCommentName("");
      setCommentText("");
      infoTimeoutFunc(3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentText) {
      editComment();
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
    <>
      <Button className="ml-5" variant="primary" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="sm"
                placeholder="Name"
                value={commentName}
                onChange={(e) => {
                  setCommentName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                size="sm"
                placeholder="Comment"
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
            </Form.Group>
            {postLoading && <Spinner animation="border" role="status"></Spinner>}
            {!postLoading && postErrorOccurred && (
              <Alert variant="danger">Error occurred when posting</Alert>
            )}
            {!postLoading && !postErrorOccurred && postSuccess && (
              <Alert variant="success">Edit successful!</Alert>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditComment;
