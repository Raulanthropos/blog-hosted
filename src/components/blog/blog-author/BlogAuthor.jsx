import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, surname, avatar } = props;
  return (
    <Row>
      <Col xs={12} className="d-flex align-items-center justify-content-start">
        <Image className="blog-author me-1" src={avatar || "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80"} roundedCircle />
        <p id="no-p-no-m" className="text-truncate">
          by {name || "Anonymous"} {surname}
        </p>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
