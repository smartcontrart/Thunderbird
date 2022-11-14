import React from "react";
import { Container, Accordion } from "react-bootstrap";
import "./scenes.css"

export default function VideoUpload() {
  return (
      <Container className="scene" id="VideoUpload_container">
        <Accordion>
          
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is Thunderbird?</Accordion.Header>
            <Accordion.Body>
              Thunderbird is a video sharing platform without ads, with direct support to the creators. 
              Thunderbird achieves that leveraging the lightning network. 
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>How does it work?</Accordion.Header>
            <Accordion.Body>
              To access Thunderbird, you will need a lightning wallet to pay and receive funds.
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header>Why use Thunderbird?</Accordion.Header>
            <Accordion.Body>
              Total privacy, no data saved, any video you create will generate funds for you starting at the 1st video
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Is it safe to use Thunderbird?</Accordion.Header>
            <Accordion.Body>
              This is the alpha version of Thunderbird. Expect bugs (please report them).
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>How can I make money with Thunderbird?</Accordion.Header>
            <Accordion.Body>
              There are 2 main ways of making money on Thunderbird. The first one is to get people to buy (or unlock) your
              video. A standard fee is currently applied. The second one is to collect tips that users want to give you.
              Once a user bought your video, they can chose to pay you an additional tip.
              While Thunderbird will collect a small part on each video purchase to run the platform, the tips are 100% for
              the creators.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>How can I make money with Thunderbird?</Accordion.Header>
            <Accordion.Body>
              There are 2 main ways of making money on Thunderbird. The first one is to get people to buy (or unlock) your
              video. A standard fee is currently applied. The second one is to collect tips that users want to give you.
              Once a user bought your video, they can chose to pay you an additional tip.
              While Thunderbird will collect a small part on each video purchase to run the platform, the tips are 100% for
              the creators.
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Container>
  );
}
