import React, {useState, useEffect} from "react";
import {Form, FloatingLabel, Button, Spinner, Alert, Row, Col, Tooltip, OverlayTrigger} from "react-bootstrap";
import { clearToken, setToken, verifyMessage } from "../services/api.js";
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import "./SignInForm.css"

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [pubkey, setPubkey] = useState(null)
    const [serverMessage, setServerMessage] = useState(null)
    const [userMessage, setUserMessage] = useState(null)
    const [messageToSign, setMessageToSign] = useState(null)
    const [signedMessage, setSignedMessage] = useState(null)
    const [connectionStatus, setConnectionStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    useEffect(()=>{
        let randomServerMessage = uuid()
        randomServerMessage = randomServerMessage.replace(/-/g, "");
        setServerMessage(randomServerMessage)
        let randomUserMessage = uuid()
        randomUserMessage = randomUserMessage.replace(/-/g, "");
        setUserMessage(randomUserMessage)
        updateMessageToSign(randomServerMessage, randomUserMessage)

    },[])

    async function verifyPubkey(e){
        e.preventDefault()
        setIsLoading(true)
        let response = await verifyMessage(pubkey, messageToSign, signedMessage)
        // let response = await verifyMessage(
        //     "0201d83ee7a4837c6f8230b5a880f357d1b460203aa2a71b21b272b0ba6e529609",
        //     "hi",
        //     "rbqtat3imu46wzzn4irzh9jbxa8ed1yyj1owhn3ik3txnqo3db3sgtdaodof4ig1t87n31eobsyxgdq5ejo8tmsuxofgdi8nmfr9yaqx")
        if (response.success){
            setConnectionStatus('success')
            setToken(response.token)
            setIsLoading(false)
            history.push('/browse')
        } else{
            setConnectionStatus('failure')
            setErrorMessage(response.message)
            clearToken()
            setIsLoading(false)
        }

    }

    function copyMessage(){
        navigator.clipboard.writeText(messageToSign)
    }

    function renderSpinner(){
        if(isLoading){
            return(
                <React.Fragment>
                    <br/>
                    <Spinner animation="border" role="status">
                    </Spinner>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }
    }

    function renderConnectionFeedback(){
        if(connectionStatus === "success"){
            return(
                <React.Fragment>
                    <br/>
                    <Alert variant="success">
                        Login successful!
                    </Alert>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }else if(connectionStatus === "failure"){
            return(
                <React.Fragment>
                    <br/>
                    <Alert variant="danger">
                        {errorMessage}
                    </Alert>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }
    }

    function updateMessageToSign(server, user){
        setMessageToSign(server.toString() + user.toString())
    }

    function handleUserMessageChange(event){
        event.preventDefault()
        setUserMessage(event.target.value)
        updateMessageToSign(serverMessage, event.target.value)
    }

    function handlePubkeyChange(event){
        event.preventDefault()
        setPubkey(event.target.value)
    }

    function handleSignedMessageChange(event){
        event.preventDefault()
        setSignedMessage(event.target.value)
    }

    function generateRandomMessage(){
        let randomString = uuid()
        randomString = randomString.replace(/-/g, "")
        setUserMessage(randomString)
        updateMessageToSign(serverMessage, randomString)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Invoice copied!
        </Tooltip>
      );

  return (
    <React.Fragment>
        {/* <Row id='loginExplanations'>
            In Thunderbird, we check that you control the pubkey that bought previous videos and grant access to the user. 
            We do that by generating a message that you have to sign. Upon verification of the signature, we grant you access to pre-bought videos
        </Row> */}
        <Form onSubmit={verifyPubkey}>
            <Row>
                {/* <Col xs={12} md={5}> */}
                    <Form.Group controlId="pubkey">
                        <FloatingLabel
                            controlId="pubkey"
                            label="Enter your pubkey"
                            className="mb-3"
                            onChange={handlePubkeyChange}>
                            <Form.Control type="text"/>
                        </FloatingLabel>
                    </Form.Group>
                {/* </Col> */}
            </Row>
            <Row>
                <Col xs={12} md={5}>
                    <Form.Group controlId="serverMessage">
                        <FloatingLabel
                            controlId="serverMessage"
                            label="Server Message"
                            className="mb-3">
                            <Form.Control disabled type="text" value={serverMessage}/>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs={12} md={5}>
                    <Form.Group controlId="userMessage">
                        <FloatingLabel
                            controlId="userMessage"
                            label="User Message"
                            className="mb-3"
                            onChange={handleUserMessageChange}>
                            <Form.Control type="text" value={userMessage}/>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                    <Button onClick={generateRandomMessage}>Generate</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10}>
                    <Form.Group controlId="messageToSign">
                        <FloatingLabel
                            controlId="messageToSign"
                            label="Message to Sign"
                            className="mb-3">
                            <Form.Control disabled type="text" value={messageToSign}/>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                <div className="d-grid gap-2">
                        <OverlayTrigger
                            placement="bottom"
                            trigger='click'
                            // delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            {/* <Button type='button' onClick={copyInvoice}>Copy</Button> */}
                            <Button type='button' onClick={copyMessage}>Copy message</Button>
                        </OverlayTrigger>
                        </div>

                </Col>
            </Row>
            <Row>
                <Col xs ={12}>
                <Form.Group controlId="signedMessage">
                    <FloatingLabel
                        controlId="signedMessage"
                        label="Enter the Signed Message"
                        className="mb-3"
                        onChange={handleSignedMessageChange}>
                        <Form.Control type="input"/>
                    </FloatingLabel>
                </Form.Group>
                </Col>

            </Row>
            {renderSpinner()}
            {renderConnectionFeedback()}
            <Button type='submit'>Check my pubkey!</Button>
        </Form>
    </React.Fragment>
  );
}


  