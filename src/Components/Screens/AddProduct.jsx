import React, { Component } from 'react';
import './addproduct.scss'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'

import { connect } from 'react-redux'
import _ from 'lodash'
import { auth,storage,firest } from '../../redux/actions/fr';




class AddProduct extends Component {
    state = {
        categories: [],
       category: '',
        imagePreview : '',
        message : '',
        messageadd: '',
      name: '',
      code: '',
uploading: false,
transferred: 0,
       vid:'',
        vendor: '',
        tagline: '',
      type:'',
        stock: 0,
        description: '',
        success: false,
        loading: false,
        actualprice: '',
        saleprice: '',
        discount: '',
          description: '',
          file: null,
          imagePreview: '',
          filename:''
    }

    fetchVendor = async() =>{
       if(auth.currentUser.uid)
       {
        
        await firest.collection('Vendors').get().then(documentSnapshot => {
             documentSnapshot.forEach(doc => {
                 const {Name,Approved,email,UserID} = doc.data();
                 if(Approved === true && UserID === auth.currentUser.uid )
                 {
this.setState({vendor:Name})

                 
                 
                 }
                 
             })
             
     })
    }
    }
    componentDidMount(){
        const list = []
          firest.collection('Categories').get().then(documentSnap => {
            documentSnap.forEach(doc => {
               
                const {Name} = doc.data();
                list.push({Name:Name})
                
            })
            this.setState({categories:list})
        })
        var id = "Product" + Math.random().toString(16).slice(2)
        this.setState({
            code:id
        })
     this.fetchVendor();
        
    }

    selectCategory = (e) => {
        this.setState({
            category : e.target.value
        })

       
       

       
    }

    selectType = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    

        selectTagline = (e) => {
            this.setState({
                tagline: e.target.value
            })
        }
    

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreview: reader.result
            })
        }
    }


handlestock = (e) => {
    this.setState({
        stock: e.target.value
    })
}

getDiscount = ()=>{
    const {actualprice,saleprice} = this.state;
    this.setState({discount:(actualprice-saleprice)/actualprice*100})
}

    handleSubmit = async(e) => {
        e.preventDefault()
        const { imagePreview, file,category, name, code,stock, actualprice,  description, vendor, type, tagline,saleprice,discount,transferred,uploading} = this.state
        
        
        

      
        if(imagePreview && name && code && category  && actualprice && stock && description && type && tagline && saleprice <= actualprice && discount >= 0 ) {
            if(!vendor)
            {
             alert('You are not a Vendor')
            }
            else
            {
            this.setState({ loading: true })
           const imageurl = await this.uploadImage();
           console.log(imageurl)
           console.log(name)
           const st = parseInt(stock);
           await firest.collection('Products').get().then((documentSnapshot)=>{
               
                firest.collection('Products').add({
                    name:name,
                    id:code,
                    category:category,
                    vendor:vendor,
                    actualprice:actualprice,
                    saleprice:saleprice,
                    discount:discount,
                    stock:st,
                    description:description,
                    type:type,
                    Image:imageurl,
                    tagline: tagline,
                    Orders:0,
                    count:1
                }).then(() => {
                    console.log('Post Added!');
                    alert(
                      'Product published!',
                      'Your product has been published Successfully!',
                    );
                    
                   
                  })
               
         
                   
                
              
            
            
            })
           }
        }
        
    else
    {
        alert("Enter All Records or records entered are incorrect");
    }

        
               
            
        
        
    }

    handlecode = ()=>{
        var id = "Product" + Math.random().toString(16).slice(2)
           this.setState({
               code:id
           })
       }

    uploadImage = async() => 
    {
        
       
        const {imagePreview,file,code} = this.state;
        console.log(file);
       
        const uploadUri = file;
      
        this.setState({uploading:true});
        this.setState({transferred:0});
        const storageRef = storage.ref(`products/${code}`);
        const task = storageRef.put(uploadUri);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
              `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            this.setState({transferred:(
              Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100
            )});
          });
      
          try {
            
      await task;
            const url = await storageRef.getDownloadURL();
      
            this.setState({uploading:false})
            
      
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
    render() {
        const { categories, subcategories, loading, imagePreview, allsize, allstock, name, code, size, stock, category_id, sub_category_id,actualprice,saleprice,discount, weight, description, message, messageadd, success, type,category, vendor, tagline,uploading,transferred} = this.state
        return (
            <div className="add-wrapper">
               
                
               
                <div className="add-product">
                    <h1>Add Product</h1>
                   

                    <div className="photo">
                        <div className="image">
                            { imagePreview ? <img src={imagePreview} alt="imagePreview"/> : <div></div> } 
                        </div>
                        <label htmlFor="photo">Image  <i className="demo-icon icon-picture">&#xe812;</i></label><br/>
                        <input onChange={this.handleImage} id="photo" type="file" accept="image/x-png,image/gif,image/jpeg"/>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="">Name</label>
                        <input value={name} onChange={this.handleChange} name="name" type="text"/>
                        <label htmlFor="">Code</label>
                        <input value={code}  name="code" type="text"/>
                        <label htmlFor="">Stock</label>
                        <input value={stock} onChange={this.handlestock} name="stock" type="number"/>
                        <label htmlFor="">Category</label>
                        <select value={category} onChange={this.selectCategory} name="category" id="category">
                            <option value="">select</option>
                            {
                                categories.map(categor=>{
                                    return(
                                        <option  >{categor.Name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Shop Name</label>
                        <input value={vendor} type ="text"/>

                        <label htmlFor="">Select Tagline</label>
                        <select value={tagline} onChange={this.selectTagline} name="tagline_id" id="tagline">
                        <option value="">select</option>
                           
                            <option >New Arrivals</option>
                            <option >Used Items</option>
                         
                            <option >Discounts For You</option>
                           
                        </select>
                        
                        <label htmlFor="">Select Type(Used,ne);</label>
                        <select value={type} onChange={this.selectType} name="type_id" id="type">
                        <option value="">select</option>
                            <option >Used</option>
                            <option >new</option>
                        </select>


                        <label htmlFor="">ActualPrice</label>
                        <input value={actualprice} placeholder="Rp" onChange={this.handleChange} name="actualprice" type="text"/>
                       
                        <label htmlFor="">SalePrice</label>
                        <input value={saleprice} placeholder="Rp" onChange={this.handleChange} name="saleprice" type="text"/>

                        <label htmlFor="">Discount</label>
                        <input value={discount} placeholder="Rp" onMouseOver={this.getDiscount} name="discount" type="text"/>
                        <label htmlFor="description">Description</label>

                        <ReactQuill className="description" value={description} onChange={ (value)=>this.setState({ description: value }) } id="description"  />

                        <span className="message">{message}</span>
                        { uploading? (
            
              <h1>{transferred} % Completed!</h1>
              ):(
                        <button type="submit" onClick={this.handleSubmit}>Save</button>
              )}
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        categories : state.categoriesReducer,
        user : state.userReducer
    })
}

export default AddProduct;