import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Home, NotFound } from './Components/default';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import { ContextProvider } from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import { Box } from '@material-ui/core'
import {LoginContext} from './context/contex'
import BecomeAVendorPage from './pages/vendors/become-a-vendor';
import {firest,auth} from '../src/redux/actions/fr'
import Rout from './route';
import Cards from './Components/Screens/GraphicCards';
function App() {
  
  return (
    <ContextProvider>
      
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
    <TemplateProvider>
      
        <Rout/>
       
        
    </TemplateProvider>
    </ContextProvider>
   
  );
}

export default App;
