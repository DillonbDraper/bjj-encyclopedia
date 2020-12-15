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

const updateNote = note => {
    return fetch(`http://localhost:8088/notes/${note.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
        .then(getNotes)
  }

  return (
    <NoteContext.Provider value={
      {
      notes, addNote, getNotes, deleteNote, updateNote
      }
    }>
      {props.children}
    </NoteContext.Provider>
  )
}