import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./homepage.css"
import { useHistory } from 'react-router-dom';

export default function FirstFold() {
    const history = useHistory()

    function redirectToAbout(){
        history.push('/about')
    }

    function getStarted(){
        history.push('/browse')
    }

  return (
      <div id='homepage_window'>
        <Container id="homepage_first_fold" fluid>
            <Row xs={4}>
            </Row>
            <Row xs={4}>
                <Col xs={12} id="homepage_catch">
                    Upload videos. Earn Sats.                
                </Col>
            </Row>
            <Row xs={12} id="homepage_explanation">
                Youtube, powered by the Lightning Network
            </Row>
            <Row xs={12} id="homepage_buttons">
                <Col xs ={4}>
                </Col>
                <Col xs= {12} md={2}>
                    <Button variant="primary" onClick={getStarted}>Get Started</Button> 
                </Col>
                <br/><br/>
                <Col xs= {12} md={2}>
                    <Button variant="outline-primary" onClick={redirectToAbout}>Learn more</Button>
                </Col>
                <Col xs ={4}>
                </Col>
            </Row>
            <Row xs={4}>
            </Row>
        </Container>
      </div>
  );
}
