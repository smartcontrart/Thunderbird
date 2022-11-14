import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import SignInForm from "../components/SignInForm";


export default function SignIn() {


  return (
    <Container className="scene" id="signIn_container">
      <Row id="signIn_row">
        <Col md={2}>
        </Col>
        <Col md={8} id="signIn_col">
          <SignInForm/>
        </Col>
        <Col md={2}>
        </Col>
      </Row>
    </Container>

  );
}


  