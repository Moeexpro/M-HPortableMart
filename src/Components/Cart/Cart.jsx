import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/api';
import { LoginContext } from '../../context/contex';
import { useHistory } from 'react-router-dom';
const useStyle = makeStyles(theme => ({
    component: {
        // marginTop: 55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        // width: '67%',
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

const Cart = ({ match, history }) => {
    const classes = useStyle();
    const {cart,removeProduct} = useContext(LoginContext);
   
   
    useEffect(() => {
       
            
       
    }, [cart]);

    const removeItemFromCart = (id) => {
        
        removeProduct(id);
       
    }

    const buyNow = async () => {
        
        history.push('/Checkout/')
    }

    return (
        <>
        { cart.length ? 
            <Grid container className={classes.component}>
                <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cart.length})</Typography>
                    </Box>
                        {   cart.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <Box className={classes.bottom}>
                        <Button onClick={() => buyNow()} variant="contained" className={classes.placeOrder}>Checkout</Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cart} />
                </Grid>
            </Grid> : <EmptyCart />
        }
        </>

    )
}

export default Cart;