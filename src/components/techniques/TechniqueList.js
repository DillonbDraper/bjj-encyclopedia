import React, { useContext, useEffect, useState } from "react"
import { TechniqueContext } from "./TechniqueProvider"
import { Technique } from "./Technique"

export const TechniqueList = ({ positionValue, orientationValue, subpositionValue }) => {
    const {techniques, getTechniques } = useContext(TechniqueContext)
    const [ workingTechniques, setWorkingTechniques ] = useState([])

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
            console.log(techsToSet)
            console.log(subpositionValue.id)
            techsToSet = techsToSet.filter(tech => tech.subpositionId === subpositionValue.id)
            console.log(techsToSet)
        }
        setWorkingTechniques(techsToSet)
    }, [positionValue, orientationValue, subpositionValue])

    
    //May want to refactor to display all techniques when no values are selected, but would need to come with CSS limitations or else it would be a massive mess
    return (
        <div className="technique__list">
            <ul>
                { workingTechniques.map(tech => {
                        return (<Technique key={tech.id} id={tech.id} name={tech.name}></Technique>)
                    })
                }
            </ul>
        </div>
    )


}