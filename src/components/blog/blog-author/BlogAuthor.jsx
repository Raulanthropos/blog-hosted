import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, avatar, value, unit } = props;
  console.log("This is the name", name, "This is the avatar", avatar, "This is props", props)
  return (
    <Row>
      <Col xs={12} className="d-flex align-items-center justify-content-start">
        <Image className="blog-author me-1" src={avatar || "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80"} roundedCircle />
        <p id="no-p-no-m" className="text-truncate">
          by {name || "Anonymous"} - {value || "2"} {unit || "minute"}(s)
        </p>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
