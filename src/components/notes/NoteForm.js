import React, { useRef, useContext } from 'react'
import Button from '@material-ui/core/Button';
import { NoteContext } from "./NoteProvider"
import "./Note.css"

export const NoteForm = ({ videoNumber, noteSetAdd, noteText, editMode, setEditMode, noteId, noteTime, setHider, playing, setPlaying, player, vidTime }) => {
    const text = useRef(null)
    const { addNote, updateNote } = useContext(NoteContext)

    //If editMode is true, saves edit.  If not, creates new note.
    const constructNewNote = () => {
        const userId = parseInt(localStorage.getItem("grappler"))
        const videoId = parseInt(videoNumber)

        if (!text.current.value) {
            window.alert("Please enter a note before attempting to save")
        } else {

            if (editMode) {
                const newNote = {
                    id: noteId,
                    text: text.current.value,
                    time: noteTime,
                    videoId,
                    userId
                }
                updateNote(newNote)
                setEditMode(false)
                setHider(false)
            } else {

                const newNote = {
                    text: text.current.value,
                    time: vidTime,
                    videoId,
                    userId
                }

                addNote(newNote)
                noteSetAdd(false)
                setPlaying(true)
            }
        }
    }

    return (
        <form className="noteForm">
            <fieldset className="noteForm">
                <div className="form-group">
                    <label htmlFor="noteBody"></label>
                    <input type="text"style={{width: "100%"}}id="noteBody" ref={text} className="noteInput" required autoFocus className="form-control" placeholder={"Enter text here"} defaultValue={noteText} />
                </div>
            </fieldset>

            <Button variant ="contained" color="secondary" type="submit" style={{marginBottom: '3%'}} onClick={evt => {
                evt.preventDefault()
                constructNewNote()
            }

            }>Save Note</Button>
        </form>
    )
}