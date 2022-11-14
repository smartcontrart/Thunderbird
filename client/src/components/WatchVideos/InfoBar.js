import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { addView} from '../../services/api.js'
import InvoiceManager from '../InvoiceManager'
import "./InfoBar.css"



export default function InfoBar(props) {
  const [tips, setTips] = useState(props.video.tips);
  const [num_views, setViews] = useState(props.video.views);
  const [show, setShow] = useState(false);  
  const [invoiceType, setInvoiceType] = useState(null)
  const [unlockInvoicePaid, setUnlockInvoicePaid] = useState(props.userHasVideo); 
  const [invoiceAmount, setInvoiceAmount] = useState(null)
  const [tipInvoicePaid, setTipInvoicePaid] = useState(false); 
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    if(unlockInvoicePaid) {
      addView(props.video.name)
      props.setVideoUnlocked(true)
      setUnlockInvoicePaid(true)
    }
    setViews(num_views + 1)
  },[unlockInvoicePaid])

  useEffect(()=>{
    if(tipInvoicePaid) setTips(tips + 1)
  },[tipInvoicePaid])


  async function tip(event){
    event.preventDefault()
    setInvoiceAmount(parseInt(event.target.elements.tipAmount.value))
    setInvoiceType("tip")
    handleShow()
  }
  
  function buy(event){
    event.preventDefault()
    setInvoiceAmount(props.video.price)
    setInvoiceType("buy")
    handleShow()
  }

  function renderDate(date){
    console.log(date)
    if(date){
      let d = new Date(parseInt(date))
      let day = d.getDate()
      let month = d.getMonth() + 1
      let year = d.getFullYear()
      return day + "/" + month + "/" + year
    }else return "nodate!"
   }

   function test(){
    // setUnlockInvoicePaid(true)
    props.setVideoUnlocked(true)
    handleClose()
   }

  function renderInvoiceManager(){
    if(show === true){
      if(invoiceType === 'buy'){
        return(
          <InvoiceManager 
          invoiceType = {invoiceType}
          amount={invoiceAmount} 
          memo='unlockViewing' 
          video = {props.video}
          show={show} 
          handleClose={handleClose} 
          setInvoicePaid={test}/>
        )
      }else if(invoiceType === "tip"){
        return(
          <InvoiceManager 
          invoiceType = {invoiceType}
          amount={invoiceAmount} 
          memo='tip' 
          video = {props.video}
          show={show} 
          handleClose={handleClose} 
          setInvoicePaid={setTipInvoicePaid}/>
        )
      }else return null
    }
  }


  function renderBuyTipButton(){
    if(unlockInvoicePaid){
      return(
        <React.Fragment>
          <Col xs={8}>
          <Form.Group className="mb-1" controlId="tipAmount">
            <Form.Control type="number" placeholder="100" defaultValue="500" />
          </Form.Group>
        </Col>
          <Col xs={2} id="InfoBar_buytip_button">
            <Button type='submit'>Tip</Button>
          </Col>
        </React.Fragment>
      )
    }else{
      return(
        <Col xs={2} id="InfoBar_buytip_button" >
          <Button type='submit'>Buy</Button>
        </Col>
      )
    }
  }

  

  return (
    <Container id="InfoBar_container">
      <Row id="InfoBar_top">
        <Col xs= {12} md={8} id="InfoBar_title">{props.video.title}</Col>
        <Col xs={12} md={4} id="InfoBar_top_right"> 
          <Row id="InfoBar_author">
            <Col>
            {props.video.author}
            </Col>
          </Row>
          <Row id="InfoBar_published-date">
            <Col>{renderDate(props.video.publication_date)}</Col>
          </Row>
        </Col>
      </Row>
      <Row id="InfoBar_middle">
        <Col xs={6} md={2} id="InfoBar_tip_number">{tips} {tips > 1 ? "tips" : "tip"}</Col>
        <Col xs={6} md={4} id="InfoBar_tip_submission">
          <Form onSubmit={unlockInvoicePaid ? tip : buy}>
            <Row>
                {renderBuyTipButton()}
            </Row>
          </Form>
        </Col>
        <Col xs={12} md={6} id="InfoBar_views">{num_views} Views </Col>
      </Row>
      <Row id="InfoBar_description">
        <Col id="InfoBar_description_content">
        {props.video.description}
        </Col>
      </Row>
      {renderInvoiceManager()}
    </Container>
  );
}
