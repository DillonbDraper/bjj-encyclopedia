import React, { useContext, useEffect, useState } from "react"
import { VideoContext } from "./VideoProvider"
import { Video } from "./Video"
import { TechniqueContext } from "../techniques/TechniqueProvider"

export const VideoList = props => {
    const { videos, getVideos } = useContext(VideoContext)
    const { techniques, getTechniques } = useContext(TechniqueContext)

    const [ workingVideos, setWorkingVideos ] = useState([])
   

    useEffect(() => {
        getVideos().then(getTechniques).then(() => {
            if (props.history.location === "/") {
                setWorkingVideos(videos)
            }
        })
    }, [])

    useEffect(() => {
        if (props.match.params.positionId) {
            console.log(props.match)
        const positionNumber = parseInt(props.match.params.positionId)
        let workingTechs = techniques.filter(tech=> tech.positionId === positionNumber)


        const filteredVids = videos.filter(vid=> {
            for (const tech of workingTechs) {
                if (vid.techniqueId === tech.id) {
                    return vid
                }
            }
        })
        setWorkingVideos(filteredVids)
    }

    else {
        setWorkingVideos(videos)
    }
    }, [props.match])

    return (
        <div className="videos">
            <h1>Videos</h1>

            <article className="videoList">
                {
                    workingVideos.map(video => {
                        return <Video key={video.id} title={video.title} thumbnail={video.thumbnail} id={video.id} description={video.description}/>
                    })
                }
            </article>
        </div>
    )
}