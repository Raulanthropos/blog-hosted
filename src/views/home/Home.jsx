import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (blogs) => {
  return (
    <Container fluid="sm" id="container">
      <BlogList {...blogs} />
    </Container>
  );
};

export default Home;
