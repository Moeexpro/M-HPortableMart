import { InsertDriveFile } from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {LoginContext} from '../../context/contex';
import {firest,auth,storage} from '../../redux/actions/fr';
import { useHistory } from 'react-router';
 const  VendorForm = () => 
{
    const {user} = useContext(LoginContext);
    const [shopname,setshopname] = useState('');
    const [licenseNo,setLicenseNo] = useState('');
    const [phone,setphone] = useState('');
    const [id,setid] = useState('');
    const [imageprevie,setimageprevie] = useState('');
    const [image,setimage] = useState(null);
    const [filename,SetFilename] = useState("Vendors");
    const [transferred,settransferred] = useState(0);
    const [uploading,setuploading] = useState(false);
    const history = useHistory();
   
    const insertname = (e) =>
    {
setshopname(e.target.value);
    }
    const AddLicenseNo = (e) =>
    {
setLicenseNo(e.target.value);
    }

   const handleID = ()=>{
    var idm = "Shop" + Math.random().toString(16).slice(2);
    setid(idm);
   }
    const insertphone = (e) => 
    {
        setphone(e.target.value);
    }
    const handleImage = (e) => {
       
        let file = e.target.files[0]
        alert(file)
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setimageprevie(reader.result);
            setimage(file);
        }
      
    }
    const submitans = async() => 
    {
       
        if(auth.currentUser )
        {
            if(!shopname || !licenseNo   )
            {
                alert('Enter all Records or enter them according to the format')

            }
           
         
            else
            {
                const im = await  uploadImage();
                if(!im)
                {
                    
                }
                else
                {
        firest.collection('users').doc(auth.currentUser.uid).get().then((documentSnapshot) => {
            if(documentSnapshot.exists)
            {
               

               var idm = "Shop" + Math.random().toString(16).slice(2);
                const {email,username} = documentSnapshot.data();
                firest.collection('Vendors').add({
                    Name:shopname,
                    email:email,
                    LicenseNo:licenseNo,
                   
                    shopID:idm,
                    UserID: auth.currentUser.uid,
                    File:im,
                    Orders:0,
                    Sales:0,
                    Approved:false
                })
            
            }
        

        })
            
    
        alert("Submitted Vendor Form Successfully");
        history.push("/");
            }
    }
}
    else
    {
        alert("LogIn First to Fill Up the form")
    }

    }
    const uploadImage = async() => {
        {
            
            
            const uploadUri = image;
            
        if(!uploadUri)
        {
          alert('Upload Image to proceed')
        }
        else
        {
           setuploading(true)
            settransferred(0);
            const storageRef = storage.ref(`vendors/${Math.random().toString(16).slice(2)}`);
            const task = storageRef.put(uploadUri);
            task.on('state_changed', (taskSnapshot) => {
                console.log(
                  `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                );
          
                settransferred(
                  Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                    100
                );
                });
          
              try {
                
          await task;
                const url = await storageRef.getDownloadURL();
          
                setuploading(false)
          
                // Alert.alert(
                //   'Image uploaded!',
                //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
                // );
                return url;
          
              } catch (e) {
                console.log(e);
                return null;
              }
            }
        }
    }
    
    return (
        
        <form onSubmit={submitans} placeholder='Become Vendor'>
    <div className="container card-0 justify-content-center ">
       
    <div className="card-body px-sm-4 px-0">
        <div className="row justify-content-center mb-5">
            <div className="col-md-10 col">
                <h3 className="font-weight-bold ml-md-0 mx-auto text-center text-sm-left"> Vendor Form </h3>
                <p className="mt-md-4 ml-md-0 ml-2 text-center text-sm-left">Become a Vendor on our platform by filling the form below</p>
            </div>
        </div>
        
        <div className="row justify-content-center round">
            <div className="col-lg-10 col-md-12 ">
                <div className="card shadow-lg card-1">
                    <div className="card-body inner-card">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <div className="form-group"><label for="first-name">Shop Name</label><input type="text" value={shopname} onChange={insertname} className="form-control" id="first-name" placeholder="Type your Shop Name"/> </div>
                                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                                <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/jquery.inputmask.bundle.js"></script>
                                <div className="form-group"> <label for="nicnum">License Number (format: xxxxx-xxxxxxx-x):</label><br/>
  <input id="phonenum" onChange={AddLicenseNo} value={licenseNo} type="tel"pattern="^\d{5}-\d{7}-\d{1}$" required /> </div>
                                
                                <script>
    $(":input").inputmask();

   </script>
                               
                              
                            
                            <div className="col-lg-5 col-md-6 col-sm-12">
                               </div>
                              
                               
                                
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                                <div className="form-group files"><label className="my-auto">Upload Your Shop Document Image Here </label> <input id="file" onChange={handleImage} type="file" className="form-control" accept="image/x-png,image/gif,image/jpeg" /></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-10 col-12">
                               
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  
  
   </div>
   <div className="row justify-content-end mb-5">
   { uploading? (
            
            <h1>{transferred} % Completed!</h1>
            ):(
                <div className="col-lg-4 col-auto "><button className="btn btn-primary btn-lg btn-block" type="submit"   onClick={()=>{submitans
                    ()}}>Become Vendor</button></div>
            )}
   </div>


   
                           </form>   
              
            
            
 
);
}
export default VendorForm;