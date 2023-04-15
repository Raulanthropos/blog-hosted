import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import Spinner from "react-bootstrap/Spinner";
import "./styles.css";
const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = params;
    console.log("this is the id", id);
    const fetching = async () => {
      let response = await fetch(`http://localhost:3001/blogPosts/${id}`);
      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData);
        setBlog(fetchedData);
        setLoading(false);
      } else {
        console.log("error");
        navigate("/404");
        setLoading(false);
      }
    };

    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //----------------------
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        id="full-screen"
      >
        <Spinner animation="border" />
      </div>
    );
  } else {
    return (
      <div className="blog-details-root">
        <Container className="text-light">
          <div className="d-flex justify-content-center">
            <Image
              className="blog-details-cover w-75"
              src={blog.cover}
              style={{ aspectRatio: 16 / 9 }}
              fluid
            />
          </div>
          <Container fluid className="p-3">
            <h1 className="blog-details-title">{blog.title}</h1>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="text-center d-flex justify-content-between">
                <div>
                  <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
                  {`${blog.readTime.value} ${blog.readTime.unit} read`}
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
            <div className="d-flex justify-content-end">
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </Container>
        </Container>
      </div>
    );
  }
};

export default Blog;
