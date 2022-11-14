import React, {useState, useEffect} from "react";
import VideoPlayer from "../components/WatchVideos/VideoPlayer";
import Comments from "../components/WatchVideos/Comments.js";
import InfoBar from "../components/WatchVideos/InfoBar";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./scenes.css"
import { useLocation } from 'react-router-dom'
import {getVideoData} from '../services/api.js'
import { withRouter } from "react-router";

const WatchVideo = () => {
  const location = useLocation()
  const [myVideo, setVideo] = useState(null)
  const [userHasVideo, setUserHasVideo] = useState(false)
  const [videoUnlocked, setVideoUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let video_name = location.pathname.split("/")
    video_name = video_name[video_name.length -1]
    async function fetchVideoData(){
      const video_data = await getVideoData(video_name)
      setVideo(video_data.videoData)
      setUserHasVideo(video_data.userHasVideo)
      setVideoUnlocked(video_data.userHasVideo)
      setIsLoading(false)
    }
    fetchVideoData();
  },[])

  if(isLoading){
    return(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }else{
      return (
        <Container className="scene" id="WatchVideo_container">
            <Row>
              <Col  lg={2} id="WatchVideo_black-col"></Col>
              <Col md={12} lg={8} id="WatchVideo_video-player"><VideoPlayer video={myVideo} videoUnlocked={videoUnlocked}/></Col>
              <Col lg={2} id="WatchVideo_black-col"></Col>
            </Row>
    
            <Row>
              <Col lg={2} ></Col>
              <Col md={12} lg={8} id="WatchVideo_infobar"><InfoBar video={myVideo} userHasVideo={userHasVideo} setVideoUnlocked={setVideoUnlocked}/></Col>
              <Col lg={2}></Col>
            </Row>
    
            <Row>
              <Col lg={2} ></Col>
              <Col md={12} lg={8}>
                <Comments video={myVideo}/>
              </Col>
              <Col lg={2} ></Col>
            </Row>
    
          </Container>
      );

  }
}

export default withRouter(WatchVideo)