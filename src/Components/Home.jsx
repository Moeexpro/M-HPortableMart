import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';
import React,  { useEffect, useState } from 'react';
import {firest,auth} from '../redux/actions/fr';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Components/Footer/footer';
const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () => {
    const classes = useStyle();
    const [used,setUsed] = useState([]);
    const [discounted,setDiscounted] = useState([]);
    const [latest,setlatest] = useState([]);
    const [topvendorproducts,SetTopVendorProducts] = useState([]);
    const [top,settop] = useState([]);
    const [deals,setDeals] = useState([]);
    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;

    const dispatch = useDispatch();


    

const GetUsedItems = async() => 
{
    try
    {
    
    
    const list = [];
await  firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
           const st = parseInt(stock)
            if(tagline === "Used Items" && type === "Used" &&  st > 0)
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
  setUsed(list);
}
catch (error) {
    console.log('error')

}
}

const GetTopVendorProducts = async() => 
{

   try
   {
    
    
    const li = [];
await firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
          } = doc.data();
           const st = parseInt(stock)
           firest.collection('Vendors').get().then((DocumentSnapshot)=>{
               DocumentSnapshot.forEach((doc)=>{
                   const {Name,Orders} = doc.data();
                   if(Name === vendor  &&  st > 0 && Orders >=10 )
                   {
                   li.push({
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
                   Orders:Orders
                  
                   })
                }
               })
            
           })
        
      })
     
  })
  SetTopVendorProducts(li);
}
  catch (error)
  {
     console.log('error')
  }

}




const GetDiscountedItems = async() => 
{
    try
    {
   
    const list = [];
 await firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
           const st = parseInt(stock);
            if(tagline === "Discounts For You" && discount > 0 && st > 0)
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
  setDiscounted(list);
}
catch (error) {
    console.log('error')

}
}


const GetLatestItems = async() => 
{
    try
    {
   
    const list = [];
 await firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
           const st = parseInt(stock)
            if(tagline === "New Arrivals" && type === "new" && st > 0)
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
  setlatest(list);
}
catch (error)
 {
    console.log('error')
 }
}
const GetTopItems = async() => 
{
    
    try
    {
   
    const list = [];
 await firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
            const st = parseInt(stock);
            if(tagline === "Top Selection" && type === "new"  && st > 0)
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
  settop(list);
}




catch (error) {
    console.log('error')

}
}

const GetDeals = async() => 
{
    try
    {
   
    const list = [];
 await firest.collection('Products').get().then((DocumentSnapshot) => {
      DocumentSnapshot.forEach((doc) => {
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
            const dif = actualprice - saleprice
           const st = parseInt(stock)
            if(tagline === "Deals of the Day" && type === "new" && dif > 2000 && st > 0)
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
  setDeals(list);
}




catch (error) {
    console.log('error')
}
}

    useEffect(() => {
     
       
     GetTopVendorProducts();
        GetUsedItems()
      
        GetDiscountedItems()
        GetLatestItems()
       
    },[])

    return (
        <>
            <NavBar />
            
            <Box className={classes.component}>
            <head>

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427919207889091"
     crossorigin="anonymous"></script>
     
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
                <Banner />
               
               
                <Slide
                    data={discounted} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={used} 
                    title='Used Items'
                    timer={false} 
                    multi={true} 
                />
               
                
                <Slide
                    data={latest}
                    title='New Arrivals'
                    timer={false} 
                    multi={true}
                />

<Slide
                    data={topvendorproducts}
                    title='Top Vendors Products'
                   multi = {true}
                    
                />


           </Box>
           <div style={{backgroundColor:"black"}}>
            <Footer />;
            </div>
            
        </>
        
    )
}

export default Home;