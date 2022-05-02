import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import HomeComponent from './Home/Home';
import LoginComponent from './Auth/LoginComponent';
import SignupComponent from './Auth/SignupComponent';
import ProfileComponent from './Profile/ProfileComponent';
import Error from './Error/Error';

function RouteComponent(){
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LoginComponent}></Route>
                    <Route exact path='/signup' component={SignupComponent}></Route>
                    <Route exact path='/home' component={HomeComponent}></Route>
                    <Route exact path='/profile' component={ProfileComponent}></Route>
                    <Route exact path='*' component={Error}></Route>
                </Switch>
            </BrowserRouter>
        </> 
    )
}

export default RouteComponent;
