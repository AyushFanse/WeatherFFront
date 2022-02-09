import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import HomeComponent from './Home';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import ProfileComponent from './ProfileComponent';

function RouteComponent(){
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LoginComponent}></Route>
                    <Route exact path='/signup' component={SignupComponent}></Route>
                    <Route exact path='/home' component={HomeComponent}></Route>
                    <Route exact path='/profile' component={ProfileComponent}></Route>
                </Switch>
            </BrowserRouter>
        </> 
    )
}

export default RouteComponent;
