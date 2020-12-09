import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import { VideoContext } from './VideoProvider';

export const VideoDetail = (props) => {
    const {videos, getVideos} = useContext(VideoContext)

    const [video, setVideo] = useState({})

    useEffect(() => {
        getVideos()
    }, [])

    useEffect(() => {
        const video = videos.find(vid=> vid.id === parseInt(props.match.params.videoId)) || {}
        setVideo(video)
    }, [videos])
    
    return (
        <ReactPlayer url={video.url} controls={true}/>
    )
}