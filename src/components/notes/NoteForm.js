import React, {useRef, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NoteContext } from "./NoteProvider"

export const NoteForm = ({videoNumber, noteAdd, noteSetAdd}) => {
    const text = useRef(null)
    const {notes, addNote, getNotes} = useContext(NoteContext)


    const constructNewNote = () => {
        const userId = parseInt(localStorage.getItem("grappler"))
        const videoId = parseInt(videoNumber)

        console.log(videoId)
    console.log(userId)
    console.log(text.current.value)

        if (text.current.value === null || text.current.value === undefined || text.current.value === "") {
            window.alert("Please enter a note before attempting to save")
        } else {
            const newNote = {
                text: text.current.value,
                time: "",
                videoId,
                userId
            }
            console.log(newNote)
            addNote(newNote)
            noteSetAdd(false)
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