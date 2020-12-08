import React, { useState } from "react"

export const PositionContext = React.createContext()

export const PositionProvider = (props) => {

  const [positions, setPositions] = useState([]) 

  const getPositions = () => {
    return fetch("http://localhost:8088/positions")
      .then(res => res.json())
      .then(setPositions)
  }

  const addPosition = position => {
    return fetch("http://localhost:8088/positions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(position)
    })
      .then(getPositions)
  }

  return (
    <PositionContext.Provider value={
      {
      positions, addPosition, getPositions
      }
    }>
      {props.children}
    </PositionContext.Provider>
  )
}