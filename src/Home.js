import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
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
const [searchResult, setSearchResult] = useState(`It's a beautiful Day...`);
const [weather, setWeather] = useState('');
const [locator, setLocator] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const [AmPm, setAmPm]= useState('');
const history = useHistory();
let DateNow = new Date(Date.now());
const Key = '08d082b236fd458698d125650210612';
const URL = 'https://api.weatherapi.com/v1/current.json';

//-------------------------------* USE-EFFECT METHODS *-------------------------------//

useEffect(()=>{
    if(decodedToken===null){
        history.replace('/');
        alert("Session Timeout Please Login Again...");
    }   else{
            if( decodedToken.exp*1000<=Date.now()){
                history.replace('/');
            }               
            }
    if(searchelement===''){
        setSearchResult(`It's a beautiful Day...`)
    }
},[history,decodedToken, searchelement])



//-------------------------------* MANU FUNCTIONS *-------------------------------//
useEffect(()=>{
const Locator=(async()=>{
    const response = await axios.get(`${URL}?key=${Key}&q=auto:ip`)
    setLocator(response.data);
    })
Locator();
},[])

//-------------------------------* MANU FUNCTIONS *-------------------------------//

const DateBuilder = (()=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[DateNow.getDay()];
    let date = DateNow.getDate();
    let month = months[DateNow.getMonth()];
    let year = DateNow.getFullYear();

    return `${day}, ${date} ${month} ${year}`
})

//-------------------------------* SEARCH FUNCTION *-------------------------------//

const Search = (async (event)=>{
    if(event.key==='Enter'){
        try{
            const response = await axios.get(`${URL}?key=${Key}&q=${searchelement}`);
                    setWeather(response.data);
            
            DateNow.getHours()>12 ? setAmPm("PM") : setAmPm("AM");
        }catch(err){
            setSearchResult('Please Enter Valide Data...')
        }
    }
})

//-------------------------------* MANU FUNCTIONS *-------------------------------//
const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };
    
const handleClose = () => {
    setAnchorEl(null);
    };

//-------------------------------* NAVIGAT FUNCTIONS *-------------------------------//
const profile = ()=>{
    history.replace('/profile');
};

const logout = ()=>{
    localStorage.removeItem('token');
    history.replace('/');
    alert('You have been logged out');
};

return (
    <Box sx={{ flexGrow: 1}}>
        <Toolbar variant="dense" sx={{m:2, display: 'flex', justifyContent: 'end', color: 'white'}}> 
                <h6 className="selectedFont d-flex justify-content-center" style={{fontSize: '28px', marginTop:'-7px'}} >
                    {locator?(`${locator.location.name},`):null}
                </h6> 
                &nbsp;
                <h6 className="selectedFont d-flex justify-content-center" >
                    {DateBuilder()}
                </h6>
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
                        <Typography id="menuItemsUser"> Hi {decodedToken ? decodedToken.user.first_name : 'User'} !</Typography>
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
                        onChange={(e)=>{
                            setSearch(e.currentTarget.value.toLowerCase());
                            setWeather('');
                        }}
                        value={searchelement}
                        placeholder={"Search…"}
                        onKeyPress={Search}
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
                                <h5 className="selectedFont"> 
                                    {searchResult}
                                </h5>
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
                                        <span className="img"><img className="shadow" src={weather.current.condition.icon} alt='img' /></span>
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
// last_updated_epoch