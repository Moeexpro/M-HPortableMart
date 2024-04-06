import { createContext, useState } from 'react';
import {firest,auth,provider} from '../redux/actions/fr'
import React, { Component } from 'react'


import {LoginContext} from './contex'

export class ContextProvider extends Component {

    
 
  state = {
      
           cart: [],
           total: 0,
           user:'',
           account: '',
           inspection:0,
           delivery:400,
           dat:{}
          }
        
  
      addCart = async(productid) =>{
          const {cart} = this.state;
          const {dat} = this.state;
        
          
          const check = cart.every(item =>{
              return item.id != productid
          })
        
          if(check){
            const data = [];
          
          await  firest.collection('Products').get().then(documentSnapshot => {
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
                        var st = parseInt(stock);
                        if(id === productid && st > 0)
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
    this.setState({cart:[...cart,...data]})
            
             
           
       
             
            
          }
        
        
        
          else{
              alert("The product has been already added to cart.")
          }
      };
  
    
  
      removeProduct = id =>{
          if(window.confirm("Do you want to delete this product?")){
              const {cart} = this.state;
              const carts  = [...cart];
              console.log(carts)
              carts.forEach((item, index) =>{
                  if(item.id === id){
                      carts.splice(index, 1)
                  }
              })
              this.setState({cart: carts});
              this.getTotal();
             
            
              
          }
         
      };
  
      getTotal = (price)=>{
         
          this.setState({total: price})
      };
      getInspection = (price)=>{
         
        this.setState({inspection: price})
    };
      reduction = (id) =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === id){
              item.count === 1 ? item.count = 1 : item.count -=1 ;
            }
        })
        this.setState({cart: cart});
       
    };

    increase = (idm) =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === idm){
              item.count += 1;
              
            }
          })
        
        this.setState({cart: cart});
        
    };
     
      componentDidUpdate(){
          localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
          localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
        
      };
  
      componentDidMount(){
          const dataCart = JSON.parse(localStorage.getItem('dataCart'));
          if(dataCart !== null){
              this.setState({cart: dataCart});
          }
          
          
      }
     
  
      render() {
          const {cart,total,user,account,inspection,delivery} = this.state;
         
          const {addCart,removeProduct,getTotal,reduction,increase,getInspection} = this;
          return (
              <LoginContext.Provider 
              value={{addCart,cart,user,delivery,account,inspection,removeProduct,total,getTotal,increase,reduction,getInspection ,loginuser: async (email, password) => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  alert('Successfully Signed In');
                  this.setState({account:email});
               
                } catch (e) {
                  alert(e)
                  console.log(e);
                }
              },
              loginwithGoogle: async() => {
                
                provider.setCustomParameters({
                  prompt: 'select_account'
                });
             await   auth
                .signInWithPopup(provider).then(()=>{

                
firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot)=>{
  if(documentSnapshot.exists)
  {

  }
  else
  {
    firest.collection('users').doc(auth.currentUser.uid).set({
      username:auth.currentUser.displayName,
      email:auth.currentUser.email,
      phone:auth.currentUser.phoneNumber,
      Orders:0,
      Inspections:0,
      InspectionChargesTotal:0,
      PaymentPending:0
      
     
  })
  }
})
                  
                  alert('Successfully Signed In With Google');
                this.setState({account:auth.currentUser.email});

                })
                  
                  
                
                .catch((error) => alert(error.message));
                
                
              
              },
              registeruser: async (username, password,email) => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password).then(() => {
                    firest.collection('users').doc(auth.currentUser.uid).set({
                        username:username,
                        email:email,
                        Orders:0,
                        Inspections:0,
                        InspectionChargesTotal:0,
                        PaymentPending:0
                        
                       
                    })
                })
                alert('Registered Successfully Now LogIn')
              } catch (e) {
                console.log(e);
                alert(e);
              }
              },
            sync: () => {
            
               
            
              auth.onAuthStateChanged((authUser) => {
                console.log("THE USER IS >>> ", authUser);
          
                if (authUser) {
                  // the user just logged in / the user was logged in
      
                this.setState({user:authUser})
                } 
          })},
            logout: () => {
              
                auth.signOut().then(()=>{
                  window.location.reload('false');
               
                
              })
            
             

           
               } }}>
                  {this.props.children}
              </LoginContext.Provider>
          )
      }
  }
  