import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Product extends Component {

    render() {
        const { product } = this.props
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `product/${product.id}` , state: product }}>
            <div className="product">
                <div className="photo">
                  
                    <div>Product Image</div>
                       <img src={product.Image} style={{objectFit:'cover',float:'left',height:200,width:200}}/>
                    
                </div>
                <div className="name">
                <div>Product Name</div>
                    <span>{product.name}</span>
                </div>
                <div className="name">
                <div>Product Category</div>
                    <span>{product.category}</span>
                </div>
                <div className="name">
                <div>Product Type</div>
                    <span>{product.type}</span>
                </div>
                <div className="name">
                <div>Product Orders</div>
                    <span>{product.Orders}</span>
                </div>
                <div className="name">
                <div>Product Stock</div>
                    <span>{product.stock}</span>
                </div>
                <div className="code">
                    <div>Product ID</div>
                    <span>{product.id}</span>
                </div>
                <div className="price">
                    <div>Actual Price</div> <span>Rs {product.actualprice}</span>
                </div>
                <div className="price">
                    <div>Sale Price</div> <span>Rs {product.saleprice}</span>
                </div>
                <div className="code">
                    <div>Shop Name</div>
                    <span>{product.vendor}</span>
                </div>
            </div>
            </Link>
        );
    }
}

export default Product;