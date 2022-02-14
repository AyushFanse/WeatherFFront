import {IconButton,Button,Grid,MenuItem,Menu,TextField,Typography,Toolbar,Box} from '@mui/material';
import React, {useEffect, useState, useRef} from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import axios from 'axios';
import jwt from 'jsonwebtoken';



const ProfileComponent = (props)=>{

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [anchorEl, setAnchorEl] = useState(null);
const [userData, setUser] = useState([]);
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const url = 'https://weather-forecasting-back.herokuapp.com/';
const FatchData = useRef();

//-------------------------------* USE-EFFECT METHODS *-------------------------------//


const Fatch = (async()=>{
    if(decodedToken==null){
        props.history.push('/');
        alert("Session Timeout Please Login Again...");
    }else{
            if(decodedToken.exp*1000<=Date.now()){
            props.history.push('/');
            }else{
                    var response = await axios.get(`${url}users/getusers`,
                    {
                        headers:{ token:localToken }
                    })                    
            let createData = response.data;
            Filter(createData);
        }
}})

FatchData.current = Fatch;

useEffect( () =>{ FatchData.current()}, [])

//-------------------------------* FILTER FUNCTIONS *-------------------------------//
const Filter = (filterData)=>{

    let loginUser = decodedToken.user;
    let createdData = '';
    createdData = filterData.filter(function(ele){
        return ele._id===loginUser._id;
    })
    setUser(createdData);
}

//-------------------------------* DELETE MY ACCOUNT FUNCTIONS *-------------------------------//
const DeleteAccount = (async (id)=>{

    if(decodedToken==null){
        props.history.push('/');
        alert("Session Timeout Please Login Again...");
        }else{
                if(decodedToken.exp*1000<=Date.now()){
                props.history.push('/');
                }else{
                await axios.delete(`${url}users/deleteuser/${id}`)
                localStorage.removeItem('token');
                props.history.push('/');
                alert('Your Account has been deleted Successfully');
                }
            }
        }
    );

//--------------------------------* MANU FUNCTIONS *--------------------------------//

const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
};
    
const handleClose = () => {
    setAnchorEl(null);
};

//-------------------------------* NAVIGAT FUNCTIONS *-------------------------------//
const home = ()=>{
    props.history.push('/home');
};
    
const logout = ()=>{
    localStorage.removeItem('token');
    props.history.push('/');
    alert('You have been logged out');
};

return (
    <Box sx={{ flexGrow: 1}}>
            <Toolbar variant="dense" sx={{m:2, display: 'flex', justifyContent: 'space-between', color: 'white'}}>
                <IconButton onClick={()=>{props.history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <NavigateBeforeIcon/>
                </IconButton>
                {(
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        sx={{opacity: 0.95}}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClick={handleClose}
                    >
                        <MenuItem id="menuItemsOut">
                            <Typography id="menuItemsUser"> Hi {decodedToken ? decodedToken.user.first_name : null} !</Typography>
                        </MenuItem>    
                        <MenuItem id="menuItemsOut" onClick={home}>
                            <HomeRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                            <Typography id="menuItems" >Home</Typography>
                        </MenuItem>
                        <MenuItem id="menuItemsOut" onClick={logout}>
                            <LogoutRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                            <Typography id="menuItems" >Logout</Typography>
                        </MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>
            <h1 className="ProfileTitle">My Profile</h1>
        <Grid sx={{display: 'grid', placeItems: 'center', height:'60vh'}}>
            {userData.map((user)=>(
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
            ))}   
        </Grid>
    </Box>
    );
}

export default ProfileComponent;