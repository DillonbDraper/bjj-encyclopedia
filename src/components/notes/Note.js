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

export const Note = (props) => {
    const { deleteNote } = useContext(NoteContext)
    const [ editMode, setEditMode ] = useState(false)
    return (
        <>
            {
            //Displays the NoteForm if editMode is true, passes in props to prepoluate it 
            editMode ? <NoteForm editMode={editMode} setEditMode={setEditMode} noteText={props.text} noteId={props.id} videoNumber={props.videoNumber}/>  : ""
            }
            <List className="note">
                <ListItem>
                    <ListItemText
                        primary={props.text}
                    />
                    <ListItemSecondaryAction>
                    <IconButton
                    onClick={() => {
                        setEditMode(true)
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