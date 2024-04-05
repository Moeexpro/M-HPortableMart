import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';
import {firest,auth} from '../actions/fr'

export const addToCart = (productid, quantity) => async (dispatch, getState) => {
    try { 
        const data = [];
        firest.collection('Products').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc => {
                  const {name,
                    id,
                    category,
                    vendor,
                    actualprice,
                    saleprice,
                    discount,
                    stock,
                    description,
                    type,
                    Image,
                    tagline} = doc.data();
                    if(id === productid)
                    {
                        data.push({
                            name:name,
                        id:id,
                        category:category,
                        vendor:vendor,
                        actualprice:actualprice,
                        saleprice:saleprice,
                        discount:discount,
                        stock:stock,
                        description:description,
                        type:type,
                        Image:Image,
                        tagline:tagline
                        })
                    }
            })
        })
console.log(data);
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });

        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id) => (dispatch, getState) => {
    console.log(id);
    
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};