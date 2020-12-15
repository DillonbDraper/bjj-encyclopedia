import React, { useState } from "react"

export const OrientationContext = React.createContext()

export const OrientationProvider = (props) => {

  const [orientations, setOrientations] = useState([]) 

  const getOrientations = () => {
    return fetch("http://localhost:8088/orientation")
      .then(res => res.json())
      .then(setOrientations)
  }

  return (
    <OrientationContext.Provider value={
      {
      orientations, getOrientations
      }
    }>
      {props.children}
    </OrientationContext.Provider>
  )
}