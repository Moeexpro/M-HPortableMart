import { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LoginContext } from '../../context/contex';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/footer';
import { firest,auth } from '../../redux/actions/fr';
import { useStore } from 'react-redux';
const useStyle = makeStyles({
    component: {
        // width: '30%'
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    greyTextColor: {
        color: '#878787'
    },
    container: {
        '& > *': {
            marginBottom: 20,
            fontSize: 14
        }
    },
    price: {
        float: 'right'
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 600,
        borderTop: '1px dashed #e0e0e0',
        padding: '20px 0',
        borderBottom: '1px dashed #e0e0e0'
    }
})


const TotalView = ({ cartItems }) => {
    const classes = useStyle();
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
    useEffect(() => {
       totalAmount();
      
       cartItems.map(item => {
          
          SetCartid(item.id);
       })

     if(auth.currentUser)
     {

       getInsectionPrice();
       getTopBuyerDiscount();
     }
      
    }, [cartid,price,extremeprice,delivery,InspectionPrice,finalprice,TopBuyerDiscount,cartItems,total]);
    
    const totalAmount = () => {
        
        let price = 0, discount = 0;
        let pri = 0;
        console.log(cartItems);
        cartItems.map(item => {
            var tu = parseInt(item.actualprice);
            price += tu
            var tm = parseInt(item.saleprice);
            pri += tm
           var disco = parseInt((item.actualprice - item.saleprice));
           discount += disco;
        })

        setPrice(price);
        Setpr(pri);
        setDiscount(discount);
        SetBuyerdisPrice(pr * TopBuyerDiscount)
        Setfinalprice(price - discount);
        SetDelivery(400);
        Setextremeprice(finalprice + InspectionPrice + delivery - BuyerdisPrice)
        getInspection(InspectionPrice);
        getTotal(extremeprice);
        
    }

    return (
        <Box className={classes.component}>
            <head>

   
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
         
            <Box className={classes.header} style={{borderBottom: '1px solid #f0f0f0'}}>
                <Typography className={classes.greyTextColor}>PRICE DETAILS</Typography>
            </Box>
            <Box className={clsx(classes.header, classes.container)}>
                <Typography><span className={classes.price}>Rs{price}</span></Typography>
                <Typography>Discount<span className={classes.price}>Rs{discount}</span></Typography>
                <Typography>Delivery Charges<span className={classes.price}>Rs{delivery}</span></Typography>
                <Typography>Top Buyer Discount<span className={classes.price}>Rs{TopBuyerDiscount}</span></Typography>
                <Typography>Inspection Charges<span className={classes.price}>{InspectionPrice}</span></Typography>
                <Typography className={classes.totalAmount}>Total Amount<span className={classes.price}>Rs{total}</span></Typography>
                <Typography style={{fontSize: 16, color: 'green'}}>You will save Rs{discount} on this order</Typography>
                <Typography style={{fontSize: 16, color: 'blue'}}>You will save Rs{BuyerdisPrice} on this order for being a Top Buyer</Typography>
            </Box>
           
        </Box>
    )
}

export default TotalView;