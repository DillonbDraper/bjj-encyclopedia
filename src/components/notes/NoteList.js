import React, { useContext, useEffect } from "react"
import { NoteContext } from "./NoteProvider"

export const NoteList = props => {
    const { notes, getNotes } = useContext(NoteContext)

    useEffect(() => getNotes(), [])

    const notesToRender = notes.filter(note => note.videoId === props.history.match.params.videoId && note.userId === localStorage.getItem("grappler"))

    return (
        <>
            {notesToRender.map(note => {
                return <Note key={note.id} text={note.text} />
            })
            }
        </>
    )

}