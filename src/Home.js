import React, { useEffect, useState, useRef } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {IconButton,MenuItem,Menu,Typography,Toolbar,Box} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Home = (props) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [anchorEl, setAnchorEl] =useState(null);
const [searchelement, setSearch] = useState('');
const [weather, setWeather] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const FatchData = useRef();
const [AmPm, setAmPm]= useState('');

//-------------------------------* USE-EFFECT METHODS *-------------------------------//

const Fatch = (async()=>{   
    if(decodedToken===null){
        props.history.push('/');
        alert("Session Timeout Please Login Again...");
    }   else{
            if( decodedToken.exp*1000<=Date.now()){
                props.history.push('/');
            }else{
                try{
                    if(searchelement!==''){
                        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=08d082b236fd458698d125650210612&q=${searchelement}&aqi=no`);
                        if(response){
                            setWeather(response.data);
                        }else{
                            setWeather('');
                        }
                    }
                }
                catch{
                    setWeather('');
                }
                let DateNow = new Date(Date.now());
                DateNow.getHours()>12 ? setAmPm("PM") : setAmPm("AM");
}}})

FatchData.current = Fatch;

useEffect(()=>{FatchData.current()},[searchelement])
//-------------------------------* MANU FUNCTIONS *-------------------------------//
const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };
    
const handleClose = () => {
    setAnchorEl(null);
    };

//-------------------------------* NAVIGAT FUNCTIONS *-------------------------------//
const profile = ()=>{
    props.history.push('/profile');
};

const logout = ()=>{
    localStorage.removeItem('token');
    props.history.push('/');
    alert('You have been logged out');
};

return (
    <Box sx={{ flexGrow: 1}}>
        <Toolbar variant="dense" sx={{m:2, display: 'flex', justifyContent: 'end', color: 'white'}}> 
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
                    <MenuItem id="menuItemsOut" onClick={profile} >
                        <AccountCircleRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                        <Typography id="menuItems">Profile</Typography>
                    </MenuItem>
                    <MenuItem id="menuItemsOut" onClick={logout}>
                        <LogoutRoundedIcon id="menuItemsIcon"/> &nbsp; &nbsp;
                        <Typography id="menuItems" >Logout</Typography>
                    </MenuItem>
                </Menu>
            </div>
            )}
        </Toolbar>
        <div className="cont">
            <h1 className="Title">Weather Forecast</h1>
            <div className="weather_search">
                <div id="searchIconBar">
                    <div id="searchIconOut">
                        <SearchTwoToneIcon id="searchIcon" />
                    </div>
                    <input
                        type="search"
                        id="searchField"
                        onChange={(e)=>{setSearch(e.currentTarget.value.toLowerCase())}}
                        placeholder={"Search…"}
                    />
                </div>
            </div>
            <div className="cardContaint">
                {
                    searchelement==='' || weather===''
                    ?
                    <div className="card wrong" id="wrong">
                        <div className="card-body">                        
                            <h5 className="card-title font defaultTitle"> 
                                Welcome to Weather Foracasting.
                            </h5>
                            <hr/>
                            <span>
                            {
                                searchelement!==''
                                ?
                                    <h5 className="selectedFont"> 
                                        Please Enter Valide Data... 
                                    </h5>
                                :
                                    <h5 className="selectedFont"> 
                                        It&#39;s a beautiful Day... 
                                    </h5>
                            }
                                
                                <span className="d-flex justify-content-center">
                                    <img className="weatherImgError" src="Weather.png" alt="Weather.png"/>
                                </span>
                            </span>                            
                        </div>
                    </div>   
                :
                    <div className="card" id="card">
                        <div className="card-body">
                            <h4 className="card-title place font">{weather.location.name}<span className="country font">, {weather.location.country}.</span></h4>
                            <hr/>
                            <div className="row tempData">
                                <span className="col-7 degree mt-2 d-flex justify-content-center">
                                    <span className="mt-2 font">{weather.current.temp_c}°C </span>
                                </span>
                                <span className="col-5">
                                    <span>
                                        <span className="img"><img className="shadow" src={weather.current.condition.icon} alt={weather.current.condition.icon} /></span>
                                        <span><h5 className="dis p-1 font">{weather.current.condition.text}</h5></span>
                                    </span>
                                </span> 
                            </div>
                            <hr/>
                            <div id="time">
                                <h6 className="selectedFont d-flex justify-content-center">
                                    Updated Time :&nbsp;{weather.current.last_updated} {AmPm} {weather.current.is_day===1? 'Day' : 'Night'}.
                                </h6>
                            </div>
                        </div>
                    </div>            
                }
            </div>        
        </div>
    </Box>
)
};

export default Home;