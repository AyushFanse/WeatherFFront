import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {IconButton,Button,Grid,TextField,FormControl,InputLabel, Input,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

const LoginComponent = (props) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [showPassword,setShowPassword] = useState('');
const [Worning,setWorning] = useState('');
const url = 'https://weather-forecasting-back.herokuapp.com';

//-------------------------------* PASSWORD VISIBILITY *-------------------------------//
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

//-------------------------------* LOGIN PART *-------------------------------//
const handleSubmit = async (e) => {
e.preventDefault();
let response = '';
    try{
        if( email==='' && password==='' ){ 
            setWorning({ status:'error', msg:'Please fill all the details..!!!' });      
            }else{
                response = await axios.post(`${url}/register/login`, {
                    password: password.value,
                    email: email.value
                })         
                
                setWorning(response.data);

                if(response.data.status === 'success'){
                    localStorage.setItem( 'token', response.data.userToken );
                    props.history.push('/home');
                }}
    } catch (err) {
        setWorning({status:'error', msg:err.response.data.msg});
        alert(err.response.data.msg);
    }
    setTimeout(()=>{setWorning('')}, 7000) 
}


return (
    <Box className="container">
        <Grid id="Logincard">
            <Grid id="content">
                <h2 style={{textAlign: 'center'}} id="heading" >Login</h2>
                {
                    Worning.status==='error'
                ? 
                    <Stack sx={{ width: '100%' }} spacing={1}>
                        <Alert variant="outlined" severity="error">{Worning.msg}</Alert>
                    </Stack>
                : 
                    null
                }
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid>
                        <FormControl sx={{ ml: 1, mr: 1, width: '25ch'}}>
                            <TextField
                                id="standard"
                                label="Email"
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle  id="icons" />
                                    </InputAdornment>
                                ),
                                }}
                                variant="standard"
                            />
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid>
                        <FormControl className="standard" sx={{ ml: 1, mr: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                style={{color: 'white'}}
                                type={showPassword? 'text' : 'password'}
                                value={props.password}
                                onChange={(e) => {setPassword(e.currentTarget)}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff id="iconsVisibilityOff" />  : <Visibility id="icons" />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid sx={{textAlign: 'center', margin: '20px 0'}}>
                        <Button id="button" type="submit" variant="contained" disableElevation >
                            Submit
                        </Button>
                    </Grid>
                    <Grid sx={{textAlign: 'center'}}>
                        <p id = "switchLogin">Don&apos;t have account ? <span id="switch" onClick={() =>{props.history.push('/signup')}} variant="body2">Sign-Up</span></p>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Box>
)}


export default LoginComponent;
