import React, { useContext, useEffect, useState } from "react"
import { NoteContext } from "./NoteProvider"
import { Note } from "./Note"
import { NoteForm } from "./NoteForm"
import Button from '@material-ui/core/Button';
import "./NoteList.css"

export const NoteList = props => {
    const { notes, getNotes } = useContext(NoteContext)
    const [vidTime, setVidTime] = useState(0)


    useEffect(() => getNotes(), [])

    const [ add, setAdd ] = useState(false)

    const notesToRender = notes.filter(note => note.videoId === parseInt(props.match.params.videoId) && note.userId === parseInt(localStorage.getItem("grappler")))

    return (
        <div className="note__list">
            {notesToRender.map(note => {
                return <Note key={note.id} id={note.id} text={note.text} player={props.player} timeStamp={note.time} videoNumber={props.match.params.videoId}/>
            })
            }
            {
                //Only display NoteForm and pause video if add is set to true by clicking the button
                add ? <NoteForm videoNumber={props.match.params.videoId} playing={props.playing} vidTime={vidTime} setPlaying={props.setPlaying} player={props.player} noteAdd={add} noteSetAdd={setAdd}></NoteForm> : ""
              }
                <Button onClick={() => {
                    props.setPlaying(true)
                    console.log(props.playing)
                    setVidTime(Math.round(props.player.current.getCurrentTime()))
                    console.log(vidTime)
                    setAdd(true)
                    }} color="secondary" variant="contained">Add Note</Button>

                
              
        </div>
    )

}