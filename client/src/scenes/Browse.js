import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VideoList from "../components/VideoList.js"
import "./scenes.css"

export default function Browse() {
  return (
      <Container className="scene" id="browse_container">
        {/* <Row id="browse_row"> */}
          {/* <Col  lg={2} id="VideoUpload_black-col"></Col> */}
          {/* <Col id="browse_col"> */}
              <VideoList/>
            {/* </Col> */}
          {/* <Col lg={2} id="VideoUpload_black-col"></Col> */}
        {/* </Row> */}
      </Container>
  );
}
