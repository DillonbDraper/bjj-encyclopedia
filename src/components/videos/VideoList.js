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
            if (props.location.pathname === "/") {
                console.log(props.history)
                setWorkingVideos(videos)
                console.log(videos)
            }
        })
    }, [])

    useEffect(() => {
        if (props.match.params.positionId) {
            console.log(props.match)
        handleURL(props, techniques, videos, setWorkingVideos)
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

const handleURL = (props, techs, vids, setter) => {
    
    const positionNumber = parseInt(props.match.params.positionId)
    const orientationNumber = parseInt(props.match.params.orientationId)
    const subpositionNumber = parseInt(props.match.params.subpositionId)

    console.log(positionNumber)
    console.log(orientationNumber)
    console.log(subpositionNumber)

    let workingTechs = techs.filter(tech => {
        if (!orientationNumber && !subpositionNumber) {
        return tech.positionId === positionNumber
        } else if (orientationNumber && !subpositionNumber) {
            return (tech.positionId === positionNumber && tech.orientationId === orientationNumber)
        } else if (!orientationNumber && subpositionNumber) {
            return (tech.positionId === positionNumber && tech.subpositionId === subpositionNumber)
        } else if (orientationNumber && subpositionNumber) {
            return (tech.positionId === positionNumber && tech.orientationId === orientationNumber && tech.subpositionId === subpositionNumber)
        }
    })


        const filteredVids = vids.filter(vid=> {
            for (const tech of workingTechs) {
                if (vid.techniqueId === tech.id) {
                    return vid
                }
            }
        })
        setter(filteredVids)
}