import React, { useState } from "react"

export const TechniqueContext = React.createContext()

export const TechniqueProvider = (props) => {

  const [techniques, setTechniques] = useState([]) 

  const getTechniques = () => {
    return fetch("http://localhost:8088/techniques")
      .then(res => res.json())
      .then(setTechniques)
  }

  const addTechnique = technique => {
    return fetch("http://localhost:8088/techniques", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(technique)
    })
      .then(getTechniques)
  }

  return (
    <TechniqueContext.Provider value={
      {
      techniques, addTechnique, getTechniques
      }
    }>
      {props.children}
    </TechniqueContext.Provider>
  )
}