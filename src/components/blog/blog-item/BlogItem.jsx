import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, authors, _id, readTime, cover } = props;
  console.log("These are the authors in blogitem", authors, "This is readtime", readTime)
  console.log("This is surname", authors[0]?.surname)
  return (
    <Link to={`/blogs/${_id}`} id="blog-link">
      <Card className="blog-card bg-dark text-light" id="blog-link">
        <Card.Img
          variant="top"
          src={cover}
          style={{ aspectRatio: 4 / 3, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
        </Card.Body>

        <Card.Footer>
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs={5}>
              <BlogAuthor name = {authors[0]?.name} surname = {authors[0]?.surname} avatar = {authors[0]?.avatar} readTime={authors[0]?.readTime} />
            </Col>
            <Col xs={6}>
              <p id="no-p-no-m" className="text-truncate">
                Readtime: {readTime?.value || "5"} {readTime?.unit || "minutes"}('s)
              </p>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
