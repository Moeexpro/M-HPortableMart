import React, { Component } from 'react';



import './Inspector.css'


import { firest } from '../../redux/actions/fr';



class InspectorCard extends Component {
   


  
   
  

    render() {
        const {inspector} = this.props;
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
            <div class="col-sm-12">
                <div class="col-xs-12 col-sm-8">
                    <h2>{inspector.InspectorName}</h2>
                    <p><strong>Inspection Category: </strong>{inspector.Category} </p>
                 
                    <p><strong>Experience in Tech: </strong>
                        <span class="tags">{inspector.Experience}</span> 
                        
                    </p>
                </div>             
                <div class="col-xs-12 col-sm-4 text-center">
                    <figure>
                        <img src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png" alt="" class="img-circle img-responsive"/>
                        
                           
                        
                    </figure>
                </div>
            </div>            
            <div class="col-xs-12 divider text-center">
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong> {inspector.Inspections} </strong></h2>                    
                    <p><small>Inspections Done</small></p>
                    
                </div>
               
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>{inspector.InspectionPrice+500}</strong></h2>                    
                    <p><small>Inspection Charges</small></p>
                    <div class="btn-group dropup btn-block">
                     
                      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                      </button>
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


export default InspectorCard;
