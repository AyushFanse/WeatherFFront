import { Button, Grid, TextField, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import jwt from 'jsonwebtoken';
import axios from 'axios';



const ProfileComponent = ({URL})=>{

//-------------------------------* USE-STATE METHODS *-------------------------------//

    const [user, setUser] = useState([]);
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const FatchData = useRef();
    const history = useHistory();

//-------------------------------* USE-EFFECT METHODS *-------------------------------//

    const Fatch = (async()=>{
        if(decodedToken==null){
            history.push('/');
            alert("Session Timeout Please Login Again...");
        }else{
                if(decodedToken.exp*1000<=Date.now()){
                history.push('/');
                }else{
                        var response = await axios.get(`${URL}/users/getuser/${decodedToken.user._id}`,
                        {
                            headers:{ token:localToken }
                        })                    
                
                setUser(response.data);
            }
    }})

    FatchData.current = Fatch;

    useEffect( () =>{ FatchData.current()}, [])

//-------------------------------* DELETE MY ACCOUNT FUNCTIONS *-------------------------------//
    const DeleteAccount = (async (id)=>{

        await axios.delete(`${URL}users/deleteuser/${id}`)
        localStorage.removeItem('token');
        history.push('/');
        alert('Your Account has been deleted Successfully');
    });

return (
    <Box sx={{ flexGrow: 1}}>
        <Navbar Page={'Profile'} />
        <h1 className="ProfileTitle">My Profile</h1>            
        <Grid sx={{display: 'grid', placeItems: 'center', height:'500px'}}>
            <Box key={user._id}>
                <div  id="profileCard" style={{ background:'#c8e4fb',marginTop: '50px',  width:'360px', padding:'30px'}}>
                    <Grid style={{textAlign: 'center'}}>
                        <Box component="form" className="default" sx={{ '& .MuiTextField-root': { m:1, width: '13.6ch' }}}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                value={user.first_name}
                                disabled
                            />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                value={user.last_name}
                                disabled
                            />
                        </Box>
                        <Box component="form" className="default" sx={{'& .MuiTextField-root': { mt: 2, width: '95%' }}}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                value={user.number}
                                disabled
                            />
                        </Box>
                        <Box component="form" className="default" sx={{ '& .MuiTextField-root': { mt: 2, width: '95%' }}}>
                            <TextField
                                id="standard"
                                label="Email"
                                size="small"
                                variant="standard"
                                value={user.email}
                                disabled
                            />                                    
                        </Box>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button  id="button" sx={{mt:3}} variant="contained" disableElevation  onClick={()=>{DeleteAccount(user._id)}}>
                            Delete My Account
                        </Button>
                    </Grid>
                </div>
            </Box>
        </Grid>
    </Box>
    );
}

export default ProfileComponent;