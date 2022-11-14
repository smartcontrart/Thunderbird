import React, {useState, useEffect} from "react";
import { Container, Spinner, Card, Ratio, Col, Row} from "react-bootstrap";
import { getVideos, API_URL } from '../services/api.js'
import { Link } from "react-router-dom";
import './VideoList.css'

export default function Browse() {
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      async function fetchVideos(){
        const videos_fetched = await getVideos();
        setVideos(videos_fetched)
        setIsLoading(false)
        console.log(videos_fetched)
      }
      fetchVideos();
    },[])

    function renderCard(video){
        return(
            <Card style={{ width: '18rem' }} id="video_list_card">
                <Link to={`/videos/${video.name}`} className="video_list_link" title={video.title}>
                    <Card.Header id="video_list_card_header">{video.title}</Card.Header>
                    <Ratio aspectRatio='16x9'>  
                        <Card.Img variant="top" src={`${API_URL}/thumbnails/${video.thumbnail}`}/>
                    </Ratio>
                </Link>
                <Link to={`/videos/${video.name}`} className="video_list_link" title={video.description}>
                    <Card.Body id="video_list_card_body">
                        <Card.Text>
                        {video.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer id="video_list_card_footer">
                        Published on 12/31/21
                    </Card.Footer>
                </Link>
                </Card>
            
        )
    }

    function renderColumn(videos){
        return(
            videos.map((video)=>{
                return(
                    <Col xs={12} md={4} id="video_list_col">
                        {renderCard(video)}
                    </Col>
                )
            })
        )
    }

    function renderRow(){
        // Create a deepcopy of the video list we fetched to render it
        let videosArray = [...videos]
        let videoRows = []
        while(videosArray.length > 0){
            videoRows.push(videosArray.splice(0,3))
        }
        return(
            videoRows.map((row)=>{
                return (
                    <Row xs={12} id="video_list_row">
                        {renderColumn(row)}
                    </Row>
                )
            })
            // Splice is altering the array hence the deep copy
            // let rowOfVideos = videosArray.splice(0,4)
        )
        }
    // }

    // function renderRow(){
    //     // Create a deepcopy of the video list we fetched to render it
    //     let videosArray = [...videos]
    //     while(videosArray.length){
    //         // Splice is altering the array hence the deep copy
    //         let rowOfVideos = videosArray.splice(0,4)
    //         return (
    //             <Row xs={12} id="video_list_row">
    //                 {renderColumn(rowOfVideos)}
    //             </Row>
    //         )
    //     }
    // }

    function renderVideoList(){
        if(isLoading){
            return(
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        }else{
            return(
                renderRow()
            )
        }
    }

  return (
      <Container id="VideoUpload_container">
          {renderVideoList()}
          {/* {renderColumn(videosList)} */}
      </Container>
  );
}
