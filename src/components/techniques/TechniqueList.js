import React, { useContext, useEffect, useState, useRef } from "react"
import { TechniqueContext } from "./TechniqueProvider"
import { Technique } from "./Technique"
import "./TechniqueList.css"
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


export const TechniqueList = ({ history, positionValue, orientationValue, subpositionValue }) => {
    const { techniques, getTechniques } = useContext(TechniqueContext)
    const [workingTechniques, setWorkingTechniques] = useState([])
    const [textInput, setTextInput] = useState("")

    const textRef = useRef(null)

    useEffect(() => {
        getTechniques()
    }, [])

    //Listens to values passed in as props, only displays the techniques that match currently selected values
    useEffect(() => {
        let techsToSet = techniques.filter(tech => {
            return tech.positionId === positionValue.id
        })

        if (orientationValue && orientationValue.id) {
            techsToSet = techsToSet.filter(tech => {
                return tech.orientationId === orientationValue.id
            })
        }

        if (subpositionValue && subpositionValue.id) {
            techsToSet = techsToSet.filter(tech => tech.subpositionId === subpositionValue.id)
        }
        setWorkingTechniques(techsToSet)
    }, [positionValue, orientationValue, subpositionValue])

    useEffect(() => {
        if (textInput !== "" && textInput !== undefined) {
            setWorkingTechniques(techniques.filter(tech => tech.name.toLowerCase().includes(textInput.toLowerCase())))
        }
    }, [textInput])

    const handleChange = e => {
        setTextInput(e.target.value)
    }

    const handleSubmit = e => {
        console.log(textInput)
        history.push(`/techName/${textInput}`)
    }


    //May want to refactor to display all techniques when no values are selected, but would need to come with CSS limitations or else it would be a massive mess
    return (
        <>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Technique Search" variant="outlined" placeholder="Please Enter Techniques" defaultValue={textInput}
                    onChange={handleChange} />

<Button onClick={evt => {
        evt.preventDefault()
        handleSubmit()
      }
      }
        variant="contained"
        color="primary"
      >Search</Button>
            </form>
            <h2 className="technique__header">Techniques</h2>
                <div className="techniques">
                    <ul className="tech__list">
                        {workingTechniques.map(tech => {
                            return (<Technique key={tech.id} id={tech.id} name={tech.name}></Technique>)
                        })
                        }
                    </ul>
                </div>
        </>
    )


}