import React, { useContext, useEffect } from "react"
import { VideoContext } from "./VideoProvider"
import { Video } from "./Video"
import { TechniqueContext } from "../techniques/TechniqueProvider"

export const VideoList = props => {
    const { videos, getVideos } = useContext(VideoContext)
    const { techniques, getTechniques } = useContext

    let workingArray = []

    useEffect(() => {
        getVideos().then(getTechniques).then(() => {
            const positionNumber = parseInt(props.match.params.positionId)
            const filteredTechs = techniques.filter(tech => tech.positionId === positionNumber)
            //need dual layer filtration here.  Refer to Glassdale
        })
    }, [])

    console.log(props.match.params)
    return (
        <div className="videos">
            <h1>Videos</h1>

            <article className="videoList">
                {
                    videos.map(video => {
                        return <Video key={video.id} title={video.title} thumbnail={video.thumbnail} id={video.id} description={video.description}/>
                    })
                }
            </article>
        </div>
    )
}