import './App.css';
import './Fo.css';

import React,{Component, useContext, useEffect, useState,useRef} from 'react';

import ReactDOM from 'react-dom';

import {Router,Route,Switch,NavLink,Link,useHistory,useLocation} from 'react-router-dom';

import Footer from '../Footer/footer';
import { firest,auth } from '../../redux/actions/fr';

import Header from '../Header/Header';
import { LoginContext } from '../../context/contex';

 const PaypaL = () => {
    const paypal = useRef()
    const {cart,total,user,inspection,delivery} = useContext(LoginContext);
    useEffect(()=>{
        window.paypal.Buttons({
            createOrder:(data, actions)=> {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "0.01",
                      },
                    },
                  ],
                });
              },
            
              onApprove:async(data, actions) =>{
                return actions.order.capture();
              }
        }).render(paypal.current)
    })
return(
    <div>
        <div>ref = {paypal}</div>
    </div>
)
}
export default PaypaL