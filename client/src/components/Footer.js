import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import twitter_white_logo from '../images/Twitter social icons - rounded square - white.png'
import "./Footer.css"

export default function VideoUpload() {
  return (
    <div className="footer">
      <Container className="footer_container">
          <Row className="footer_row">
              <Col xs={12} md={8}>
                  <div className='logo'>
                      <Figure className="footer_logo_figure">
                        Logo
                          {/* <Figure.Image className="footer_logo_image"
                              src={stackasat_white_logo}
                          /> */}
                      </Figure>
                  </div>
              </Col>
              <Col xs={12} md={1}>
                  <div className="social twitter">
                      Blog
                  </div>
              </Col>
              <Col xs={12} md={1} className="twitter">
                  <Figure className="twitter_figure">
                      <a href="https://twitter.com/stackasat" target="_blank" rel="noreferrer">
                          <Figure.Image className="twitter_image"
                              src={twitter_white_logo}
                          />
                      </a>
                      </Figure>
              </Col>
              <Col xs={12} md={1}>
                  <div className="social twitter">
                      Email
                  </div>
              </Col >
          </Row>
          <Row className="copyright_row">
                  <div className="copyright">
                      Copyright © 2021 Stack a Sat, Inc. All rights reserved
                  </div>
          </Row>
      </Container>
          
  </div>

  );
}
