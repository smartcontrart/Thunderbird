import React from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./comments.css"

export default function NewComment({submitComment}) {

  return (
    <Form id="newComment_form" onSubmit={submitComment}>
      <FloatingLabel id="newComment_inputForm" controlId="comment" label="Post a comment">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
      />
      </FloatingLabel>
      <Button id="newComment_button" type='submit'>Post</Button>
    </Form>
  );
}
