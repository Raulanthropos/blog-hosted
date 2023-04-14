import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import DeleteComment from "./deleteComment";
import EditComment from "./editComment";
import "./styles.css";
const Blog = () => {
  const params = useParams();
  const blogId = params.id;

  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [blog, setBlog] = useState(null);

  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postErrorOccurred, setPostErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const getBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/blogPosts/" + blogId
      );
      if (response.ok) {
        const blog = await response.json();
        console.log(blog);
        setBlog(blog);
      } else {
        setErrorOccured(true);
      }
    } catch (error) {
      setErrorOccured(true);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async () => {
    setPostSuccess(false);
    setPostErrorOccurred(false);
    setPostLoading(true);

    const newComment = {
      name: commentName,
      text: commentText,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    try {
      const commentResponse = await fetch(
        process.env.REACT_APP_BE_URL + "/blogPosts/" + blogId + "/comments",
        config
      );
      if (commentResponse.ok) {
        setPostSuccess(true);
        getBlog();
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

  const blogPostPdf = async () => {
    try {
      const blogPostPdfResponse = await fetch(
        process.env.REACT_APP_BE_URL + "/blogPosts/" + blogId + "/pdf"
      );
      if (blogPostPdfResponse.ok) {
        console.log("pdf successfully created");
        const decodedResp = await blogPostPdfResponse.json()
        console.log(decodedResp)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentText) {
      postComment();
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
    <div className="blog-details-root">
      <Container>
        {loading && <Spinner animation="border" role="status"></Spinner>}
        {!loading && errorOccurred && (
          <Alert variant="danger">
            Error occurred when loading blog content
          </Alert>
        )}
        {!loading && !errorOccurred && blog === null && (
          <Alert variant="danger">Failed to load blog</Alert>
        )}
        {!loading && !errorOccurred && blog !== null && (
          <>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor authors={blog.authors}/>
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
            <a href={process.env.REACT_APP_BE_URL + "/blogPosts/" + blogId + "/pdf"}>Create Blog Post PDF</a>
            <div>
              <h4>Comments</h4>
              <div style={{ background: "white", borderRadius: "5px" }}>
                <Container className="p-1">
                  {blog.comments && (
                    <>
                      {blog.comments.map((comment, i) => (
                        <Row key={i} className="my-2 w-75 d-flex">
                          <div
                            style={{ background: "white", borderRadius: "5px" }}
                          >
                            {comment.name + ": " + comment.text}
                          </div>

                          <div>
                            <EditComment
                              blogId={blog._id}
                              commentId={comment._id}
                              getBlog={getBlog}
                            />
                            <DeleteComment
                              blogId={blog._id}
                              commentId={comment._id}
                              getBlog={getBlog}
                            />
                          </div>
                        </Row>
                      ))}
                    </>
                  )}
                  <Row style={{ background: "white", borderRadius: "5px" }}>
                    <h5 className="mt-5">Add Comment</h5>
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
                      {loading && (
                        <Spinner animation="border" role="status"></Spinner>
                      )}
                      {!loading && errorOccurred && (
                        <Alert variant="danger">
                          Error occurred when posting
                        </Alert>
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
                  </Row>
                </Container>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Blog;
