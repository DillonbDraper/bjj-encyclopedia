import React, { useState } from "react"

export const SubpositionContext = React.createContext()

export const SubpositionProvider = (props) => {

  const [subpositions, setSubpositions] = useState([]) 

  const getSubpositions = () => {
    return fetch("http://localhost:8088/subpositions")
      .then(res => res.json())
      .then(setSubpositions)
  }

  const addSubposition = subposition => {
    return fetch("http://localhost:8088/subpositions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(subposition)
    })
      .then(getSubpositions)
  }

  return (
    <SubpositionContext.Provider value={
      {
      subpositions, addSubposition, getSubpositions
      }
    }>
      {props.children}
    </SubpositionContext.Provider>
  )
}