import React from "react";
import { Container, Row, Col, Spinner} from "react-bootstrap";
import './comments.css'

export default function CommentList({comments, isLoading}) {
  
  function renderDate(date){
    if(date){
      let d = new Date(date)
      let day = d.getDate()
      let month = d.getMonth() + 1
      let year = d.getFullYear()
      return day + "/" + month + "/" + year
    }else return "nodate!"
   }

  function renderAuthor(author){
    if (author.length>18){
      return(author.substring(0,15) + '...')
    }else return author
  }

  if(isLoading){
    return(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) 
  }else{
    if(comments.length>0){
      return (
        comments.map(comment => {
          return(
            <Container id="comment_container">
                <Row id="comment_top">
                  <Col xs={12} md={8} id="comment_author">
                    {renderAuthor(comment.author)}
                  </Col>
                  <Col xs={12} md={4} id="comment_date">
                    {renderDate(parseInt(comment.publication_date))}
                  </Col>
                </Row>
  
                <Row>
                  <Col id="comment_content">
                    {comment.content}
                  </Col>
                </Row>
            </Container>
          )
        })
      );
    }else{
      return(
        <div>No comments</div>
      )
    }
  }
}
