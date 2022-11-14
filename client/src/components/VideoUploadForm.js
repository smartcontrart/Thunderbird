import React, {useState} from "react";
import { Container, Row, Form,Button, Spinner, Alert, Col} from "react-bootstrap";
import {Link} from "react-router-dom"
import { uploadFile } from '../services/api.js'
import InvoiceManager from "./InvoiceManager.js";
import { getToken } from "../services/api.js";
import './VideoUploadForm.css'


export default function UploadVideo() {
    const [uploadStatus, setUploadStatus] = useState(null);
    const [invoicePaid, setInvoicePaid] = useState(false)
    const [showInvoiceManager, setShowInvoiceManager] = useState(false)
    const [videoFileFeedback, setVideoFileFeedback] = useState(null)
    const [thumbnailFileFeedback, setThumbnailFileFeedback] = useState(null)
    const userLoggedIn = getToken() === "" ? false : true
    
    async function uploadFiles(event){
        setUploadStatus("uploading")
        event.preventDefault();
        let data = new FormData();
        data.append("video", event.target.elements.videoFile.files[0])
        data.append("thumbnail", event.target.elements.thumbnailFile.files[0])
        data.append("videoTitle", event.target.elements.videoTitle.value)
        data.append("videoDescription", event.target.elements.videoDescription.value)
        let req = await uploadFile(data)
        if (req.success){
            setUploadStatus("success")
        }else{
            setUploadStatus("fail")
        }
    }

    function renderLoginAlert(){
        if (!userLoggedIn){
            return(
                <React.Fragment>
                    <br/>
                    <Alert variant="warning">
                        You are not <Link to="/login"> logged in</Link>. If you upload a video, you won't be able to collect the funds generated.
                    </Alert>
                    <br/>
                </React.Fragment>
            )
        }
    }

    function renderSpinner(){
        if(uploadStatus === "uploading"){
            return(
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        }
    }

    function renderUserFeedback(){
        if(uploadStatus === "success"){
            return <Alert variant='success'> Upload successful!</Alert>
        }else if( uploadStatus === "fail"){
            return <Alert variant='danger'> Upload failed ...</Alert>
        }
    }

    function renderInvoiceManager(){
        setShowInvoiceManager(!showInvoiceManager)
    }

    function validateFile(file, fileType){
        let fileFeedback = [];
        let maxSize = 0;
        if(file){
            console.log(fileType)
            console.log(file.size)
            if(fileType === "video"){
                maxSize = 1000000000
            }else if (fileType === "image"){
                maxSize = 10000000
            }
            if(file.type.substring(0,5) !== fileType){
                fileFeedback.push("typeError")
            }
            if(file.size > maxSize){
                fileFeedback.push("sizeError")
            }
            let feedback = fileFeedback.length === 0 ? 'validated' : fileFeedback
            if(fileType === "video") {setVideoFileFeedback(feedback)}
            else if(fileType === "image"){setThumbnailFileFeedback(feedback)}
        }
    }

    function renderFileFeedBack(feedback){
        let alertMessage = "File invalid, please check:"
        if (feedback === null || feedback === 'validated') {
            return null
        }
        else{
            if (feedback.includes("sizeError")){
                alertMessage = alertMessage + " file too big,"
            }
            if (feedback.includes("typeError")){
                alertMessage = alertMessage + " file type"
            }
            return(<Alert variant="danger">{alertMessage}</Alert>)
        }
    }

    function renderInvoicePaymentButton(){
        if(videoFileFeedback === 'validated' && thumbnailFileFeedback === 'validated'){
            return(<Button id="upload_video_form_submit_button" type='button' onClick={renderInvoiceManager}>Generate Invoice</Button>)
        }
    }


    return (
        <Container id="VideoUpload_container">
            {showInvoiceManager === true ? <InvoiceManager amount={2000} memo='Upload fee' show={showInvoiceManager} handleClose={renderInvoiceManager} setInvoicePaid={setInvoicePaid}/> : null}
            <Row>
                <Form id="VideoUpload_form" onSubmit={uploadFiles}>
                        <Form.Group as={Row} onChange={(e) => validateFile(e.target.files[0],"video")} controlId="videoFile" className="mb-3">
                            <Col xs={12} md={3}>
                                <Form.Label column>Video Upload</Form.Label>
                            </Col>
                            <Col xs={12} md={9}>
                                <Form.Control column xs={12} md={9} type="file" placeholder="Chose a video file"/>
                            </Col>
                        </Form.Group>
                        {videoFileFeedback !== null ? renderFileFeedBack(videoFileFeedback) : null}
                    <Form.Group as={Row} onChange={(e) => validateFile(e.target.files[0],"image")} controlId="thumbnailFile" className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Label column>Thumbnail Upload</Form.Label>
                        </Col>
                        <Col xs={12} md={9}>
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                    {thumbnailFileFeedback !== null ? renderFileFeedBack(thumbnailFileFeedback) : null}
                    <Form.Group as={Row} controlId="videoTitle" className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Label column>Video Title</Form.Label>
                        </Col>
                        <Col xs={12} md={9}>
                            <Form.Control type="input" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="videoDescription" className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Label column>Video Description</Form.Label>
                        </Col>
                        <Col xs={12} md={9}>
                            <Form.Control as="textarea" />
                        </Col>
                    </Form.Group>
{/* 
                    <Form.Group as={Row} controlId="videoPrice" className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Label column>Video Price</Form.Label>
                        </Col>
                        <Col xs={12} md={9}>
                            <Form.Control as="input" />
                        </Col>
                    </Form.Group> */}

                    <Row id="loading_spinner">
                        {renderSpinner()}
                    </Row>
                    <Row>
                        {renderUserFeedback()}
                    </Row>
                    {renderLoginAlert()}
                    {invoicePaid ? 
                        <Button id="upload_video_form_submit_button" type='submit'>Upload</Button> 
                        : 
                        renderInvoicePaymentButton()}
                </Form>
            </Row>
        </Container>
    );
}
