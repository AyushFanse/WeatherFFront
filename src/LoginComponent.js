import React,{ useState} from 'react';
import axios from 'axios';
import {IconButton,Button,Grid,TextField,FormControl,InputLabel, Input,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

const LoginComponent = (props) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [showPassword,setShowPassword] = useState('');
const url = 'https://weather-forecasting-back.herokuapp.com/';

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
    try{
        var response = await axios.post(`${url}register/login`, {
            password: password.value,
            email: email.value
        }) 
        if(response.data){
            localStorage.setItem('token', response.data);
            props.history.push('/home');
        }
    } catch (err) {
        alert('Please Enter the Valide Data..!!!');
        console.warn(err);
    }
}

return (
    <Box id="container" sx={{display: 'flex', justifyContent: 'center', alignItems:'center', height:'100vh'}}>
        <Grid id="Logincard">
            <Grid id="content">
                <h2 style={{textAlign: 'center'}} id="heading" >Login</h2>
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid>
                        <FormControl sx={{ ml: 1, mr: 1, width: '25ch'}}>
                            <TextField
                                id="input-with-icon-textfield"
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
                        <FormControl sx={{ ml: 1, mr: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
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
