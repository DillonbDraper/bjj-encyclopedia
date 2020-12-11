import React, { useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NoteContext } from "./NoteProvider"

export const NoteForm = ({ videoNumber, noteSetAdd, noteText, editMode, setEditMode, noteId }) => {
    const text = useRef(null)
    const { notes, addNote, getNotes, updateNote } = useContext(NoteContext)


    const constructNewNote = () => {
        const userId = parseInt(localStorage.getItem("grappler"))
        const videoId = parseInt(videoNumber)

        if (text.current.value === null || text.current.value === undefined || text.current.value === "") {
            window.alert("Please enter a note before attempting to save")
        } else {

            if (editMode) {
                const newNote = {
                    id: noteId,
                    text: text.current.value,
                    time: "",
                    videoId,
                    userId
                }
                updateNote(newNote)
                setEditMode(false)
            } else {

                const newNote = {
                    text: text.current.value,
                    time: "",
                    videoId,
                    userId
                }

                addNote(newNote)
                noteSetAdd(false)
            }
        }
    }

    return (
        <form className="noteForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="noteBody"></label>
                    <input type="text" id="noteBody" ref={text} required autoFocus className="form-control" placeholder={"Enter text here"} defaultValue={noteText} />
                </div>
            </fieldset>

            <Button variant ="outlined" type="submit" onClick={evt => {
                evt.preventDefault()
                constructNewNote()
            }

            }>Save Note</Button>
        </form>
    )
}