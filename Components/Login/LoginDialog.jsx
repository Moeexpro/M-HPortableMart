import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { authenticateLogin, authenticateSignup } from '../../service/api';
import {auth, firest} from '../../redux/actions/fr';
import {LoginContext} from '../../context/contex';
import M from './loginM&H.jpg'
const useStyle = makeStyles({
    component: {
        height: '70vh',
        width: '90vh',
        maxWidth: 'unset !important'
    },
    image: {
       
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
        width: '40%',
        padding: '45px 35px',
        '& > *': {
            color: '#FFFFFF',
            fontWeight: 600
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    createText: {
        margin: 'auto 0 5px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer'
    },
    error: {
        fontSize: 10,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
})

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: '',

};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();
    const [ login, setLogin ] = useState(loginInitialValues);
    const [email,SetEmail] = useState('');
    const [pass,SetPass] = useState('');
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, showError] = useState(false);
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
   

    const {user,loginuser,registeruser,sync,loginwithGoogle} = useContext(LoginContext);

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const getPass = (e) => {
        SetPass(e.target.value)
        
    }

    const getEma = (e) => {
        SetEmail(e.target.value)
    }

    const loginWithGoogle = () => {
       
        loginwithGoogle();
        handleClose();
    }
    const loginUser = (username,password) => {
       
      loginuser(username,password)
      
            handleClose();
        
    }
    const signupUser = () => {
        let response =  authenticateSignup(signup);
        const {firstname,
        lastname,
        username,
        email,
        password} = signup;
        if(!response && !firstname && !lastname && !username && !email && !password)
        {
            alert('Enter all records')
            return;
        }
         
        
        
        registeruser(username,password,email);

        handleClose();
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose}  maxWidth="md">
            <DialogContent className={classes.component} style={{flex:1,top:40}} >
                <Box style={{display: 'flex',flex:1}}>
                    <Box className={classes.image}>
                    <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ? 
                        <Box className={classes.login}>
                             <input value={email} onChange={(e) => getEma(e)} type='text' placeholder='Enter Email'  />
                            { error && <Typography className={classes.error}>Please enter valid Email ID</Typography> }
                            <input value={pass} onChange={(e) => getPass(e)} type='password' placeholder='Enter Password'  />
                            <Typography className={classes.text}>By continuing, you agree to M & H Terms of Use and Privacy Policy.</Typography>
                            <Button className={classes.loginbtn} onClick={() => loginUser(email,pass)} >Login</Button>
                            <Typography className={classes.text} style={{textAlign:'center'}}>OR</Typography>
                            <Button className={classes.requestbtn} onClick={() => loginWithGoogle()}>Sign In With Google</Button>

                            <Typography className={classes.createText} onClick={() => toggleSignup()}>New to M & H? Create an account</Typography>
                        </Box> : 
                        <Box className={classes.login}>
                            <TextField onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                           
                            <Button className={classes.loginbtn} onClick={() => signupUser()} >Continue</Button>
                        </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;