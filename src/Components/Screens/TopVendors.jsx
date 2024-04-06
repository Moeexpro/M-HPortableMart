import React, { Component } from 'react';



import VendorCard from './VendorCard';


import { firest } from '../../redux/actions/fr';



class TopVendors extends Component {
    state = {
        show: 'card',
        loading : true,
        vendors : [],
        apidata:[],
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
      
       
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
    
            this.setState({apidata:data})
            console.log(data)});
      
this.fetchTopVendors()
       
    }

   
   
 
fetchAPIDATA = () => {
    
}


    fetchTopVendors = async() => {
        const list = [];
     await   firest.collection('Vendors').get().then(documentSnapshot => {
         
            documentSnapshot.forEach(doc=>{
                const {Name,Sales,Orders,email} = doc.data();
                if(Orders >= 10)
                {
                    list.push({
                       Name:Name,
                       Orders:Orders,
                       Sales:Sales,
                       email:email
                    })
                }
            })
        
        })
    
        this.setState({vendors:list})
       
    }

   
  

    render() {
        const { top, loading, vendors, show, categories, subcategories, sub_category_id,  message,apidata} = this.state
        return (
            <div className="products">
              
<div>

</div>   
                  

                    <span style={{fontSize:30,alignContent:'center'}}>Our Top Vendors</span>

                   

                

                        

                      

                   <div className={show}>{ vendors.map(num=> <div key={num} className="loading-list"><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all vendors
                                vendors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                            vendors.map(vendor=> <VendorCard  vendor={vendor} /> )
                            }
                        </div>
                    

                </div>
           
        );
    }
}


export default TopVendors;
