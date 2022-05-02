import React from 'react';
import { Grid, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import './error.css';
import { NavigateBefore } from '@mui/icons-material';

const Error = (props) => {
    return (
        <>
            <AppBar id="navBar" position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={()=>{props.history.goBack()}} edge="start" id="signInHead" aria-label="menu" sx={{ mr: 2 }}>
                    <NavigateBefore id="icons"/>
                    </IconButton>
                    <Typography variant="h6" component="div" id="signInHead" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Error
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container id='ErrorCont'>
                <img src="https://i.ibb.co/SJdXspD/pngegg-2.png" alt="" />
            </Grid>            
        </>
    );
}

export default Error;