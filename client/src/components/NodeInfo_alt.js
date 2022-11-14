import React, {useState} from "react";
import {Form, FloatingLabel, Button, Spinner, Alert} from "react-bootstrap";
import { postNodeInfos } from "../services/api.js";

export default function NodeInfo(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState(null)
    const [nodeAlias, setNodeAlias] = useState(null)


    async function connectNode(e){
        e.preventDefault()
        setIsLoading(true)
        let node_info = await postNodeInfos({
            tls_cert: e.target.elements.tls_cert.value, 
            macaroon: e.target.elements.macaroon.value,
            nodeIp: e.target.elements.nodeIp.value})
        if(node_info.success){
            setNodeAlias(node_info.alias)
            setIsLoading(false)
            setConnectionStatus(null)
            props.setNodeconnected(true)
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
                        Connection with {nodeAlias} established.
                    </Alert>
                    <br/><br/><br/>
                </React.Fragment>
            )
        }else if(connectionStatus === "failure"){
            <React.Fragment>
                <br/>
                <Alert variant="danger">
                    Could not establish a connection with your node. Please verify your information
                </Alert>
                <br/><br/><br/>
            </React.Fragment>
        }
    }

    function renderConnectionButton(){
            if (props.nodeConnected) {
                return null
            }else return <Button type='submit'>{connectionStatus === null ? "Connect Node": "Retry connection"}</Button>  
    }

  return (
    <Form onSubmit={connectNode}>
        <Form.Group controlId="tlsCert">
            <FloatingLabel
                controlId="tls_cert"
                label="TLS Certificate"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Enter your tls certificate encoded in base64" value="LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWMyZ0F3SUJBZ0lSQUl1V2tDZVl2VUd4djRYVDExOUJmdzR3Q2dZSUtvWkl6ajBFQXdJd01URWYKTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERU9NQXdHQTFVRUF4TUZZV3hwWTJVdwpIaGNOTWpFd09ESTJNVFkxT1RBd1doY05Nakl4TURJeE1UWTFPVEF3V2pBeE1SOHdIUVlEVlFRS0V4WnNibVFnCllYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRCWk1CTUdCeXFHU000OUFnRUcKQ0NxR1NNNDlBd0VIQTBJQUJNZGN1NHdOWXVUUjFYMmRrUlVZT2MwcmZ6R0ZFSEdqRGxrTVFvWlU5Sjc5NFVSbgpMMUMxRkd2NjJSREpkb0UzZUpGaVM1ZHMzMlR3eVhCQ09lYzVLdG1qZ2NVd2djSXdEZ1lEVlIwUEFRSC9CQVFECkFnS2tNQk1HQTFVZEpRUU1NQW9HQ0NzR0FRVUZCd01CTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME8KQkJZRUZLRFZXMUh3VVhnVlJKQlUvZ2ZZRjh4VWlWWlRNR3NHQTFVZEVRUmtNR0tDQldGc2FXTmxnZ2xzYjJOaApiR2h2YzNTQ0JXRnNhV05sZ2c1d2IyeGhjaTF1TWkxaGJHbGpaWUlFZFc1cGVJSUtkVzVwZUhCaFkydGxkSUlIClluVm1ZMjl1Ym9jRWZ3QUFBWWNRQUFBQUFBQUFBQUFBQUFBQUFBQUFBWWNFckJVQUFqQUtCZ2dxaGtqT1BRUUQKQWdOSUFEQkZBaUVBbENXNTU2cXlkNzQ3aXdUdmVwTlNGMU1MUVI2Ry9KNkNEZStBZk1JNWZuTUNJRndwdGdiYwpQSnhYQjYwVDUyT0dGSHV6RytiQmJIbnlURUJOWjE2Rk5TaTMKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo="/>
            <Form.Text> 
                    Open your node's terminal and run <b>base64 ~/.lnd/tls.cert | tr -d '\n'</b>
            </Form.Text>
            </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="macaroon"> 
            <FloatingLabel
                    controlId="macaroon"
                    label="macaroon"
                    className="mb-3"
                >
                <Form.Control type="text" placeholder="Enter your Macaroon encoded in hex" value="AgEDbG5kAvgBAwoQsEK5XgNuZsL9OVzJf4PR8xIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgCh/Rl6YJbTY1eV9qqgPn6igb+5zD250UP7nC/0wt3uE="/>
            <Form.Text>
                    Open your node's terminal and run <b>lncli bakemacaroon info:read invoices:write</b>
            </Form.Text>
            </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="nodeIp">
            <FloatingLabel
                    controlId="nodeIp"
                    label="Node IP"
                    className="mb-3"
                    
                >
                <Form.Control type="string" placeholder="127.0.0.1:10001" value="127.0.0.1:10001" />
            </FloatingLabel>
        </Form.Group>

        {renderSpinner()}
        {renderConnectionFeedback()}
        {renderConnectionButton()}
    </Form>
  );
}


  