import { useState, useContext, useReducer, useEffect } from 'react';
import { Button, Box, makeStyles } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash } from '@material-ui/icons';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/contex';
import { payUsingPaytm } from '../../service/api';
import { firest,auth } from '../../redux/actions/fr';
import { post } from '../../utils/paytm';
// import { initialState, reducer } from '../../reducers/reducer';
import { addToCart } from '../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';

const useStyle = makeStyles(theme => ({
    leftContainer: {
        minWidth: '40%',
        // textAlign: 'center',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px'
        }
    },
    
    productImage: {
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '95%',
       
    },
    button: {
        width: '46%',
        borderRadius: 2,
        height: 50
    },
    addToCart: {
        background: '#ff9f00',
        color: '#FFF'
    },
    buyNow:{
        background: '#fb641b',
        color: '#FFF'
    }
}));

const ActionItem = ({ product }) => {
    const classes = useStyle();
    const history = useHistory();
    const { account } = useContext(LoginContext);
    const { id, saleprice, Image, name } = product;    
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
const{addCart,cart} = useContext(LoginContext);
const [price, setPrice] = useState(0);
    const [pr,Setpr] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [cartid,SetCartid] = useState([]);
    const [InspectionPrice,SetInspectionPrice] = useState(0);
    const [TopBuyerDiscount,SetTopBuyerDiscount] = useState(0);
    const {total,getTotal,user,getInspection} = useContext(LoginContext);
    const [delivery,SetDelivery] = useState(0);
    const [finalprice,Setfinalprice] = useState(0);
    const [extremeprice,Setextremeprice] = useState(0);
    const [BuyerdisPrice,SetBuyerdisPrice] = useState(0);


const getInsectionPrice = async() => {
    
    var inm = 0;
await firest.collection('users').get().then((documentSnapshot)=>{
  documentSnapshot.forEach((doc)=>{
      const{InspectionChargesTotal,email} = doc.data();
     
      if(email === auth.currentUser.email)
      {
         
          
          inm = inm + InspectionChargesTotal;
          SetInspectionPrice(inm);
         
      }
  })
})
      
  }
      
  const getTopBuyerDiscount = async()=>{
    await firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot)=>{
        const{Orders} = documentSnapshot.data();
        if(Orders > 10)
        {
            firest.collection('users').doc(auth.currentUser.uid).set({
                discount: 0.2
            })
            firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot)=>{
                const{discount} = documentSnapshot.data();
                var dis = parseInt(discount);
                
                SetTopBuyerDiscount(dis);
            })
        }
    })
}

const totalAmount = () => {
    let price = 0, discount = 0;
    let pri = 0;
    
    cart.map(item => {
      
        var tu = parseInt(item.actualprice);
        price += tu
        var tm = parseInt(item.saleprice);
        pri += tm
       var disco = parseInt((item.actualprice - product.saleprice));
       discount += disco;
        
    })

    setPrice(price)
   
    Setpr(pri);
    setDiscount(discount);
   
    SetBuyerdisPrice(pr * TopBuyerDiscount)
    Setfinalprice(price - discount);
   
    SetDelivery(400);
    getInspection(InspectionPrice);
    let fina = parseInt(product.saleprice) 
    Setextremeprice(price + InspectionPrice + delivery)
   
   
    getTotal(extremeprice);
   
    
}




    const buyNow = async () => {
        
        const check = cart.every(item =>{
            return item.id != product.id
        })
        if(check)
        {
       addCart(product.id);
       if(cart)
       {
 let fina = parseInt(product.saleprice)
      getTotal(total + fina)
  
      
       history.push('/Checkout/')
        }
    }
        else
        {
            alert('Item exists in Cart already')
        }
    }

    const addItemToCart = () => {
      addCart(product.id)
    
        history.push('/cart');
    }
    useEffect(() => {
       
      
        cart.map(item => {
           
           SetCartid(item.id);
        })
 
      if(auth.currentUser)
      {
 
        getInsectionPrice();
        getTopBuyerDiscount();
        totalAmount();
      }
     }, [cartid,price,extremeprice,delivery,InspectionPrice,finalprice,TopBuyerDiscount,cart,total]);


    return (
        <Box className={classes.leftContainer}>
            <img src={product.Image} className={classes.productImage} /><br />
            <Button onClick={() => addItemToCart()} className={clsx(classes.button, classes.addToCart)} style={{marginRight: 10}} variant="contained"><Cart />Add to Cart</Button>
            <Button onClick={() => buyNow()} className={clsx(classes.button, classes.buyNow)} variant="contained"><Flash /> Buy Now</Button>
        </Box>
    )
}

export default ActionItem;