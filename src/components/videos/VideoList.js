import React, { useContext, useEffect } from "react"
import { VideoContext } from "./VideoProvider"
import { Video } from "./Video"

export const VideoList = props => {
    const { videos, getVideos } = useContext(VideoContext)

    useEffect(() => {
        getVideos()
    }, [])

    return (
        <div className="videos">
            <h1>Videos</h1>

            <article className="videoList">
                {
                    videos.map(video => {
                        return <Video key={video.id} title={video.title} thumbnail={video.thumbnail} id={video.id}/>
                    })
                }
            </article>
        </div>
    )
}