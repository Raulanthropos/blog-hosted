import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import {useState, useEffect} from 'react'
import {Button} from "react-bootstrap";

const BlogList = (props) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      let response = await fetch(
        "https://strive-blog-be-production-d83c.up.railway.app/blogs"
      );
      if (response.ok) {
        const fetchedData = await response.json();
        setNews(fetchedData);
      } else {
        console.log("error");
      }
    };
    fetching();
  }, []);

  console.log(news);
  return (
    <>
    <a href="https://strive-blog-be-production-d83c.up.railway.app/authorsCSV" target="_blank" rel="noreferrer">
    <Button>Download list of authors</Button></a>
    <Row>
      {news.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
    </>
  );
};

export default BlogList;
