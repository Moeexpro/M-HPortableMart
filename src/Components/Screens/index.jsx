import React, { Component } from 'react';
import './products.scss'

import { Link } from 'react-router-dom'
import _ from 'lodash'

import Product from './Product'
import Header from '../Header/Header';
import VendorC from './VendorC';
import AddProduct from './AddProduct';
import { firest,auth } from '../../redux/actions/fr';
import { LoginContext } from '../../context/contex';

class index extends Component {

static contextType = LoginContext;

    state = {
        show: 'card',
        loading : true,
        products : [],
        vendors: [],
        categories : [],
        vendoruid:'',
        top : '100px',
        search : ''
    }


    componentDidMount(){
        
        this.fetchProducts()
        this.fetchVendor()
        let category = localStorage.getItem('categories')
    
        if(_.isString(category)){
            let categories = JSON.parse(category)
            if(_.isArray(categories))
                this.setState({ categories, loading: false })
        }
        this.fetchCategories()

        window.addEventListener('scroll', ()=>{
            let scroll =  window.scrollY
            if( scroll>0 ) {
                this.setState({ top: '65px' })
            } else {
                this.setState({ top: '100px' })
            }
        })
    }

    fetchCategories = () => {
        const list = [];
       firest.collection('Categories').get().then((documentSnapshot => {
           documentSnapshot.forEach((doc) => {
            
               const {Name} = doc.data();
               list.push({Name:Name})
           })
       }))
       this.setState({categories:list});
    }
    

    fetchProducts = async() => {
        const list = [];
        const shopname = [];
        const {user} = this.context;
     await   firest.collection('Products').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
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
                Orders} = doc.data();
                firest.collection('Vendors').get().then((documentSnapshot)=>{
                    documentSnapshot.forEach((doc)=>{
                    const {Name,UserID} = doc.data();
                    if(Name === vendor && auth.currentUser.uid === UserID)
                    {
                        list.push({
                            name:name,
                            Name:Name,
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
                            Orders
                        })
                       
                    }
                   
                    this.setState({products:list});
                    })
                })
              
                    
            })
        })
      
       
    }

   fetchVendor = async() =>{
    const vendorsi = [];
    const shopname = [];
    const {user} = this.context;
 await   firest.collection('Products').get().then(documentSnapshot => {
        documentSnapshot.forEach(doc=>{
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
            firest.collection('Vendors').get().then((documentSnapshot)=>{
                documentSnapshot.forEach((doc)=>{
                const {Name,UserID,Sales,Orders,email,phone} = doc.data();
                if(Name === vendor && auth.currentUser.uid === UserID)
                {
                    vendorsi.push({
                        
                        Name:Name,
                        Sales:Sales,
                        Orders:Orders,
                        email:email,
                        phone:phone
                       
                    })
                  
                   
                }
                
               
                this.setState({vendors:vendorsi})
                })
            })
          
                
        })
    })
  

   
   
   }
    
    

    render() {
        const { top, loading, products, show, vendors,categories, subcategories, sub_category_id, vendoruid, message } = this.state
        const {user} = this.context
       if(auth.currentUser)
       {
        return (
            
            <div className="products">
                <Header />
                <span style={{fontSize:30,fontWeight:'bold'}}>Vendor Dashboard</span>

                <div className="wrapper">

                <span style={{fontSize:20,fontWeight:'bold'}}>My Sales</span>
                
                <div className={show}>{ vendors.map(num=> <div key={num} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list vendor
                                vendors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                vendors.map(vendor=> <VendorC  vendor={vendor} /> )
                            }
                        </div>

                    <span style={{fontSize:20,fontWeight:'bold'}}>My Products</span>
                    <div className="show">
                        <div className={ show === 'card' ? 'active' : '' } onClick={()=> this.setState({ show: 'card' })}>
                            <span>cards</span>
                        </div>
                        <div className={ show === 'table' ? 'active' : '' }  onClick={()=> this.setState({ show: 'table' })} >
                            <span>table</span>
                        </div>
                    </div>

                  
                   

                    <div className={show}>{ products.map(num=> <div key={num} ><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                products.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                                products.map(product=> <Product key={product.id} product={product} /> )
                            }
                        </div>
                    <div>
<AddProduct/>
                    </div>

                </div>
           </div>
        );
                        }
                        else
                        {
                            this.props.history.push('/')
                            alert('Log in as a Vendor')
                            window.location.reload('false')
                            
                        }
    }

  


}



export default index;
