import React, { Component } from 'react';



import OrderCard from './OrderCard';


import { firest,auth } from '../../redux/actions/fr';

import { LoginContext } from '../../context/contex';

class Orders extends Component {
    static contextType = LoginContext
    state = {
        show: 'card',
        loading : true,
        orders : [],
     
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
        const {user} = this.context
        this.fetchOrders(user)
       
      

       
    }

   
   
 

    fetchOrders = async() => {
      
        if(auth.currentUser)
        {

        const list = [];
     await   firest.collection('Orders').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
                const {Cart,Price,DeliveryDate,PaymentMethod,Status,Email,InspectionPrice,DeliveryCharges} = doc.data();
                if(Email === auth.currentUser.email)
                {
                    list.push({
                      Cart:Cart,
                      Price:Price,
                      DeliveryDate:DeliveryDate,
                      PaymentMethod:PaymentMethod,
                      Status:Status,
                      InspectionPrice:InspectionPrice,
                      DeliveryCharges:DeliveryCharges
                    })
                }
            })
        
        })
        this.setState({orders:list})
    }
    else{
        alert('Log In First')
    }
        
    }

   
  

    render() {
        const { top, loading, orders, show, categories, subcategories, sub_category_id,  message } = this.state
        return (
            <div className="products">
              

            

                  
                  

                    <span style={{fontSize:30,alignContent:'center'}}>My Orders</span>

                   

                

                        

                      

                   <div className={show}>{ orders.map(num=> <div key={num} className="loading-list"><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                orders.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                            orders.map(order=> <OrderCard  order={order} /> )
                            }
                        </div>
                    

                </div>
           
        );
    }
}


export default Orders;
