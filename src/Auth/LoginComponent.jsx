import React,{ useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Alert, Stack, IconButton, Button, Grid, FormControl, InputLabel, CircularProgress, Input, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, LockTwoTone, AccountCircle } from '@mui/icons-material';



const LoginComponent = ( { URL } , props ) => {

//-------------------------------* USE-STATE METHODS *-------------------------------//
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [showPassword,setShowPassword] = useState('');
const [Worning,setWorning] = useState('');
const history = useHistory();

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
        setLoading(true)
        if( email==='' && password==='' ){ 
            setWorning({ status:'error', msg:'Please fill all the details..!!!' });      
            }else{
                response = await axios.post(`${URL}/register/login`, {
                    password: password.value,
                    email: email.value
                })         
                
                setWorning(response.data);

                if(response.data.status === 'success'){
                    localStorage.setItem( 'token', response.data.userToken );
                    history.push('/home');
                }}
    } catch (err) {
        // setWorning({status:'error', msg:err.response.data.msg});
        // alert(err.response.data.msg);
    }
    setLoading(false)
    setTimeout(()=>{setWorning('')}, 7000) 
}


return (
    <Box className="container">
        <Grid id="Logincard">
            <Grid id="content">
                <h2 style={{textAlign: 'center'}} id="heading" ><LockTwoTone id='loginIcon'/>Login</h2>
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
                        <FormControl sx={{ m: 1, pl:2, pr:2, width: '25ch'}}>
                            <InputLabel sx={{ ml:0.2}} id="title" focused htmlFor="input-with-icon-textfield">
                                Email
                            </InputLabel>
                            <Input
                                id="input-with-icon-textfield"
                                name='email'
                                style={{color: 'white'}}
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
                                label="Email"
                                aria-describedby="component-warning-text"
                                endAdornment= {
                                    <InputAdornment position="start">
                                        <AccountCircle  id="icons" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid>
                        <FormControl className="standard" sx={{ ml: 1, pl:2, pr:2, mr: 1, width: '25ch' }} variant="standard">
                            <InputLabel id="title" style={{ marginLeft:'15px' }} focused htmlFor="standard-adornment-password">Password</InputLabel>
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
                            Login
                        </Button>
                        {loading && ( <CircularProgress size={24} id='CircularProgress' /> )}
                    </Grid>
                    <Grid sx={{textAlign: 'center'}}>
                        <p id = "switchLogin">Don&apos;t have account ? <span id="switch" onClick={() =>{history.push('/signup')}} variant="body2">Sign-Up</span></p>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Box>
)}


export default LoginComponent;
