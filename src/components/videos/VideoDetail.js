import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube'
import { VideoContext } from './VideoProvider';
import { NoteList } from "../notes/NoteList"
import "./VideoDetail.css"

export const VideoDetail = (props) => {
    const {videos, getVideos} = useContext(VideoContext)

    const [video, setVideo] = useState({})
    const [playing, setPlaying] = useState(false)

    const player = useRef(null)

    useEffect(() => {
        getVideos()
    }, [])

    //Sets the video to be played depending on the URL.  Empty object after || is to ensure it is never null and breaks the app
    useEffect(() => {
        const video = videos.find(vid=> vid.id === parseInt(props.match.params.videoId)) || {}
        setVideo(video)
    }, [videos])
    
    //Uses ReactPlayer imported component to display video on page with YT controls accessible.
    return (
        <>
        <div className="player__wrapper">
        <ReactPlayer url={video.url} 
        className="player" 
        controls={true}
        width='100%'
        playing={playing}
        height='30em'
        ref={player}
        />
        <NoteList {...props} player={player} playing={playing} setPlaying={setPlaying} />
        </div>
        </>
    )
}