
import React,  { useEffect, useState } from 'react';
import {firest,auth} from '../../redux/actions/fr'
import './recss.css'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'

const ReviewForm = ({productid}) => {
 let r = 5;
 let a = 4;
 let y = 3;
 let m = 2;
 let n = 1;
let history = useHistory();

 const [feedback,Setfeedback] = useState('');
 const [one,Setone] = useState();

 const submitans = () => {

    if(feedback && document.getElementById('star1').checked || document.getElementById('star2').checked || document.getElementById('star3').checked || document.getElementById('star4').checked || document.getElementById('star5').checked )
    {
firest.collection('Reviews').add({
    Email:auth.currentUser.email,
    Name:auth.currentUser.displayName,
    Comment: feedback,
    productid: productid,
    userimg: auth.currentUser.photoURL,
    Rating:document.querySelector('input[name="rating"]:checked').value
}).then(()=>{alert('Feedback Submitted Successfully, Thank You.')
history.push('/')

})
    }
    else
    {
        alert('Please fill all records');
    }
 }

    return (
       

            
            <div>
            <head>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427919207889091"
     crossorigin="anonymous"></script>
      <script>
            
          </script>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
<div class="container">
<form onSubmit={submitans} placeholder='Become Vendor'>
    <div className="container card-0 justify-content-center ">
       
    <div className="card-body px-sm-4 px-0">
        <div className="row justify-content-center mb-5">
            <div className="col-md-10 col">
                <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Feedback Form </h3>
                <p className="mt-md-4 ml-md-0 ml-2 text-center text-sm-left">Please Kindly Review the product by filling the form below</p>
            </div>
        </div>
        
        <div className="row justify-content-center round">
            <div className="col-lg-10 col-md-12 ">
                <div className="card shadow-lg card-1">
                    <div className="card-body inner-card">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <div className="form-group"><label for="first-name">Name</label><input type="text" value={auth.currentUser.displayName}  className="form-control" id="first-name" /> </div>
                                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                                <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/jquery.inputmask.bundle.js"></script>
                                <div className="form-group"><br/>
  </div>
                                
                                <script>
    $(":input").inputmask();

   </script>
                               
                              
                            
                            <div className="col-lg-5 col-md-6 col-sm-12">
                          
                               </div>
                              
                               
                                
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                            <label for="first-name">Write your review</label>
                            <ReactQuill className="description" value={feedback} onChange={ (value)=>Setfeedback(value) } id="description"  />
                            <div class="row">
	<div class="rating">
     
      <input type="radio" id="star5" name="rating" value={r} onChange={()=>{}}/><label for="star5" title="Excellent">5 stars</label>
      <input type="radio" id="star4" name="rating" value={a} /><label for="star4" title="Great">4 stars</label>
      <input type="radio" id="star3" name="rating" value={y} /><label for="star3" title="Good">3 stars</label>
      <input type="radio" id="star2" name="rating" value={m} /><label for="star2" title="Not good">2 stars</label>
      <input type="radio" id="star1" name="rating" value={n} /><label for="star1" title="Sucks big time">1 star</label>
    </div>
    </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                               
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  
	
	</div>
    <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                               
                                <div className="row justify-content-end mb-5">
                                    <div className="col-lg-4 col-auto "><button type="button" onClick={()=>{submitans()}} className="btn btn-primary btn-block"><small className="font-weight-bold">Submit Review</small></button> </div>
                                </div>
                            </div>
                        </div>
    </form>
   
</div>

</div>
    )
}

export default ReviewForm;