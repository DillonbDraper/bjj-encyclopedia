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
        const video = videos.find(vid=> vid.id === parseInt(props.match.params.videoId))
        setVideo(video)
    }, [videos])
    

    console.log(props.match.params.videoId)
    console.log(videos)
    console.log(video)

    return (
        <ReactPlayer url={video.url} controls={true}/>
    )
}