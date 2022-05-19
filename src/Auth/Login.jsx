import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	Alert,
	Stack,
	IconButton,
	Button,
	Grid,
	FormControl,
	InputLabel,
	CircularProgress,
	Input,
	InputAdornment,
	Box
} from '@mui/material';
import { Visibility, VisibilityOff, LockTwoTone, AccountCircle } from '@mui/icons-material';

const LoginComponent = ({ URL }, props) => {
	//-------------------------------* USE-STATE METHODS *-------------------------------//
	
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState('');
	const [Worning, setWorning] = useState('');
	const history = useHistory();
	const contactForm = useRef();

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
		const data = contactForm.current;

		try {
			setLoading(true);
			if (data.email.value && data.password.value) {
				let response = await axios.post(`${URL}/register/login`, {

					email: data.email.value,
					password: data.password.value
				});

				setWorning(response.data);

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.userToken);
                    history.replace('/home');
                }

                if (response.status === 400) {
                    setWorning({ status: 'error', msg: response.data.msg })
                }
			} else {
				setWorning({ status: 'error', msg: 'Please fill all the details..!!!' });
			}
		} catch (err) {

			if (!err.response) {
				setWorning({ status: 'error', msg: "Your Are offline" })
				setLoading(false)
				return;
			}

			setWorning({ status: 'error', msg: err.response.data.msg });
			setLoading(false)
		}
		setLoading(false)
		setTimeout(() => {
			setWorning('');
		}, 7000);
	};

	return (
		<Box className="container">
			<Grid id="Logincard">
				<Grid id="content">
					<h2 style={{ textAlign: 'center' }} id="heading">
						<LockTwoTone id="loginIcon" />Login
					</h2>
					{Worning.status === 'error' ? (
						<Stack sx={{ width: '100%' }} spacing={1}>
							<Alert variant="outlined" severity="error">
								{Worning.msg}
							</Alert>
						</Stack>
					) : null}
					<br />
					<form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
						<Grid>
							<FormControl sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }}>
								<InputLabel sx={{ ml: 0.2 }} id="title" focused htmlFor="input-with-icon-textfield">
									Email
								</InputLabel>
								<Input
									id="input-with-icon-textfield"
									name="email"
									style={{ color: 'white' }}
									label="Email"
									aria-describedby="component-warning-text"
									endAdornment={
										<InputAdornment position="start">
											<AccountCircle id="icons" />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<br />
						<Grid>
							<FormControl
								className="standard"
								sx={{ ml: 1, pl: 2, pr: 2, mr: 1, width: '25ch' }}
								variant="standard"
							>
								<InputLabel
									id="title"
									style={{ marginLeft: '15px' }}
									focused
									htmlFor="standard-adornment-password"
								>
									Password
								</InputLabel>
								<Input
									id="standard-adornment-password"
									style={{ color: 'white' }}
									type={showPassword ? 'text' : 'password'}
									name='password'
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? (
													<VisibilityOff id="iconsVisibilityOff" />
												) : (
													<Visibility id="icons" />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid sx={{ textAlign: 'center', margin: '20px 0' }}>
							<Button id="button" type="submit" variant="contained" disableElevation>
								Login
							</Button>
							{loading && <CircularProgress size={24} id="CircularProgress" />}
						</Grid>
						<Grid sx={{ textAlign: 'center' }}>
							<p id="switchLogin">
								Don&apos;t have account ?{' '}
								<span
									id="switch"
									onClick={() => {
										history.push('/signup');
									}}
									variant="body2"
								>
									Sign-Up
								</span>
							</p>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
};

export default LoginComponent;
