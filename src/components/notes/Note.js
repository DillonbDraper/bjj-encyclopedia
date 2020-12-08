import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const Note = ({ text }) => {
    return (
        <>
            <List>
                <ListItem>
                    <ListItemText
                        primary={text}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                            
                    </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                </List>
        </>
    )

}