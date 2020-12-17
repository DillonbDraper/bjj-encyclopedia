import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useEffect, useContext, useState } from 'react';
import { VideoContext } from '../videos/VideoProvider';
import { PositionContext } from '../dropdowns/PositionProvider';
import { OrientationContext, OrientationProvider } from '../dropdowns/OrientationProvider'
import { SubpositionContext } from '../dropdowns/SubpositionProvider';
import { TechniqueContext } from '../techniques/TechniqueProvider'
import { YoutubeContext } from './YoutubeProvider'

export const AdminForm = () => {

    const { addVideo } = useContext(VideoContext)
    const { positions, getPositions } = useContext(PositionContext)
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)
    const { techniques, getTechniques, addTechnique } = useContext(TechniqueContext)
    const { ytVideo, setYTVideo, getVideoData } = useContext(YoutubeContext)

    useEffect(() => {
        getTechniques().then(getPositions).then(getOrientations).then(getSubpositions)
    }, [])

    const [techValue, setTechValue] = useState(0)
    const [positionValue, setpositionValue] = useState(0)
    const [orientationValue, setOrientationValue] = useState(0)
    const [subpositionValue, setSubpositionValue] = useState(0)
    const [gi, setGi] = useState("gi")
    const [url, setURL] = useState("")
    const [techFormValue, setTechFormValue] = useState(0)



    const handleVideoSubmit = async () => {
        const ytCode = url.split("v=")[1]
        if (ytCode.length !== 11) {
            window.alert("Please enter valid Youtube Video URL")
        } else {
             const videoReturn = await getVideoData(ytCode) 
                let yesGi = true
                if (gi === "nogi") {
                    yesGi = false
                }
                let thumbnail = videoReturn.items[0].snippet.thumbnails.high.url
                let title = videoReturn.items[0].snippet.title
                let description = videoReturn.items[0].snippet.description
                let objToAdd = {
                    url,
                    thumbnail,
                    title,
                    description,
                    techniqueId: techValue,
                    gi: yesGi
                }
                addVideo(objToAdd)
                console.log(objToAdd)
        }
    
    }

    const handleTechniqueSubmit = () => {
        const newTechObject = {
            name: techFormValue,
            positionId: positionValue,
            orientationId: orientationValue,
            subpositionId: subpositionValue

        }
        addTechnique(newTechObject)
    }

    const handleGiChange = (event) => {
        setGi(event.target.value);
    };

    const handleVideoChange = e => {
        setURL(e.target.value)
    }

    const handleTechChange = e => {
        setTechFormValue(e.target.value)
    }

    return (
        <>
            <h2>Please enter video information.  Use this form if a technique corresponding to the video exists.  Please use other form below first if no matching technique exists</h2>
            <form className="videoForm" noValidate autoComplete="off">
                <TextField id="url"
                    label="Please Enter Youtube URL"
                    variant="outlined"
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'Youtube URL',
                    }}
                    value={url}
                    onChange={handleVideoChange}
                    required={true}
                />
                <Autocomplete
                    id="techniques"
                    options={techniques}
                    getOptionLabel={(tech) => tech.name}
                    style={{ width: 500 }}
                    onChange={(event, newValue) => {
                        setTechValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a technique" variant="outlined" />}

                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Gi/Nogi</FormLabel>
                    <RadioGroup aria-label="gi" name="ginagi" value={gi} onChange={handleGiChange}>
                        <FormControlLabel value={"gi"} control={<Radio />} label="gi" />
                        <FormControlLabel value={"nogi"} control={<Radio />} label="nogi" />
                    </RadioGroup>
                </FormControl>

                <Button variant="contained" color="primary" type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        handleVideoSubmit()
                    }}
                >
                    Add to Database
                 </Button>

            </form>

                    <h3>This Form is for adding Techniques</h3>
            <form className="techniqueForm" noValidate autoComplete="off">
                <TextField id="techName"
                    label="Enter Technique Name"
                    required={true}
                    variant="outlined"
                    aria-describedby="standard-weight-helper-text"
                    value={techFormValue}
                    onChange={handleTechChange}
                    
                />

                <Autocomplete
                    id="positions"
                    options={positions}
                    required={true}
                    getOptionLabel={(posish) => posish.name}
                    style={{ width: 500 }}
                    onChange={(event, newValue) => {
                        setpositionValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a position" variant="outlined" />}

                />

                <Autocomplete
                    id="orientation"
                    options={orientations}
                    required={true}
                    getOptionLabel={(orient) => orient.dominant.toString()}
                    style={{ width: 500 }}
                    onChange={(event, newValue) => {
                        setOrientationValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose an orientation" variant="outlined" />}

                />

                <Autocomplete
                    id="subposition"
                    required={true}
                    options={subpositions}
                    getOptionLabel={(sub) => sub.name}
                    style={{ width: 500 }}
                    onChange={(event, newValue) => {
                        setSubpositionValue(newValue.id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose a subposition" variant="outlined" />}

                />

                <Button variant="contained" color="primary" type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        handleTechniqueSubmit()
                    }}
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