import { useState, useEffect, useContext } from 'react';
import { Box, Typography, makeStyles, CircularProgress, Button, Grid } from '@material-ui/core';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/actions/productActions';
import InspectionForm from '../../pages/vendors/inspectionForm';
import { auth, firest, storage } from '../../redux/actions/fr';
import { LoginContext } from '../../context/contex'
import ReviewForm from '../Reviews/Reviewform'
import ReviewData from '../Reviews/ReviewData';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/footer';
import './produc.css'

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2'
    },
    container: {
        background: '#FFFFFF',
        // margin: '0 80px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));

const data = {
    id: '',
    url: '',
    detailUrl: '',
    title: {
        shortTitle: '',
        longTitle: '',
    },
    price: {
        mrp: 0,
        cost: 0,
        discount: ''
    },
    description: '',
    discount: '',
    tagline: ''
};

const DetailView = ({ history, match }) => {
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    // const [ product, setProduct ] = useState(data);
    // const [ loading, setLoading ] = useState(false);
    // const { id } = useParams();

    // const [ quantity, setQuantity ] = useState(1);



    const [email, setemail] = useState('');
    const [userid, setuserid] = useState('');
    const [idp, setidp] = useState('');
    const [file, setfile] = useState('');
    const [uploaded, setuploaded] = useState(false);
    const [status, Setstatus] = useState([]);
    const [detail,SetDetail] = useState([])
    const [emai, SetEmail] = useState([]);
    const [pid, Setpid] = useState('');
    const [data, Setdata] = useState([]);
    const [Dat, SetDat] = useState([])
    const { user } = useContext(LoginContext);

    const [product, SetProduct] = useState([]);

    const dispatch = useDispatch();







    const getProduct = async (idl) => {




        await firest.collection('Products').get().then(documentSnapshot => {
            documentSnapshot.forEach(doc => {
                const { name,
                    id,
                    category,
                    vendor,
                    actualprice,
                    saleprice,
                    discount,

                    description,
                    type,
                    Image,
                    stock,
                    tagline } = doc.data();

                if (id === idl) {
                    SetProduct({ ...doc.data() })


                }
            })
        })


    }
    const getInspectionDetails = async () => {

        await firest.collection('Inspections').get().then((documentSnapshot) => {
            documentSnapshot.forEach((doc) => {
                const { email, userid, ProductId, InspectionFile, UploadedFile } = doc.data();
                if (userid === auth.currentUser.uid && ProductId === product.id) {
                    Setdata({ ...doc.data() })

                }
            })
        })

    }


const getUserDetail = () => {
    if(auth.currentUser)
    {
        let prodid = product.id;
        firest.collection('Reviews').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
                const {Email,productid} = doc.data();
                if(Email === auth.currentUser.email && productid === prodid)
                {
                    SetDetail({...doc.data()})
                }

            })
        })
    }
}


    const generateReviewDetails = () => {

        if (auth.currentUser)
         {
            
                        firest.collection('Orders').get().then((documentSnapshot) => {
                            documentSnapshot.forEach((doc) => {
                                const { Cart, Email, Status } = doc.data();
                                Cart.map((item) => {
                                    if (item.id === product.id && Status === 'Delivered' && Email === auth.currentUser.email) {

                                        Setpid(product.id)
                                        Setstatus(Status)
                                        SetEmail(Email)

                                        SetDat({ ...doc.data() })



                                    }
                                    else {
                                        return true;
                                    }

                                })


                            })

                        })
                    
                   

                   
                

        }


    }

    const generateReviewForm = () => {

        if (auth.currentUser) {

            if (Dat.Status === 'Delivered' && Dat.Email === auth.currentUser.email && product.id === pid && detail.Email != auth.currentUser.email && detail.productid != product.id) {
                console.log(status)

                return (
                    <ReviewForm productid={product.id} />
                )
            }
        }

    }
    const generateForm = () => {
        if (auth.currentUser) {
            let typei = "Used";
            let type = product.type;
            let productid = data.ProductId;
            let prodid = product.id;
            let UserID = data.userid;



            if (!UserID && !data.UploadedFile && type === typei && !productid) {
                return (
                    <InspectionForm product={product} />
                )
            }


            else if (UserID === auth.currentUser.uid && type === typei && data.UploadedFile === false && productid === prodid) {
                return (
                    <h1>Inspection In Progress</h1>
                )
            }
            else if (UserID === auth.currentUser.uid && type === typei && data.UploadedFile === true && productid === prodid) {
                return (
                    <img src={data.InspectionFile} style={{ objectFit: 'cover', height: 600, width: 900 }} />
                )
            }

            else {
                <div>
                    <h1>Inspection Service not available for this Product.</h1>
                </div>
            }
        }

    }


    useEffect(() => {





        getProduct(match.params.id);
        if (auth.currentUser) {

            getInspectionDetails();
            getUserDetail();
            generateReviewDetails();

        }









    }, [data.userid, data.ProductId, product.type, product.id, Dat.Status, Dat.Email, pid,detail.Email,detail.productid]);

    // useEffect(() => {
    //     getProductValues();
    // }, []);

    // const getProductValues = async () => {
    //     setLoading(true);
    //     const response = await getProductById(id);
    //     console.log(response.data);
    //     setProduct(response.data);
    //     setLoading(false);
    // }

    return (
        <Box className={classes.component}>
            <head>


                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            </head>
            <Box></Box>
            {product && Object.keys(product).length &&
                <Grid container className={classes.container}>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer}>
                        <Typography>{product.name}</Typography>
                        <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 5 }}>

                            <div className="img-wrapper">
                                <img
                                    src={product.Image}
                                    alt=""
                                    className="hover-zoom"
                                    style={{ width: 77, marginLeft: 20 }}

                                />
                            </div>

                        </Typography>
                        <Typography>
                            <span className={classes.price}>Rs{product.saleprice}</span>&nbsp;&nbsp;&nbsp;
                            <span className={classes.greyTextColor}><strike>Rs{product.actualprice}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.discount}% off</span>

                        </Typography>
                        <ProductDetail product={product} />

                    </Grid>
                </Grid>
            }
            {generateForm()}
            <div>
                {generateReviewForm()}
            </div>
            <ReviewData prodid={product.id} />
            <div style={{ backgroundColor: 'black' }}>
                <Footer />;
            </div>

        </Box>


    )

}

export default DetailView;