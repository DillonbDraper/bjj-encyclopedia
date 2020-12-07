import React, { useState } from "react"

export const NoteContext = React.createContext()

export const NoteProvider = (props) => {

  const [notes, setNotes] = useState([]) 

  const getNotes = () => {
    return fetch("http://localhost:8088/notes")
      .then(res => res.json())
      .then(setNotes)
  }

  const addNote = note => {
    return fetch("http://localhost:8088/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
      .then(getNotes)
  }

  const deleteNote = noteId => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "DELETE"
    })
        .then(getNotes)
}

const updateNote = noteId => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
        .then(getNotes)
  }

  /*
      You return a context provider which has the
      `locations` state, the `addLocation` function,
      and the `getLocation` function as keys. This
      allows any child elements to access them.
  */
  return (
    <VideoContext.Provider value={
      {
      notes, addNote, getNotes, deleteNote
      }
    }>
      {props.children}
    </VideoContext.Provider>
  )
}