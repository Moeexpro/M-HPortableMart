import { InsertDriveFile } from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {LoginContext} from '../../context/contex';
import {firest,auth,storage} from '../../redux/actions/fr';
import { useHistory } from 'react-router';
 const InspectionForm = ({product}) => 
{
    const {user} = useContext(LoginContext);
    const [shopname,setshopname] = useState('');
    const [InspectorN,SetInspectorName] = useState('');
    const [InspectorNames,SetInspectorNames] = useState([]);
    const [InspectExp,SetInspectExp] = useState('');
    const [InspectionPri,SetInspectionPri] = useState(0);
    const [phone,setphone] = useState('');
    const [id,setid] = useState('');
    const [image,setimage] = useState('');
  const [UserN,SetUserName] = useState('');
    const [ph,setph] = useState('');
    const [emai,setemail] = useState('');
    const [inspections,setinspections] = useState(0);
    const history = useHistory();

    const getuseremail = async() =>
    {
       
      
                
                
                
            
           
       

    }
    const insertname = (e) =>
    {
setshopname(e.target.value);
    }

    const GetInspectorName = (e) =>
    {
SetInspectorName(e.target.value);

alert(InspectorN);
 
    }

    const GetInspectionPrice = async(name) =>
    {
    if(InspectorN)
    {
        await firest.collection('Inspectors').get().then((documentSnapShot)=>{
            documentSnapShot.forEach((doc)=>{
                const {InspectorName,InspectionPrice} = doc.data();
               
                if(InspectorName === name)
                {
                SetInspectionPri(InspectionPrice + 500);

                }
            })
        })
    }
    }

    const GetLevel = async(name) =>
    {
        
            await firest.collection('Inspectors').get().then((documentSnapShot)=>{
                documentSnapShot.forEach((doc)=>{
                    const {InspectorName,InspectionPrice,Experience} = doc.data();
                    if(InspectorName === name)
                    {

                    SetInspectExp(Experience);
                    }
                })
            })
        
    }

   
    const insertphone = (e) => 
    {
        setphone(e.target.value);
    }

    const submit = async() => 
    {
       if(auth.currentUser  )
       {
           if(!InspectorN && !InspectionPri && !InspectExp)
           {
               alert('Enter all Records');
           }
           else
           {
            var id = "inspection" + Math.random().toString(16).slice(2)
                firest.collection('Inspections').add({
                    InspectionID:id,
                    ProductId:product.id,
                    category:product.category,
                    Shop:product.vendor,
                    ProductImage:product.Image,
                    ProductName:product.name,
                    userid:auth.currentUser.uid,
                    email:emai,
                  
                    username:UserN,
                    InspectionPrice:InspectionPri,
                    InspectionFile:"",
                    InspectorName:InspectorN,
                    InspectorLevel:InspectExp,
                    UploadedFile:false
                   
    
              
            
                
            })

await firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapShot)=>{
    const {Inspections,InspectionChargesTotal} = documentSnapShot.data();
    firest.collection('users').doc(auth.currentUser.uid).update({
        Inspections:Inspections + 1,
        InspectionChargesTotal:InspectionChargesTotal + InspectionPri
    })
})

           
           alert("Inspection Requested Successfully ")
            history.push("/");
        }
       }
    else
    {
        alert("LogIn First to Fill Up the form")
    }
    
    }
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
        if(user)
        {
             firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapShot)=>{
                const {email,username,phone} = documentSnapShot.data();
                setemail(email);
                SetUserName(username);
                setphone(phone);
            })
              const li = [];
            firest.collection('Inspectors').get().then((documentSnapShot=>{
                documentSnapShot.forEach((doc)=>{
                    const{InspectorName,Category} = doc.data();
                    if(Category === product.category)
                    {

                li.push({Name:InspectorName})
                    }

                })
                SetInspectorNames(li);
            }))
            
        
        }
    })
        
    },[UserN,emai])
    return (
    <div className="container card-0 justify-content-center ">
    <div className="card-body px-sm-4 px-0">
        <div className="row justify-content-center mb-5">
            <div className="col-md-10 col">
                <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Inspection Form </h3>
                <p className="mt-md-4 ml-md-0 ml-2 text-center text-sm-left"></p>
            </div>
        </div>
        
        <div className="row justify-content-center round">
            <div className="col-lg-10 col-md-12 ">
                <div className="card shadow-lg card-1">
                    <div className="card-body inner-card">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <div className="form-group"><label for="first-name">First Name</label><input type="text" value={UserN} onChange={insertname} className="form-control" id="first-name" placeholder="Type your Name"/> </div>
                               
                                <div className="form-group"> <label for="Mobile-Number">Select Inspector</label>  <select value={InspectorN} onChange={GetInspectorName} name="category" id="category">
                            <option value="">select</option>
                            {
                                InspectorNames.map(categor=>{
                                    return(
                                        <option  >{categor.Name}</option>
                                    )
                                })
                            }
                        </select> </div>
                        
                        <div className="form-group"> <label for="Mobile-Number">Inspector Level</label> <input type="text" value={InspectExp} onLoad={GetLevel(InspectorN)}  className="form-control" id="Mobile-Number" placeholder=""/> </div>
                        <div className="form-group"> <label for="Mobile-Number">Inspection Price</label> <input type="text" value={InspectionPri} onLoad={GetInspectionPrice(InspectorN)} className="form-control" id="Mobile-Number" placeholder=""/> </div>
                            
                            <div className="col-lg-5 col-md-6 col-sm-12">
                               </div>
                              
                                
                                
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                               
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                               
                                <div className="row justify-content-end mb-5">
                                    <div className="col-lg-4 col-auto "><button type="button" onClick={()=>{submit()}} className="btn btn-primary btn-block"><small className="font-weight-bold">Request Inspection</small></button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
   </div>

);
}
export default InspectionForm;