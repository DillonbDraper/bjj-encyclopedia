import React, { useRef, useContext } from 'react'
import Button from '@material-ui/core/Button';
import { NoteContext } from "./NoteProvider"

export const NoteForm = ({ videoNumber, noteSetAdd, noteText, editMode, setEditMode, noteId }) => {
    const text = useRef(null)
    const { addNote, updateNote } = useContext(NoteContext)

    //If editMode is true, saves edit.  If not, creates new note.
    const constructNewNote = () => {
        const userId = parseInt(localStorage.getItem("grappler"))
        const videoId = parseInt(videoNumber)

        if (!text.current.value) {
            window.alert("Please enter a note before attempting to save")
        } else {

            //Time is always an empty string as a placeholder for stretch goal
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