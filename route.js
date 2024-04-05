import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Home, NotFound } from './Components/default';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import  loadbecomeavendor from './pages/vendors/become-a-vendor'
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import { Box } from '@material-ui/core'
import {LoginContext} from './context/contex'
import BecomeAVendorPage from './pages/vendors/become-a-vendor';
import {firest,auth} from '../src/redux/actions/fr'
import Cards from './Components/Screens/GraphicCards';
import Laptop from './Components/Screens/Laptops';
import UsedItem from './Components/Screens/Useditems';
import SmartPhone from './Components/Screens/SmartPhones';
import CHeckout from './Components/Cart/Checkout';
import index from './Components/Screens';
import Confirmation from './Components/Screens/OrderConfirm';
import Inspectors from './Components/Screens/Inspectors';
import TopVendors from './Components/Screens/TopVendors';
import Orders from './Components/Screens/Orders';
import './App.css'

const Rout = () =>
{
     
return(
    <BrowserRouter>
    <Header />
    <Box style={{marginTop: 54}}>
      <Switch>
        <Route exact path= '/' component={Home} />
        <Route exact path= '/cart' component={Cart} />
        <Route exact path = '/BeVendor' component={BecomeAVendorPage}/>
       <Route exact path = "/Graphic/" component={Cards}/>
       <Route exact path = "/Laptops/" component={Laptop}/>
       <Route exact path = "/SmartPhones/" component={SmartPhone}/>
       <Route exact path = "/UsedItems/" component={UsedItem}/>
       <Route exact path = "/Products/" component={index}/>
       <Route exact path = "/Inspectors/" component={Inspectors}/>
       <Route exact path = "/Vendors/" component={TopVendors}/>
       <Route exact path = "/Orders/" component={Orders}/>
       <Route exact path = "/OrderC/" component={Confirmation}/>
       <Route exact path = "/Checkout/" component={CHeckout}/>

        {/* <Route exact path= '/product/:id' component={Product} /> */}
        <Route exact path= '/product/:id' component={DetailView} />
        <Route component={NotFound} />
      </Switch>
    </Box>
    <a
        href="https://wa.me/923018640027"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa fa-whatsapp whatsapp-icon"></i>
      </a>
  </BrowserRouter>
);
}
export default Rout;