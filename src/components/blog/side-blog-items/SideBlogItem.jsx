import React from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const SideBlogItem = (props) => {
  const { title, cover, authors, _id, readTime, content, createdAt } = props;
  return (
    <>
      <Link to={`/blogs/${_id}`} id="blog-link" className="text-light">
        <Row className="g-0" id="main-row">
          <Col xs={12}>
            <Card className="bg-dark">
              <Row className="g-0">
                <Col xs={12} sm={12} md={12} lg={5}>
                  <Card.Img
                    src={cover}
                    alt="image1"
                    className="w-100 h-100"
                    style={{ objectFit: "cover", aspectRatio: 3 / 2 }}
                  />
                </Col>
                <Col xs={12} sm={12} md={12} lg={7}>
                  <Card.Body>
                    <div className="mb-2">
                      <BlogAuthor name={authors[0]?.name} surname = {authors[0]?.surname} avatar={authors[0]?.avatar} readTime={readTime} />
                    </div>

                    <p
                      className="text-truncate text-light"
                      dangerouslySetInnerHTML={{ __html: title || content }}
                    ></p>
                    <small>
                      <p className="text-muted card-text text-truncate">
                        {new Date(createdAt).toLocaleDateString("el-GR")} •{" "}
                        {/* {readTime.value} {readTime.unit}('s) Read */}
                      </p>
                    </small>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Link>
    </>
  );
};

export default SideBlogItem;
