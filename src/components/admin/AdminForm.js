import React from '.react'
import "../../Youtubekey.js"
import { TextField } from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab'
import { Button } from '@material-ui/core/Button';
import { useEffect, useContext, useState } from 'react';
import { VideoContext } from '../videos/VideoProvider';
import { PositionContext } from '../dropdowns/PositionProvider';
import { OrientationContext } from '../dropdowns/OrientationProvider'
import { SubpositionContext } from '../dropdowns/SubpositionProvider';
import { TechniqueContext } from '../techniques/TechniqueProvider'
import { YoutubeContext } from './YoutubeProvider'

export const AdminForm = () => {

    const { addVideo } = useContext(VideoContext)
    const { positions, getPositions } = useContext(PositionContext)
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)
    const { techniques, getTechniques } = useContext(TechniqueContext)
    const { ytVideo, setYTVideo, getVideoData } = useContext(YoutubeContext)

    useEffect(() => {
        getTechniques().then(getPositions).then(getOrientations).then(getSubpositions)
    }, [])

    const [techValue, setTechValue] = useState(0)
    const [positionValue, setpositionValue] = useState(0)
    const [orientationValue, setOrientationValue] = useState(0)
    const [subpositionValue, setSubpositionValue] = useState(0)


    const url = useRef(null)
    const techName = useRef(null)

    const handleVideoSubmit = () => {
        const ytCode = url.split("v=")[1]
        if (ytCode.length !== 11) {
            window.alert("Please enter valid Youtube Video URL")
        } else {

        }
    }

    return (
        <>
            <h2>Please enter video information.  Use this form if a technique corresponding to the video exists.  Please use other form first if no technique exists</h2>
            <form className="videoForm" noValidate autoComplete="off">
                <TextField id="url"
                    label="Please Enter Youtube URL"
                    variant="outlined"
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'Youtube URL',
                    }}
                    ref={url}
                />
                <Autocomplete
                    id="techniques"
                    options={techniques}
                    getOptionLabel={(tech) => tech.title}
                    style={{ width: 500 }}
                    onChange={event, newValue => {
                        setTechValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a technique" variant="outlined" />}

                />

                <Button variant="contained" color="primary" type="submit"
                    onClick={handleVideoSubmit}
                >
                    Add to Database
                 </Button>

            </form>


            <form className="techniqueForm" noValidate autoComplete="off">
                <TextField id="techName"
                    label="Please Technique Name"
                    variant="outlined"
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'Technique Name',
                    }}
                    ref={techName}
                />

                <Autocomplete
                    id="positions"
                    options={positions}
                    getOptionLabel={(posish) => posish.name}
                    style={{ width: 500 }}
                    onChange={event, newValue => {
                        setpositionValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a position" variant="outlined" />}

                />

                <Autocomplete
                    id="orientation"
                    options={orientations}
                    getOptionLabel={(orient) => orient.dominant.toString()}
                    style={{ width: 500 }}
                    onChange={event, newValue => {
                        setOrientationValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose an orientation" variant="outlined" />}
                    disabled={techValue ? true : false}

                />

                <Autocomplete
                    id="subposition"
                    options={subpositions}
                    getOptionLabel={(sub) => sub.title}
                    style={{ width: 500 }}
                    onChange={event, newValue => {
                        setSubpositionValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a subposition" variant="outlined" />}
                    disabled={techValue ? true : false}

                />

            //Add 3 more combo boxes (four for grip) and cause them to be disabled if a technique is chosen, otherwise have position/sub/orientation as options
            //Add one simple text input for Name of technique


                <Button variant="contained" color="primary" type="submit"
                    onClick={handleTechniqueSubmit}
                >
                    Add to Database
                </Button>
            </form>
        </>
    )

    //Checks if url is handled correctly, then parses it into a YT code.  Should then post video with appropriate information to the API if a techniqueId is selected for it, and if not,
    //add the technique to the database and apply it to the video
    //Might be much easier to seperate this into 2 forms/pages
    //Much easier in fact.  One page and then 2 submit buttons that do 2 different things
}