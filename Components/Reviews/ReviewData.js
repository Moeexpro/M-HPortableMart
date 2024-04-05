import {firest,auth} from '../../redux/actions/fr'
import './recss.css'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'
import { useDebugValue, useEffect,useState } from 'react';
import './Data.css'

const ReviewData = ({prodid}) => {
 const [Reviews,SetReviews] = useState([]);
let history = useHistory();

 const generatestars = (val) =>{
     if(val === "1")
     {
         return(
             <div>
            <span class="float-right"><i class="text-warning fa fa-star"></i></span>
            </div>
         );
     }
     if(val === "2")
     {
         return(
             <div>
            <span class="float-right"><i class="text-warning fa fa-star"></i></span>
            <span class="float-right"><i class="text-warning fa fa-star"></i></span>
            </div>
         );
     }
     if(val === "3")
     {
         return(
        <div>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        </div>
         );
     }
     if(val === "4")
     {
         return(
        <div>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        </div>
         );
     }
     if(val === "5")
     {
         return(
        <div>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        </div>
         );
     }
    
     
 }

const getData = ()=>{
   
    }

const retrieve= async() => {
    var list = [];
    
   await firest.collection('Reviews').get().then((documentSnapshot)=>{
        documentSnapshot.forEach((doc)=>{
    const {Comment,Name,Email,Rating,productid,userimg} = doc.data();
    if(prodid === productid)
    {
        list.push({
            Name:Name,
            Email:Email,
           userimg:userimg,
            Comment:Comment,
            Rating:Rating,
            ProdID:productid
        })
    }
        })
       
    })
    SetReviews(list)
    console.log(Reviews)
}


 useEffect(()=>{
    
retrieve()
 },[Reviews])

    return (

            <div>
            <head>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
         
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>

<div class="container">
    <div>
    <h1 class="text-center">Product Ratings</h1>
	{
 Reviews.map((review) =>{
    return(

  <div class="container">
<div class="row">
    <div class="well">
    
    <div class="list-group">
      <a href="#" class="list-group-item active">
            <div class="media col-md-3">
                <figure class="pull-left">

                <img class="media-object img-rounded img-responsive"  src={review.userimg}  />
                </figure>
            </div>
            <div class="col-md-6">
                <h4 class="list-group-item-heading">{review.Name}</h4>
                <ReactQuill className="description" value={review.Comment} theme={"bubble"}  id="description"  />
                      
            </div>
            <div class="col-md-3 text-center">
               
               
                <div class="stars">
                   {generatestars(review.Rating)}
                </div>
                <p> Average {review.Rating} <small> / </small> 5 </p>
            </div>
     </a>
     </div>
</div>
     
     </div>
    </div>
        
    )})
    }

   </div>
	
</div>
</div>
    )
}

export default ReviewData;