import React from "react";
import FirstFold from "../components/Hompage/FirstFold";
import { Container, Row, Col } from "react-bootstrap";
import "./scenes.css"

export default function Home() {
  return (

    <Container className="scene">
      <FirstFold/>
    </Container>
  );
}
