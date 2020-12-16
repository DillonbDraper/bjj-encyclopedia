import React, { useContext, useEffect, useState } from "react"
import { VideoContext } from "./VideoProvider"
import { Video } from "./Video"
import { TechniqueContext } from "../techniques/TechniqueProvider"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./VideoList.css"

export const VideoList = props => {
    const { videos, getVideos } = useContext(VideoContext)
    const { techniques, getTechniques } = useContext(TechniqueContext)

    const [workingVideos, setWorkingVideos] = useState([])
    const [gi, setGi] = useState("both");

    useEffect(() => {
        getTechniques().then(getVideos)
    }, [])

    //Makes it so home page displays all videos
    // useEffect(() => {
    //     if (props.location.pathname === "/") {
    //         setWorkingVideos(videos)
    //     }
    // }, [])

    //Alters videos displayed based on if URL has a positionId or techniqueId or neither.
    useEffect(() => {
        if (props.match.params.positionId || props.match.params.techniqueId) {
            handleURL(props, techniques, videos, setWorkingVideos)
        }

    }, [videos, props.match])

    useEffect(() => {
        if (gi === "gi") {
            handleURL(props, techniques, videos, setWorkingVideos).then(vids => {
            const newVideos = vids.filter(vid => vid.gi === true)
            setWorkingVideos(newVideos)
        })
        } else if (gi === "nogi") {
            handleURL(props, techniques, videos, setWorkingVideos).then(vids => {
            const newVideos = vids.filter(vid => vid.gi === false)
            setWorkingVideos(newVideos)
        })
        } else if (gi === "both") {
            getTechniques().then(getVideos).then(() => handleURL(props, techniques, videos, setWorkingVideos)).then(vids => setWorkingVideos(vids))
            }
        
    }, [gi])


    const handleChange = (event) => {
        setGi(event.target.value);
    };


    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Show Videos For</FormLabel>
                <RadioGroup aria-label="gender" name="gi" value={gi} onChange={handleChange}>
                    <FormControlLabel value={"both"} control={<Radio />} label="Both" />
                    <FormControlLabel value={"gi"} control={<Radio />} label="Gi" />
                    <FormControlLabel value={"nogi"} control={<Radio />} label="No gi" />
                </RadioGroup>
            </FormControl>
            <div className="videos">

                <article className="videoList">
                    {workingVideos.length < 1 ? <h1>No videos found matching set parameters</h1> : workingVideos.map(video => {
                        return <Video key={video.id} title={video.title} thumbnail={video.thumbnail} id={video.id} description={video.description} />
                    })}

                </article>
            </div>
        </>
    )
}

//Handles variable number/nature of URL parameters, sets videos appropriately
const handleURL = async(props, techs, vids, setter) => {
    if (props.location.pathname === "/") {
        return vids
    }

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
        } else {workingTechs = techs}
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
    console.log(filteredVids)
    return filteredVids

}