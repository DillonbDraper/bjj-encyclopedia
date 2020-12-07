import React, { useContext, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube'
import { VideoContext } from './VideoProvider';

export const VideoDetail = (props) => {
    const {videos, getVideos} = useContext(VideoContext)

    useEffect(() => {
        getVideos()
    }, [])
    
    const video = videos.find(vid=> vid.id === parseInt(props.match.param.videoId))

    return (
        <ReactPlayer url={video.url} />
    )
}