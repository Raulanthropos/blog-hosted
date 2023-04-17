import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, authors, id, readTime } = props;
  console.log("These are the authors in blogitem", authors, "This is the id in blogitem", id, "This is the readtime in blogitem", readTime, "This is the title in blogitem", title)
  return (
    <Link to={`/blogs/${id}`} id="blog-link">
      <Card className="blog-card bg-dark text-light" id="blog-link">
        {/* <Card.Img
          variant="top"
          src={cover}
          style={{ aspectRatio: 4 / 3, objectFit: "cover" }}
        /> */}
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
        </Card.Body>

        <Card.Footer>
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs={5}>
              <BlogAuthor {...authors} {...readTime} />
            </Col>
            <Col xs={6}>
              {/* <p id="no-p-no-m" className="text-truncate">
                Read-time: {readTime.value} {readTime.unit}('s)
              </p> */}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
