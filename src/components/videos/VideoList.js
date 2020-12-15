import React, { useContext, useEffect, useState } from "react"
import { VideoContext } from "./VideoProvider"
import { Video } from "./Video"
import { TechniqueContext } from "../techniques/TechniqueProvider"

export const VideoList = props => {
    const { videos, getVideos } = useContext(VideoContext)
    const { techniques, getTechniques } = useContext(TechniqueContext)

    const [workingVideos, setWorkingVideos] = useState([])


    useEffect(() => {
        getTechniques().then(getVideos)
    }, [])

    //Makes it so home page displays all videos
    useEffect(() => {
        if (props.location.pathname === "/") {
            setWorkingVideos(videos)
        }
    })

    //Alters videos displayed based on if URL has a positionId or techniqueId or neither.
    useEffect(() => {
        if (props.match.params.positionId || props.match.params.techniqueId) {
            handleURL(props, techniques, videos, setWorkingVideos)
        }

    }, [videos, props.match])

    return (
        <div className="videos">
            <h1>Videos</h1>

            <article className="videoList">
                { workingVideos.length < 1 ? <h2>No videos matching your search parameters</h2> :
                   workingVideos.map(video => {
                        return <Video key={video.id} title={video.title} thumbnail={video.thumbnail} id={video.id} description={video.description} />
                    }) }
                
            </article>
        </div>
    )
}

//Handles variable number/nature of URL parameters, sets videos appropriately
const handleURL = (props, techs, vids, setter) => {

    const positionNumber = parseInt(props.match.params.positionId)
    const orientationNumber = parseInt(props.match.params.orientationId)
    const subpositionNumber = parseInt(props.match.params.subpositionId)
    const techniqueNumber = parseInt(props.match.params.techniqueId)


    let workingTechs = techs.filter(tech => {
        if (techniqueNumber) {
            return tech.id === techniqueNumber
        } else if (!orientationNumber && !subpositionNumber) {
            return tech.positionId === positionNumber
        } else if (orientationNumber && !subpositionNumber) {
            return (tech.positionId === positionNumber && tech.orientationId === orientationNumber)
        } else if (!orientationNumber && subpositionNumber) {
            return (tech.positionId === positionNumber && tech.subpositionId === subpositionNumber)
        } else if (orientationNumber && subpositionNumber) {
            return (tech.positionId === positionNumber && tech.orientationId === orientationNumber && tech.subpositionId === subpositionNumber)
        }
    })


    //Loop loop goes through all videos and returns only those with a techniqueId that matches an Id in one of the tecniques in workingTechs
    const filteredVids = vids.filter(vid => {
        for (const tech of workingTechs) {
            if (vid.techniqueId === tech.id) {
                return vid
            }
        }
    })
    setter(filteredVids)

}