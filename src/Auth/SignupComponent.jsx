import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Alert, Stack, IconButton, Button, Grid, FormControl, Card, Input, InputLabel, CircularProgress, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';


const LoginComponent = ( {URL}, props ) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [showPassword,setShowPassword] = useState('');
const [loading, setLoading] = useState(false);
const [first_name,setFirstName] = useState('');
const [last_name,setLastName] = useState('');
const [Worning,setWorning] = useState('');
const [number,setNumber] = useState('');
const history = useHistory();


//-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

useEffect(()=>{setTimeout(()=>{setWorning('')},3000)},[first_name, last_name, email, number, password])

//-------------------------------* SIGN-UP ACCOUNT FUNCTION *-------------------------------//
const handleSubmit = async (e) => {

e.preventDefault();

let response = '';
    try{     
        setLoading(true)
        if(first_name==='' && last_name==='' && email==='' && number==='' && password==='' ) {   
            setWorning({status:'error', msg:'Please fill all the details..!!!'});      
        }else{
            response = await axios.post(`${URL}/register/registeruser`, {
                    first_name:first_name.value,
                    last_name:last_name.value,
                    email:email.value,
                    number:number.value,
                    password:password.value
                })
                
                setWorning(response.data);

                if(response.data.status === 'success'){
                    history.push('/');
            }}
    } catch (err) {
            setWorning({status:'error', msg:err.response.data.msg});
            alert(err.response.data.msg);
    }    
    setLoading(false)
    setTimeout(()=>{setWorning('')},7000) 
}

return (
        <Box>
            <Navbar Page={'Home'} />
            <Box className="containerSign">
                <Card id="signInCard">
                    <Grid id="signInContent" >
                        {
                                Worning.status==='error'
                            ? 
                                <>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert variant="outlined" severity="error">{Worning.msg}</Alert>
                                    </Stack>  
                                    <br/>
                                </>
                            : 
                                null
                        } 
                        <form  style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>                        
                            <Box sx={{ '& .MuiTextField-root': { width: 293, mt:2 }}}>
                                <FormControl sx={{ width: 140, mr:1  }}>
                                    <InputLabel sx={{ ml:-1.6}} id="title" focused htmlFor="input-with-icon-textfield1">
                                        First Name
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-textfield1"
                                        name='first_name'
                                        aria-required="true"
                                        style={{color: 'white'}}
                                        value={props.first_name}
                                        onChange={(e) => {setFirstName(e.currentTarget)}}
                                        label="First Name"
                                        aria-describedby="component-warning-text"
                                    />
                                </FormControl>
                                <FormControl sx={{ width: 140, ml:1 }}>
                                    <InputLabel sx={{ ml:-1.6}} id="title" focused htmlFor="input-with-icon-textfield2">
                                        Last Name
                                    </InputLabel>
                                    <Input
                                        id="input-with-icon-textfield2"
                                        name='last_name'
                                        aria-required="true"
                                        style={{color: 'white'}}
                                        value={props.last_name}
                                        onChange={(e) => {setLastName(e.currentTarget)}}
                                        label="Last Name"
                                        aria-describedby="component-warning-text"
                                    />
                                </FormControl>
                            </Box>
                            <FormControl sx={{ width: 293, mt:2 }}>
                                <InputLabel sx={{ ml:-1.6}} id="title" focused htmlFor="input-with-icon-textfield3">
                                    Email
                                </InputLabel>
                                <Input
                                    id="input-with-icon-textfield3"
                                    name='email'
                                    style={{color: 'white'}}
                                    value={props.email}
                                    onChange={(e) => {setEmail(e.currentTarget)}}
                                    label="Email"
                                    aria-describedby="component-warning-text"
                                />
                            </FormControl>
                            <FormControl sx={{ width: 293, mt:2 }}>
                                <InputLabel sx={{ ml:-1.6}} id="title" focused htmlFor="input-with-icon-textfield4">
                                    Number
                                </InputLabel>
                                <Input
                                    id="input-with-icon-textfield4"
                                    name='name'
                                    style={{color: 'white'}}
                                    value={props.number}
                                    onChange={(e) => {setNumber(e.currentTarget)}}
                                    label="Number"
                                    aria-describedby="component-warning-text"
                                />
                            </FormControl>
                            <FormControl sx={{ '& .MuiTextField-root': { m: 0}, mt:2}}>
                                <InputLabel htmlFor="standard-adornment-password" id="title" focused sx={{ml:-1.7}}>Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword? 'text' : 'password'}
                                    value={props.password}
                                    size="small"
                                    style={{color: 'white'}}
                                    label="Password"
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
                                {loading && ( <CircularProgress size={50} id='CircularProgress' /> )}
                            </Grid>
                            <Grid sx={{textAlign: 'center', m:2, cursor: 'pointer'}}>
                                <p id = "switchLogin">Already have account ? <span id="switch" onClick={() =>{history.push('/')}} variant="body2">Login</span></p>
                            </Grid>                            
                        </form>
                    </Grid>
                </Card>
            </Box> 
        </Box>   
)
}

export default LoginComponent;
