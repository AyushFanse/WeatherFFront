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
const [error,setError] = useState(false);
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
//---------* Set Email *----------//
const SetEmail = ((value)=>{
    setEmail(value)
    setError(false)
})

//---------* Set Password *----------//
const SetPassword = ((value)=>{
    setPassword(value)
    setError(false)
})

//---------* Error *----------//
const ErrorDetect= (()=>{
    if(email==='' || password==='') {
        setError(true)
    } else {
        setError(false)
    }
})

return (
    <Box className="container">
        <Grid id="Logincard">
            <Grid id="content">
                <h2 style={{textAlign: 'center'}} id="heading" >Login</h2>
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid>
                        <FormControl sx={{ ml: 1, mr: 1, width: '25ch'}}>
                            <TextField
                                id="standard"
                                label="Email"
                                value={props.email}
                                onChange={(e) => {SetEmail(e.currentTarget)}}
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
                                onChange={(e) => {SetPassword(e.currentTarget)}}
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
                    {   
                            error
                        ?
                            <Grid sx={{textAlign: 'center', margin: '10px 0 0 0'}}>
                                <p id='error'>Fill all the data</p>
                            </Grid>
                        :
                        null
                    }
                    <Grid sx={{textAlign: 'center', margin: '20px 0'}}>
                        {
                                email==='' || password===''
                            ?
                                <Button id="buttonOff" variant="contained" onClick={()=>{ErrorDetect()}} >
                                    Submit
                                </Button>
                            :
                                <Button id="button" type="submit" variant="contained" disableElevation onClick={()=>{ErrorDetect()}}>
                                    Submit
                                </Button>
                        }
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
