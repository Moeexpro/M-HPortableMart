import './App.css';
import './Fo.css';

import React,{Component, useContext, useEffect, useState,useRef} from 'react';
import PaypaL from './PayPal';
import ReactDOM from 'react-dom';

import {Router,Route,Switch,NavLink,Link,useHistory,useLocation} from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Footer from '../Footer/footer';
import { firest,auth } from '../../redux/actions/fr';

import Header from '../Header/Header';
import { LoginContext } from '../../context/contex';
import { indigo } from '@material-ui/core/colors';
import { ViewDayTwoTone } from '@material-ui/icons';

export default function CHeckout()
{
  const history = useHistory();
    const {cart,total,user,inspection,delivery} = useContext(LoginContext);
    const date = new Date(new Date().getTime()+(5*24*60*60*1000));
    const [userName,SetUserName] = useState('');
    const [emai,SetEmai] = useState('');
    const [address,SetAddress] = useState('');
    const [city,SetCity] = useState('');
    const [state,Setstate] = useState('');
    const [paymentmethod,SetPaymentMethod] = useState('');
    const [price,SetPrice] = useState(0);
    var co = total/176.75
    const [convert,SetConvert] = useState(co);

    const getuserdetails = async()=>{
   
        
     
    }
    


const getCity = (e) => {
    SetCity(e.target.value);
    firest.collection('users').doc(auth.currentUser.uid).update({
        City:e.target.value
    })
}

const getPaymentMethod = (e) => {
    SetPaymentMethod(e.target.value);
}

const getState = (e) => {
    Setstate(e.target.value);
    firest.collection('users').doc(auth.currentUser.uid).update({
        State:e.target.value
    })
}


const getAddress = (e) =>{
    SetAddress(e.target.value);

    firest.collection('users').doc(auth.currentUser.uid).update({
        Address:e.target.value
    })
}
    const confirm = () => 
    {
       var pid= '';
      auth.onAuthStateChanged(user => {
        if(city,address,state)
       {
            firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot)=>{
               const {Orders, PaymentPending} = documentSnapshot.data();
               var pay = parseInt(PaymentPending)
               if(isNaN(pay))
               {
                firest.collection('users').doc(auth.currentUser.uid).update({
                  Orders: Orders + 1,
                  PaymentPending: total
             
             })
               }
               else
               {
               firest.collection('users').doc(auth.currentUser.uid).update({
                Orders: Orders + 1,
                PaymentPending:pay  + total
               
           
           })
          }
        }) 

        firest.collection('Products').get().then((documentSnapshot)=>{
          documentSnapshot.forEach((doc)=>{
            const{id} = doc.data();
        cart.map((item)=>{


if(id === item.id)
{
pid = id;
firest.collection('Products').get().then((documentSnapshot)=>{
documentSnapshot.forEach((doc)=>{
const {id,stock,Orders} = doc.data();
var st = parseInt(stock);
if(id === pid )
{

 firest.collection('Products').doc(doc.id).update({
   
   Orders: Orders + 1,
   stock:st - 1
 })
}
})

})
}
})
        })
      })
               



       
        var idm = "Order" + Math.random().toString(16).slice(2);
         firest.collection('Orders').add({
           OrderID:idm,
            Cart:cart,
            Price:total,
            InspectionPrice:inspection,
            DeliveryCharges:delivery,
            PaymentMethod:"Cash On Delivery",
            buyer:userName,
            Email:emai,
            address:address,
            city:city,
            state:state,
            Status: 'Confirmed',
            DeliveryDate: date.toDateString()
        })
        history.push('/OrderC');
       }
       else
       {
         alert('Enter all Records');
         
       }
      })
    
         
      
      
    }

    const createOrder = (data, actions) =>{
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total,
            },
          },
        ],
      });
    };
  
    const onApprove = (data, actions) => {
      return actions.order.capture();
    };
    var carm = cart.map((item)=> (

   

<div className="row">
<div className="col-md-4 order-md-2 mb-4">
  
  <ul className="list-group mb-3">
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">Product name</h6>
        <small className="text-muted">{item.name}</small>
      </div>
      <span className="text-muted">{item.saleprice}</span>
    </li>
   
    <li className="list-group-item d-flex justify-content-between bg-light">
      <div>
      </div>
     
    </li>
    <li className="list-group-item d-flex justify-content-between">
      <span>Total (Rs)</span>
      <strong>{total}</strong>
    </li>
  </ul>

  <form className="card p-2">
    <div className="input-group">
    
    </div>
  </form>
</div>
</div>
    
)
    )
    

