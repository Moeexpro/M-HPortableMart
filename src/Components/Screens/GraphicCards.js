import './App.css';

import React,{Component} from 'react'
import Footer from '../Footer/footer';
import { Slide } from 'react-slideshow-image';
import {Router,Route,Switch,NavLink,Link,useHistory} from 'react-router-dom';

import {Grid,Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import makeStyles from './styles'
import Header from '../../Components/Header/Header'
import { firest,auth } from '../../redux/actions/fr';

import {LoginContext} from '../../context/contex';


export default class Cards extends Component {
  
  static contextType = LoginContext;
  
    state = {
        graphiccards:[]
    }

    async componentDidMount () {
        const list = [];
await firest.collection('Products').get().then((documentSnapshot)=>{
    documentSnapshot.forEach((doc)=>{
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
            tagline,
             Orders,
            count} = doc.data();
            if(category === "GraphicCards" && stock > 0 && type === "new")
            {
            list.push({
                name,
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
            tagline:tagline,
            Orders:Orders,
            count:count
            })
        }
    })
    
  
})
    this.setState({graphiccards:list})
    }
  render() {

       
         
        const {graphiccards} = this.state;
    const {addCart} = this.context;
 

  
    
    

    return(
    <div>
      <Header/>
      <h1 class="text-center"  style={{color:'red',fontWeight:'bold'}}>GRAPHIC CARDS</h1>
      <head>

   
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
    <main>
    <head>

   
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
          <Grid container justify="center" spacing={4}>
          {graphiccards.map((product) => (
 
          <Grid item key = {product.id} style={{alignItems:'center'}} xs={12} sm={6} md={4} lg={6}>
      
      <div>

   <head>

   
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
<div className="container">
    <div className="shop-default shop-cards shop-tech">
        <div className="row">
            <div className="col-md-6">
                <div className="block product no-border z-depth-2-top z-depth-2--hover">
               
                    <div className="block-image">
                   
                        <a href="#">
                            <img src={product.Image} className="img-center"/>
                        </a>
                    
                        <span className="product-ribbon product-ribbon-right product-ribbon--style-1 bg-blue text-uppercase">New</span>
                    </div>
                    
                    <div className="block-body text-center">
                    <Link to={`product/${product.id}`} style={{textDecoration: 'none'}}>
                        <h3 className="heading heading-5 strong-600 text-capitalize">
                            <a href="#">
                               {product.name}
                            </a>
                        </h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="product-colors mt-2">
                            <div className="color-switch float-wrapper">
                                <a href="#" className="bg-purple"></a>
                                <a href="#" className="bg-pink"></a>
                                <a href="#" className="bg-blue"></a>
                            </div>
                        
                        </div>
                        </Link>
                        <div className="product-buttons mt-4">
                            <div className="row align-items-center">
                                <div className="col-2">
                                    <button type="button" className="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Favorite">
                                        <i className="fa fa-heart"></i>
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare">
                                        <i class="fa fa-share"></i>
                                    </button>
                                </div>
                                <div className="col-8">
                                    <button type="button" onClick={()=> {addCart(product.id)}} className="btn btn-block btn-primary btn-circle btn-icon-left">
                                        <i className="fa fa-shopping-cart"></i>
                                    </button>
                                
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                       
    </div>
    
    </div>
    
            </div>
            
        </div>
        
  </div>
            </Grid>
            ))};
          </Grid>
         
        </main>
        <div style={{backgroundColor:'black'}}>
        <Footer />;
        </div>
  </div>

    );
          }
        }
      