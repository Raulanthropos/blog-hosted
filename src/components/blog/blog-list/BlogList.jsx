import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);

  const getBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + "/blogPosts");
      if (response.ok) {
        const blogPosts = await response.json();
        console.log(blogPosts);
        setBlogPosts(blogPosts);
      } else {
        setErrorOccured(true);
      }
    } catch (error) {
      setErrorOccured(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <Row>
      {loading && <Spinner animation="border" role="status"></Spinner>}
      {!loading && errorOccurred && (
        <Alert variant="danger">Error occurred when fetching blog posts</Alert>
      )}
      {!loading && !errorOccurred && blogPosts.length === 0 && (
        <Alert variant="info">No blog posts yet</Alert>
      )}
      {!loading && !errorOccurred && blogPosts.length > 0 && (
        <>
          {blogPosts.map((blogPost, i) => (
            <Col
              key={i}
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <BlogItem post={blogPost}/>
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default BlogList;
