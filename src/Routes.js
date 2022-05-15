import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Home from './Home/Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Profile from './Profile/Profile';
import Error from './Error/Error';

const URL = 'https://weather-forecasting-back.herokuapp.com';
const Key = '08d082b236fd458698d125650210612';
const W_URL = 'https://api.weatherapi.com/v1/current.json';
let DateNow = new Date(Date.now());

function RouteComponent(){
    return(
        <>
            <BrowserRouter>
                <Switch>
                <Route exact path="/" ><Login URL={URL}/></Route>
                <Route exact path="/signup" ><Signup URL={URL}/></Route>
                <Route exact path="/home" ><Home URL={URL} W_URL={W_URL} Key={Key} DateNow={DateNow} /></Route>
                <Route exact path="/profile" ><Profile URL={URL}/></Route>
                <Route exact path="/*" ><Error /></Route>
                </Switch>
            </BrowserRouter>
        </> 
    )
}

export default RouteComponent;
