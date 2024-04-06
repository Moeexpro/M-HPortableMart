
import React, { Component } from 'react';



import InspectorCard from './InspectorCard';


import { firest } from '../../redux/actions/fr';



class Inspectors extends Component {
    state = {
        show: 'card',
        loading : true,
        inspectors : [],
        
        comfirm_delete : true,
        top : '100px',
        search : ''
    }


    componentDidMount(){
        this.fetchInspectors()
       
      

       
    }

   
   
 

    fetchInspectors = async() => {
        const list = [];
     await   firest.collection('Inspectors').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc=>{
                const {InspectorName,Inspections,InspectionSales,Category,InspectionPrice,Experience} = doc.data();
                    list.push({
                       InspectorName:InspectorName,
                       Category:Category,
                       InspectionSales:InspectionSales,
                       Inspections:Inspections,
                       InspectionPrice:InspectionPrice,
                       Experience:Experience
                    })
            })
        })
        this.setState({inspectors:list})
        
    }

   
  

    render() {
        const { top, loading, inspectors, show, categories, subcategories, sub_category_id,  message } = this.state
        return (
            <div className="products">
              

            

                  
                  

                    <span style={{fontSize:30,alignContent:'center'}}>Our Inspectors</span>

                   

                

                        

                      

                   <div className={show}>{ inspectors.map(num=> <div key={num} className="loading-list"><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products
                                inspectors.length === 0 ? <span style={{color: "red"}}>Empty</span> :
                            inspectors.map(inspector=> <InspectorCard  inspector={inspector} /> )
                            }
                        </div>
                    

                </div>
           
        );
    }
}


export default Inspectors;
