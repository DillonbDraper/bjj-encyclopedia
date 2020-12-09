import React, { useContext, useEffect, useState } from "react"
import { NoteContext } from "./NoteProvider"
import { Note } from "./Note"
import { NoteForm } from "./NoteForm"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const NoteList = props => {
    const { notes, getNotes } = useContext(NoteContext)



    useEffect(() => getNotes(), [])

    const [ add, setAdd ] = useState(false)

    const notesToRender = notes.filter(note => note.videoId === parseInt(props.match.params.videoId) && note.userId === parseInt(localStorage.getItem("grappler")))

    return (
        <>
            {notesToRender.map(note => {
                return <Note key={note.id} id={note.id} text={note.text} videoNumber={props.match.params.videoId}/>
            })
            }
                <Button onClick={() => setAdd(true)} color="primary">Add Note</Button>
              {
                add ? <NoteForm videoNumber={props.match.params.videoId} noteAdd={add} noteSetAdd={setAdd}></NoteForm> : ""
              }
        </>
    )

}