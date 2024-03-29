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
    let { blogPostId } = params;

    const fetching = async () => {
      let response = await fetch(process.env.REACT_APP_BE_URL + `/blogPosts/${blogPostId}`);
      if (response.ok) {
        const fetchedData = await response.json();
        setBlog(fetchedData);
        console.log("This is the blog", blog)
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
                <BlogAuthor name = {blog.authors[0]?.name} surname = {blog.authors[0]?.surname} avatar = {blog.authors[0]?.avatar}/>
              </div>
              <div className="text-center d-flex justify-content-between">
                <div>
                  <div>{new Date(blog.createdAt).toLocaleDateString("el-GR")}</div>
                  {/* {`${blog.readTime.value} ${blog.readTime.unit} read`} */}
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
