import React, { useContext, useState,useEffect} from 'react';

import VendorBanner from '../../component/partials/vendor/VendorBanner'
import VendorAbout from '../../component/partials/vendor/VendorAbout';
import VendorMileStone from '../../component/partials/vendor/VendorMileStone';
import VendorBestFees from '../../component/partials/vendor/VendorBestFees';
import VendorTestimonials from '../../component/partials/vendor/VendorTestimonials';
import VendorFaqs from '../../component/partials/vendor/VendorFaqs';
import {firest,auth} from '../../redux/actions/fr'
import { useHistory } from 'react-router';
import Newsletters from '../../component/partials/commons/Newletters';
import Vendorform from './vendorform';
import {LoginContext} from '../../context/contex';
import BreadCrumb from '../../component/elements/BreadCrumb';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from '../../Components/Footer/footer';

const BecomeAVendorPage = () => {
    
    const [data,setdata] = useState([]);
    const history = useHistory();
    const {user,account} = useContext(LoginContext);
    const [alertpresent,SetAlert] = useState(false)
    const getVendorDetails = async() => {
    await firest.collection('Vendors').get().then((documentSnapshot) => {
            documentSnapshot.forEach((doc) => {
                const {email,UserID,Approved} = doc.data();
                if(UserID === auth.currentUser.uid)
                {
                    
                    setdata({...doc.data()})
                   
                }
            })
        })
    }

    const generateForm = () => {
       
      if(auth.currentUser)
      {
        if(data.UserID === auth.currentUser.uid && data.Approved === false )
        {
           
            return(
                <div>
                <h1>Vendor Request Already Sent</h1>
                </div>
            )
        }
        if(data.UserID === auth.currentUser.uid && data.Approved === true )
        {
            return(
                <h1>Congrats!, You Are a Vendor</h1>
            )
        }
        else
        {
            return(
                <Vendorform/>
            )
        }
    }
    
    
}
    useEffect(() => {
        if(auth.currentUser)
        {
     getVendorDetails();
        }
        else
        {
            history.push('/')
            alert('Log in first');
           
        }
        
    }, [data.UserID]);

    return (
       
            <div className="ps-page--single">
               <head>

   
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
</head>
         
                
                
                    
                {generateForm()}
                <VendorAbout />
               
               
                <div style={{backgroundColor:'black'}}>
        <Footer />;
        </div>
    
    
            </div>
           
    );
};

export default BecomeAVendorPage;
