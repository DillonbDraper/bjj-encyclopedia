import React, {useRef, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NoteContext } from "./NoteProvider"

export const NoteForm = (props, note) => {
    const text = useRef(null)

    const {notes, addNote, getNotes} = useContext(NoteContext)

    const constructNewNote = note => {
        const userId = parseInt(localStorage.getItem("grappler"))
        const videoId = parseInt(props.match.params.videoId)
        if (text.current.value === null || text.current.value === undefined || text.current.value === "") {
            window.alert("Please enter a note before attempting to save")
        } else {
            const newNote = {
                text,
                time: "",
                videoId,
                userId
            }

            addNote(newNote)
        }
    }
    
    return (
        <form className="noteForm">
        <fieldset>           
            <div className="form-group">
                <label htmlFor="noteBody"></label>
                <input type="text" id="noteBody" ref={text} required autoFocus className="form-control" placeholder="Enter note here" />
            </div>
        </fieldset>
        
        <Button type="submit" onClick={evt => {
            evt.preventDefault()
            constructNewNote()
        }

        }>Save Note</Button>
        </form>
    )
}