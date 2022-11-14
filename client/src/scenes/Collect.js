import React from "react";
import { Container, Row } from "react-bootstrap";
import UploadedVideos from "../components/UploadedVideos";
import "./scenes.css"

export default function Collect() {
  return (
      <Container className="scene" id="collect_container">
        <Row>
          <UploadedVideos/>
        </Row>
      </Container>
  );
}
