import { Box, Typography, makeStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { LocalOffer as Badge } from '@material-ui/icons';
import {auth,firest,storage} from '../../redux/actions/fr';
import {LoginContext} from '../../context/contex'
import { useContext, useEffect, useState } from 'react';
import InspectionForm from '../../pages/vendors/inspectionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import Footer from '../Footer/footer';
import 'react-quill/dist/quill.snow.css'
import './produc.css'

const useStyle = makeStyles({
    smallText: {
        fontSize: 14,
        verticalAlign: 'baseline',
        '& > *' :{
            fontSize: 14,
            marginTop: 10
        }
    },
    greyTextColor: {
        color: '#878787'
    },
    badge: {
        marginRight: 10,
        color: '#00CC00',
        fontSize: 15
    },
    wrapper: {
        display: 'flex'
    }
});

const ProductDetail = ({ product }) => {
    const classes = useStyle();
    const {user} = useContext(LoginContext);
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime()+(5*24*60*60*1000));
    
    return (
        <>
            <Typography>Available offers</Typography>
            <Box className={classes.smallText}>
           
            </Box>
            <Table>
                <TableBody>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextColor}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | Rs400</TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextColor}>Stock</TableCell>
                        <TableCell >{product.stock}</TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextColor}>Shop Name</TableCell>
                        <TableCell>{product.vendor}</TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextColor}>Seller</TableCell>
                        <TableCell className={classes.smallText}>
                            <span style={{ color: '#2874f0' }}>{product.vendor}</span>
                            <Typography>GST invoice available</Typography>
                           
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                        <div className="img-wrapper">
        <img
            src={product.Image}
            alt=""
            className="hover-zoom"
            style={{width:390}}
            
        />
    </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextColor}>Description</TableCell>
                        <TableCell>
                            
                        <ReactQuill className="description" value={product.description} theme={"bubble"}  id="description"  />
                           </TableCell>
                    </TableRow>
                </TableBody>
            
            </Table>
           
        </>
    )
}

export default ProductDetail;