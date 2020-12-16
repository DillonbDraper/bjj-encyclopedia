import React from '.react'
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab'

export const AdminForm = () => (
    <>
        <h1>Please enter technique information</h1>
        <form className="adminForm" noValidate autoComplete="off">
            <TextField id="url" 
            label="Please Enter Youtube URL" 
            variant="outlined" 
             aria-describedby="standard-weight-helper-text"
             inputProps={{
               'aria-label': 'weight',
             }}
            />
        </form>
    </>
)