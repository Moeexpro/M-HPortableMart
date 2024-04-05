import React, { useState, useContext } from 'react';
import { makeStyles, Box, Typography, Badge, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import LoginDialog from '../Login/LoginDialog';
import { LoginContext } from '../../context/contex';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        margin: '2 70% 0 auto', 
        display: 'flex',    
        '& > *': {
            
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 8,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',
                
                display: 'inline',
                flexDirection: 'row',
                marginTop: 5,
                marginLeft:10
                
                
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            
        }   
    },
    
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 100,
        borderRadius: 2,
        marginRight:10,
        height: 32,
        boxShadow: 'none',
       
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF',
            
        }   
    }
}));


const CustomButtons = () => {
    const classes = useStyle();
    const [ open, setOpen ] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Box className={classes.wrapper}>
            {
                 
                    account ? <Profile account={account} setAccount={setAccount} /> : 
                    <Link>
                        <Button className={classes.login} variant="contained" onClick={() => openDialog() }>Login</Button>
                    </Link>
    }
            
           
            <Link to='/cart' className={classes.container}>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
              
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default CustomButtons;