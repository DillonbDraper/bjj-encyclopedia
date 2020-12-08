import React, { useContext, useEffect } from "react"
import { TechniqueContext } from "./TechniqueProvider"
import { Technique } from "./Technique"

export const TechniqueList = props => {
    const {techniques, getTechniques } = useContext(TechniqueContext)

    useEffect(() => {
        getTechniques()
    }, [])
    
    return (
        <div className="technique__list">
            <ul>
                {
                    techniques.map(tech => {
                        return (<Technique key={tech.id} id={tech.id} name={tech.name}></Technique>)
                    })
                }
            </ul>
        </div>
    )


}