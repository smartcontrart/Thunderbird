import React, {useState} from "react";
import {Form, FloatingLabel, Button, Spinner, Alert} from "react-bootstrap";
import { postNodePubkey } from "..api.js";

export default function CheckPubKey(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState(null)
    const [nodeAlias, setNodeAlias] = useState(null)


    async function findNode(e){
        e.preventDefault()
        setIsLoading(true)
        let node_info = await postNodePubkey(e.target.elements.pubkey.value)
        console.log(node_info)
        setIsLoading(false)
        if(node_info.success ===  true){  
            setNodeAlias(node_info.alias)
            setConnectionStatus("success")
            props.setNodeIdentified(true)
        }else{
            setConnectionStatus("failure")
        }
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
                        We found your node. <b>{nodeAlias}</b>, is that you? <br/><br/>If so, please proceed, if not, please check your pubkey again.
                    </Alert>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }else if(connectionStatus === "failure"){
            return(
                <React.Fragment>
                    <br/>
                    <Alert variant="danger">
                        Could not establish a connection with your node. Please verify your pubkey
                    </Alert>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }
    }

    function renderConnectionButton(){
            return <Button type='submit'>{connectionStatus === null ? "Check node": "Recheck node"}</Button>  
    }

  return (
    <Form onSubmit={findNode}>
        <Form.Group controlId="pubkey">
            <FloatingLabel
                controlId="pubkey"
                label="Pubkey"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="024ff764ce2c64120828e60fa0de09e4ff152f8381522bc7c3fbf7774ab5faf243"/>
                <Form.Text>Only the node associated to this public key will be able to access the funds associated with the video you are uploading</Form.Text>
            </FloatingLabel>
        </Form.Group>

        {renderSpinner()}
        {renderConnectionFeedback()}
        {renderConnectionButton()}
    </Form>
  );
}


  