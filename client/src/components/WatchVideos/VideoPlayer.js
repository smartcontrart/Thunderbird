import React from "react";
import { Player, Video, DefaultUi } from "@vime/react";
import {API_URL} from '../../services/api.js'

import "@vime/core/themes/default.css";
import "./VideoPlayer.css";

export default function VideoPlayer(props) {
  
  function renderVideo(){
    if(props.videoUnlocked){
      return(
        <Player>
        <Video poster={`${API_URL}/thumbnails/${props.video.thumbnail}`}>
          <source data-src={`${API_URL}/streamVideos/${props.video.name}`} type="video/mp4" />
          <track
            default
            kind="subtitles"
            // src="https://media.vimejs.com/subs/english.vtt"
            srcLang="en"
            label="English"
          />
        </Video>
        <DefaultUi noClickToPlay></DefaultUi>
      </Player>
      )
    }else{
      return(
        <Player>
        <Video poster={`${API_URL}/thumbnails/${props.video.thumbnail}`}>
          {/* <source data-src={`${API_URL}/streamVideos/${props.video.name}`} type="video/mp4" /> */}
          <track
            default
            kind="subtitles"
            // src="https://media.vimejs.com/subs/english.vtt"
            srcLang="en"
            label="English"
          />
        </Video>
      </Player>
      )
    }
  }

  return (
    renderVideo()
  );
} 
