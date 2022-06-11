import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
    Alert,
    Stack,
    Button,
    Grid,
    FormControl,
    InputLabel,
    CircularProgress,
    Input,
    Box
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';

const Forgot = ({ URL }) => {
    //-------------------------------* USE-STATE METHODS *-------------------------------//

    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const [link, setLink] = useState('');
    const contactForm = useRef();

    //-------------------------------* LOGIN PART *-------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = contactForm.current;

        try {
            setLoading(true);
            if (data.email.value) {
                let response = await axios.post(`${URL}/register/forgotpassword`, {
                    email: data.email.value
                });

                setWorning(response.data);

                if (response.status === 200) {
                    console.log(response.data.msg)
                    setLink(response.data.msg)
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
        <>
            <Navbar Page={'Signup'} />
            <Box className="container">
                <Grid id="Logincard">
                    <Grid id="content">
                        {
                            link === ''
                                ?
                                (
                                    <>
                                        <h5 style={{ textAlign: 'center' }} id="heading">
                                            <AccountCircle id="forgotIcon" /> Forgot Password
                                        </h5>
                                        {
                                            Worning.status === 'error'
                                                ?
                                                (
                                                    <Stack sx={{ width: '100%' }} spacing={1}>
                                                        <Alert variant="outlined" severity="error">
                                                            {Worning.msg}
                                                        </Alert>
                                                    </Stack>
                                                )
                                                :
                                                null
                                        }
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
                                                        required
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid sx={{ textAlign: 'center', marginTop: '20px' }}>
                                                <Button id="button" type="submit" variant="contained" disableElevation>
                                                    Send
                                                </Button>
                                                {loading && <CircularProgress size={24} id="CircularProgress" />}
                                            </Grid>
                                        </form>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <h5 style={{ textAlign: 'center' }} id="heading">
                                            {link}
                                        </h5>
                                    </>
                                )
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Forgot;
