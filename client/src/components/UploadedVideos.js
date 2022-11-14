import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { getPubkeyVideosData } from '../services/api'
import './UploadedVideos.css'

export default function UploadedVideos() {
    const [videos, setVideos] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [totalFunds, setTotalFunds] = useState(0)
    
    

    useEffect(()=>{
        loadData()
    },[dataLoaded])

    async function loadData(){
        let videos = await getPubkeyVideosData()
        console.log(`HERE: ${JSON.stringify(videos)}`)
        if(videos.success){
            setVideos(videos.videosData)
            calculateTotalFunds()
        }else{
            setVideos([])
        }
        setDataLoaded(true)
    }

    function calculateTotalFunds(){
        let total = 0
        if(dataLoaded){
            return(
                videos.map((video) => {
                    total += parseInt(video.purchases_amount) + parseInt(video.tips_amount)
                    setTotalFunds(total)
                })
                )
            }
        return total
    }

    function renderVideosList(){
        if(dataLoaded){
            return(
                videos.map((video)=>{
                    console.log(video)
                    return (
                        <Row className="dashboard_row">
                            <Col xs={2} className="dashboard_col">{video.title}</Col>
                            <Col xs={2} className="dashboard_col">{video.purchases}</Col>
                            <Col xs={2} className="dashboard_col">{parseInt(video.purchases_amount)}</Col>
                            <Col xs={2} className="dashboard_col">{video.tips}</Col>
                            <Col xs={2} className="dashboard_col">{parseInt(video.tips_amount)}</Col>
                            <Col xs={2} className="dashboard_col total col_total">{parseInt(video.purchases_amount) + parseInt(video.tips_amount)}</Col>
                        </Row>        
                    )
                })
            )
        }
    }

    function renderTotal(){
        return(
            <Row className="total_row dashboard_row total">
                <Col xs={10}></Col>
                <Col xs={2} className="total col_total">{totalFunds}</Col>
            </Row>   
        )
    }

    function renderDashboard(){
        if(dataLoaded){
            if(videos.length > 0){
                return(
                    <React.Fragment>
                         <Row className="dashboard_row">
                            <Col xs={2} className="col_header">Title</Col>
                            <Col xs={2} className="col_header">Purchases</Col>
                            <Col xs={2} className="col_header">Sats from purchases</Col>
                            <Col xs={2} className="col_header">Tips</Col>
                            <Col xs={2} className="col_header">Sats from tips</Col>
                            <Col xs={2} className="col_header total col_total">Total Funds available</Col>
                        </Row>
                        {renderVideosList()}
                        {renderTotal()}
                    </React.Fragment>
                )
            }else{
                return(
                    <Alert variant = 'warning'>
                        You did not upload any videos. Upload some and come back!
                    </Alert>
                )
            }
        }
    }
  
    return (
      <Container>
          {renderDashboard()}
      </Container>
  );
}
