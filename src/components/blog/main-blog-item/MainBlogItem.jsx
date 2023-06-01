import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const MainBlogItem = (props) => {
  const { title, authors, _id, content, cover } = props;
  return (
    <Link to={`/blogs/${_id}`} id="blog-link" style={{ body: "unset" }}>
      <Card className="h-100 bg-dark text-light">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <BlogAuthor {...authors}/>

            <Button
              variant="outline-secondary"
              size="sm"
              className=" mx-2 rounded-3"
              id="follow-button"
            >
              Follow
            </Button>
          </div>
          <Card.Title className="text-truncate">{title}</Card.Title>
          <div>
          <Card.Img
                    src={cover}
                    alt="image1"
                    className="w-100 h-100"
                    style={{ objectFit: "cover", aspectRatio: 3 / 2 }}
                  />
                  </div>
          <div id="text-main-blog">
            <p
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              className="text-muted"
            ></p>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MainBlogItem;
