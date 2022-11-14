import React, {useState, useEffect} from "react";
import { Container, Row, Col, Form,Button, Modal, Tooltip, OverlayTrigger, Alert} from "react-bootstrap";
import {getInvoice, getInvoiceStatus, buyVideo, sendTip} from '../services/api.js'
import QRCode from "react-qr-code";

export default function InvoiceManager(props) {
  const [invoice_id, setInvoiceID] = useState(null)
  const [invoicePaid, setInvoicePaid] = useState(false)
  const [invoiceStatusCheckAttempts, setInvoiceStatusCheckAttempts] = useState(0)
  const [invoice, setInvoice] = useState("")

  
    useEffect(() => {
          generateInvoice()
          setInvoiceStatusCheckAttempts(1)
      },[]);
    

    useEffect(()=>{
      checkInvoiceStatus()
      if (invoicePaid){
        if (props.invoiceType === 'buy'){
          buyVideo(props.video)
        }else if(props.invoiceType === 'tip'){
          sendTip(props.amount, props.video.name)
        }
      }
    }, [invoiceStatusCheckAttempts])



    async function checkInvoiceStatus(){
        if (invoiceStatusCheckAttempts !== 0 && invoicePaid === false){
          setTimeout(async function(){
              let invoiceStatus = await getInvoiceStatus(invoice_id)
              setInvoiceStatusCheckAttempts(invoiceStatusCheckAttempts + 1)
              if(invoiceStatus.success) {
                props.setInvoicePaid(true)
                setInvoicePaid(true)
                handleClose()
              }
            }, 2000)
        }
    }

    function copyInvoice(){
        navigator.clipboard.writeText(invoice)
    }
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Invoice copied!
        </Tooltip>
      );

    async function generateInvoice(){
        let invoice_hash = await getInvoice(props.amount, props.memo)
        setInvoice(invoice_hash.request)
        setInvoiceID(invoice_hash.id)
    }

    function handleClose(){
      setInvoiceStatusCheckAttempts(0)
      props.handleClose()
    }


    function renderInvoiceManagementUI(){
        if(invoice === ""){
            return(
                <Col>
                    <Button sm={4} type='button' onClick={generateInvoice}>Generate Invoice</Button>
                </Col>
            )
        }else if(invoicePaid===false){
            return(
                <React.Fragment>
                    <Col sm={12}>
                        <div className="d-grid gap-2">
                            <Button type='button' onClick={generateInvoice}>Refresh Invoice</Button>
                        </div>
                    </Col>
                    <br/>
                    <br/>
                    <Col sm={12}>
                        <div className="d-grid gap-2">
                        <OverlayTrigger
                            placement="bottom"
                            trigger='click'
                            // delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            <Button type='button' onClick={copyInvoice}>Copy</Button>
                        </OverlayTrigger>
                        </div>
                    </Col>

                </React.Fragment>
            )
        }
    }

    return (

      <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={props.show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { invoicePaid ? <Alert variant='success'>Thank you!</Alert> : <QRCode value={invoice}></QRCode>}
        <br/>
        <br/>
        <Container show={props.show} id="VideoUpload_container">
            <Row>
                <Form>
                    <Row className="align-items-center">
                      <Col sm={12}  className="d-grid gap-2">
                      <Form.Label visuallyHidden>
                          Invoice
                      </Form.Label>
                      <Form.Control value={invoice} readOnly placeholder="Invoice" />
                      </Col>
                      {renderInvoiceManagementUI()}
                    </Row>
                </Form>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
       
    );
}