useEffect(()=>{
  auth.onAuthStateChanged(user => {
    if(user)
    {
      firest.collection('users').doc(user.uid).get().then((documentSnapshot)=>{
        const {username,email} = documentSnapshot.data();
        SetUserName(username);
        SetEmai(email);
    })

   }
    else
    {
        
       
        history.push('/');

    }
  })


},[userName,emai])

    return(
      
        <div>
        
<Header/>
<h4 className="d-flex justify-content-between align-items-center mb-3">
    <span className="text-muted">Your cart</span>
   
  </h4>
{carm}
<div className="container">
  <div className="py-5 text-center">
    <h2>Checkout form</h2>
   

    <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Billing address</h4>
      <form className="needs-validation" novalidate>
       

        <div className="mb-3">
          <label for="username">Username</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <input type="text" class="form-control" id="username" placeholder="Username" value={userName} required/>
            <div class="invalid-feedback" style={{width: 100}}>
              Your username is required.
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label for="email">Email <span className="text-muted"></span></label>
          <input type="email" className="form-control" id="email" value={emai} placeholder="you@example.com"/>
          <div className="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div className="mb-3">
          <label for="address">Address</label>
          <input type="text" className="form-control" id="address" value={address} onChange={getAddress} placeholder="1234 Main St" required/>
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

       
        <div className="row">
          <div className="col-md-5 mb-3">
            <label for="country">City</label>
            <select value={city} onChange={getCity} className="custom-select d-block w-100" id="country" required>
              <option  >Choose...</option>
              <option>Gujranwala</option>
              <option>Lahore</option>
              <option>karachi</option> 
              <option>Sialkot</option>
              <option>Faislabad</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label for="state">State</label>
            <select className="custom-select d-block w-100" id="state" value={state} onChange={getState} required>
              <option value="">Choose...</option>
              <option>Punjab</option>
              <option>Sindh</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
         
        </div>
        <hr className="mb-4"/>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="same-address"/>
          <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="save-info"/>
          <label className="custom-control-label" for="save-info">Save this information for next time</label>
        </div>
        <hr className="mb-4"/>

       
        <hr className="mb-4"/>
        <button className="btn btn-primary btn-lg btn-block" type="submit"  onClick={()=>{confirm()}}>Cash on Delivery</button>
      </form>
    </div>
    <div>
    <PayPalScriptProvider options={{ "AVjwpoqjCYCsVthRKfw2Q2azshgQr99_1fgJkGgouCnDwnxynOajFyPy64KN66USffjgLA5O4dCHq2Hu": "test" }}>
   <PayPalButtons
       style={{ layout: "horizontal"}}
       createOrder={(data, actions) => {
        firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot)=>{
          const {Orders, PaymentPending} = documentSnapshot.data();
          var pay = parseInt(PaymentPending)
          firest.collection('users').doc(auth.currentUser.uid).update({
           Orders: Orders + 1,
           PaymentPending:pay  + total
      
      })
   }) 
        var idm = "Order" + Math.random().toString(16).slice(2);
           firest.collection('Orders').add({
             OrderID:idm,
              Cart:cart,
              Price:total,
              InspectionPrice:inspection,
              DeliveryCharges:delivery,
              PaymentMethod:"Pay Pal",
              buyer:userName,
              Email:emai,
              address:address,
              city:city,
              state:state,
              Status: 'Confirmed',
              DeliveryDate: date.toDateString()
              
   
              
   
   
          })
           return actions.order.create({
               purchase_units: [
                   {
                       amount: {
                           value: Math.floor(total/176)
                       },
                   },
               ],
              
           })
        
        
        
        
          
          
       }}
     
      
   />;
</PayPalScriptProvider>
</div>
    </div>

  <footer className="my-5 ptext-muted text-center text-small">
    <p className="mb-1">&copy; 2021 M & H</p>
    <ul className="list-inline">
      <li className="list-inline-item"><a href="#">Privacy</a></li>
      <li className="list-inline-item"><a href="#">Terms</a></li>
      <li className="list-inline-item"><a href="#">Support</a></li>
    </ul>
  </footer>
 <head>

   
 <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>

</div>
<div style={{backgroundColor:'black'}}>
<Footer/>
</div>
</div>
    )    
}

