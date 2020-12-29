import React, { useContext, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NoteContext } from "./NoteProvider"
import { NoteForm } from './NoteForm';
import './Note.css'
import { createReactPlayer } from 'react-player/lib/ReactPlayer';
import Player from 'react-player/lib/Player';

export const Note = (props) => {
    const { deleteNote } = useContext(NoteContext)
    const [ editMode, setEditMode ] = useState(false)
    const [ hider, setHider ] = useState(false)

    const handleTimeStamp = stamp => {
        if (stamp < 60) {
            return `0:${stamp}`
        } else if (stamp === 60) {
            return `1:00`
        } else {
            const minutes = Math.floor(stamp / 60)
            const seconds = stamp % 60
            if (seconds < 10) {
            return `${minutes}:0${seconds}`
            } else {
            return `${minutes}:${seconds}`
            }
        }
    }
    
    return (
        <>
            {
            //Displays the NoteForm if editMode is true, passes in props to prepoluate it 
            editMode ? <NoteForm editMode={editMode} setHider={setHider} setEditMode={setEditMode} noteText={props.text} noteTime={props.timeStamp} noteId={props.id} videoNumber={props.videoNumber}/>  : ""
            }
            <List className="note" hidden={hider}> 
                <ListItem>
                    <p 
                    className="timeStamp"
                    onClick={() => {
                        console.log(props.player)
                        props.player.current.seekTo(props.timeStamp)
                        props.setPlaying(false)
                    }}
                     >
                         {handleTimeStamp(props.timeStamp)}</p>
                    <ListItemText
                        primary={props.text}
                    />
                    <ListItemSecondaryAction>
                    <IconButton
                    onClick={() => {
                        setEditMode(true)
                        setHider(true)
                    }} 
                    edge="end" 
                    aria-label="edit">
                            <EditIcon />
                            
                    </IconButton>
                        <IconButton
                        onClick={()=> deleteNote(props.id)} 
                        edge="end" 
                        aria-label="delete">
                            <DeleteIcon/>
                            
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </List>
        </>
    )

}