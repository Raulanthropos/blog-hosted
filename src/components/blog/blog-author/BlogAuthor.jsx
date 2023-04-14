import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = ({ authors }) => {
  return (
    <>
      {authors &&
        authors.map((author, i) => (
          <Row key={i}>
            <Col xs={2}>
              <Image
                className="blog-author"
                src={author.avatar}
                roundedCircle
              />
            </Col>
            <Col>
              <div>by</div>
              <h6>{author.name}</h6>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default BlogAuthor;
