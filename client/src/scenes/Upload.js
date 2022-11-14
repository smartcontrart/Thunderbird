import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VideoUploadForm from "../components/VideoUploadForm.js"
import "./scenes.css"

export default function Upload() {
  return (
      <Container className="scene" id="VideoUpload_container">
        {/* <Row> */}
          {/* <Col  lg={2} id="VideoUpload_black-col"></Col> */}
          {/* <Col md={12} lg={8} id="VideoUpload_video-player"> */}
            <VideoUploadForm/>
              {/* <GetStarted/> */}
            {/* </Col> */}
          {/* <Col lg={2} id="VideoUpload_black-col"></Col> */}
        {/* </Row> */}
      </Container>
  );
}
