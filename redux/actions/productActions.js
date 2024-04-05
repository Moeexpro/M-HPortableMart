import * as actionTypes from '../constants/productConstant';
import axios from 'axios';
import {firest} from '../actions/fr';
import { useState } from 'react';


export const getProducts = () =>  (dispatch) => {
    
    try {
        const list = [];
        console.log('Hiiiiii')
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
                list.push({
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
           })
       })
       console.log(list);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: list });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};

export const getProductDetails = (idm) =>  (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const li = [];
     
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
                    if(id === idm)
                    {
                        li.push({
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
console.log(li);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: li });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});

    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};
