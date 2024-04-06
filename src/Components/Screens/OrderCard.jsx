import React, { Component } from 'react';



import './Inspector.css'


import { firest } from '../../redux/actions/fr';



class OrderCard extends Component {
   

   
   
  

    render() {
        const {order} = this.props;
        var carm = order.Cart.map((item)=> (

   

         
            <div className="col-md-5 order-md-3 mb-4">
              
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between 1h-condensed">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">{item.name}</small>
                  </div>
                  <div>
                    <h6 className="my-0">Shop Name</h6>
                    <small className="text-muted">{item.vendor}</small>
                  </div>
                  <div>
                    <h6 className="my-0">Product Price</h6>
                    <small className="text-muted">{item.saleprice}</small>
                  </div>
                
                </li>
               
               </ul>
            </div>
                
            )
                )
                
      
       
        return (
            <div className="products">
              

             

                  
                  

                  

                    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet"/>
<div class="container">

	<div class="row">
    
		<div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
       
   
    	 <div class="well profile">
         <h4 className="d-flex justify-content-between align-items-center mb-3">
    <span className="text-muted">Order Details</span>
   
  </h4>
{carm}
            <div class="col-sm-12">
                <div class="col-xs-12 col-sm-8">
                    
                    

               
                    <h2></h2>
                    <p><strong>Delivery Date (Targeted): </strong>{order.DeliveryDate} </p>
                    <p><strong>Order Status: </strong>{order.Status} </p>
                    <p><strong>Total Price(including all charges): </strong>
                        <span class="tags">{order.Price}</span> 
                        
                    </p>
                    <p><strong>Inspection Charges: </strong>
                        <span class="tags">{order.InspectionPrice}</span> 
                        
                    </p>
                    <p><strong>Delivery Charges: </strong>
                        <span class="tags">{order.DeliveryCharges}</span> 
                        
                    </p>
                   
                </div>             
                <div class="col-xs-12 col-sm-4 text-center">
                    <figure>
                        <img src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png" alt="" class="img-circle img-responsive"/>
                        <figcaption class="ratings">
                            
                        </figcaption>
                    </figure>
                </div>
            </div>            
            <div class="col-xs-12 divider text-center">
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong> {order.PaymentMethod} </strong></h2>                    
                    <p><small>Payment Method</small></p>
                   
                </div>
               
                <div class="col-xs-12 col-sm-4 emphasis">
                   
                    <div class="btn-group dropup btn-block">
                    
                    
                      <ul class="dropdown-menu text-left" role="menu">
                        <li><a href="#"><span class="fa fa-envelope pull-right"></span> Send an email </a></li>
                        <li><a href="#"><span class="fa fa-list pull-right"></span> Add or remove from a list  </a></li>
                        <li class="divider"></li>
                        <li><a href="#"><span class="fa fa-warning pull-right"></span>Report this user for spam</a></li>
                        <li class="divider"></li>
                        
                      </ul>
                    </div>
                </div>
            </div>
    	 </div>                 
		</div>
	</div>
</div>

                

                        

                      

                  
                    

                </div>
           
        );
    }
}


export default OrderCard;
