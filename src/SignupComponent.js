import React, {useState} from 'react';
import axios from 'axios';
import {IconButton,Button,Grid,TextField,FormControl,Card,Input,AppBar,InputLabel,Toolbar,Typography,InputAdornment,Box} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginComponent = (props) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [showPassword,setShowPassword] = useState('');
const [first_name,setFirstName] = useState('');
const [last_name,setLastName] = useState('');
const [number,setNumber] = useState('');
const url = 'https://weather-forecasting-back.herokuapp.com/';

//-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

//-------------------------------* SIGN-UP ACCOUNT FUNCTION *-------------------------------//
const handleSubmit = async (e) => {

e.preventDefault();

console.log(first_name.value);

try{        
    await axios.post(`${url}register/registeruser`, {
            first_name:first_name.value,
            last_name:last_name.value,
            email:email.value,
            number:number.value,
            password:password.value
        })
        alert('You Have Successfully Registered Your Account..!');
        props.history.push('/');   
    }catch(err) {
        if(err.response.data.msg === undefined){
            alert('Fill all the details');
        }else{
            alert(err.response.data.msg);
        }
        console.warn(err);
}   }

return (
        <Box>
            <AppBar id="navBar" position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={()=>{props.history.goBack()}} edge="start" id="signInHead" aria-label="menu" sx={{ mr: 2 }}>
                    <NavigateBeforeIcon id="icons"/>
                    </IconButton>
                    <Typography variant="h6" component="div" id="signInHead" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Sign-up
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box className="containerSign">
                <Card id="signInCard">
                    <Grid id="signInContent" >
                        <form  style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>                        
                            <Box component="form" sx={{ '& .MuiTextField-root': { ml: 1.8, mr: 1.8,width: '13.6ch' }}}>
                                <TextField
                                    id="standard"
                                    label="First-Name"
                                    size="small"
                                    variant="standard"
                                    aria-required="true"
                                    value={props.first_name}
                                    onChange={(e) => {setFirstName(e.currentTarget)}}
                                    />
                                <TextField
                                    id="standard"
                                    label="Last-Name"
                                    size="small"
                                    variant="standard"
                                    value={props.last_name}
                                    onChange={(e) => {setLastName(e.currentTarget)}}
                                    />
                            </Box>
                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                                <TextField
                                        id="standard"
                                        label="Email"
                                        size="small"
                                        variant="standard"
                                        value={props.email}
                                        onChange={(e) => {setEmail(e.currentTarget)}}
                                    />                                 
                            </Box>
                            <Box component="form" sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                                <TextField
                                    id="standard"
                                    label="Number"
                                    size="small"
                                    variant="standard"
                                    value={props.number}
                                    onChange={(e) => {setNumber(e.currentTarget)}}
                                    />
                            </Box>
                            <FormControl sx={{ '& .MuiTextField-root': { m: 0}}}>
                            <InputLabel htmlFor="standard-adornment-password" sx={{ml:-1.7}}>Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword? 'text' : 'password'}
                                    value={props.password}
                                    size="small"
                                    style={{color: 'white'}}
                                    sx={{width: 293}}
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
                            <Grid sx={{textAlign: 'center'}}>
                                <Button  id="button" sx={{mt:3}} type="submit" variant="contained" disableElevation >
                                    Create Account
                                </Button>
                                <Grid sx={{textAlign: 'center', m:2, cursor: 'pointer'}}>
                                    <p id = "switchLogin">Already have account ? <span id="switch" onClick={() =>{props.history.push('/')}} variant="body2">Log-In</span></p>
                                </Grid>                            
                            </Grid>
                        </form>
                    </Grid>
                </Card>
            </Box> 
        </Box>   
)
}

export default LoginComponent;