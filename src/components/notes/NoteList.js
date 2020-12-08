import React, { useContext, useEffect } from "react"
import { NoteContext } from "./NoteProvider"
import { Note } from "./Note"
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

    const notesToRender = notes.filter(note => note.videoId === parseInt(props.match.params.videoId) && note.userId === parseInt(localStorage.getItem("grappler")))

    return (
        <>
            {notesToRender.map(note => {
                return <Note key={note.id} text={note.text} />
            })
            }
                <Button color="primary">Add Note</Button>
        </>
    )

}