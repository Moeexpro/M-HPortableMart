import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, InputBase, List, ListItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { firest } from '../../redux/actions/fr';

const useStyle = makeStyles(theme => ({
    search: {
        borderRadius: 2,
        marginLeft: 10,
        width: '38%',
        backgroundColor: '#fff',
        display: 'flex'
      },
      searchIcon: {
        marginLeft: 'auto',
        padding: 5,
        display: 'flex',
        color: 'blue'
      },
      inputRoot: {
        fontSize: 'unset',
        width: '100%'
      },
      inputInput: {
        paddingLeft: 20,
        width: '100%',
    },
    list: {
      position: 'absolute',
      color: '#000',
      background: '#FFFFFF',
      marginTop: 36
    }
}))

const Search = () => {
    const classes = useStyle();
    const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)
    const [products,getProducts] = useState([]);

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

 const fetchProducts = async() => {
   var list = [];
  await firest.collection('Products').get().then((documentSnapshot)=>{
     documentSnapshot.forEach((doc)=>{
      const {name,
        id,
        category,
        vendor,
        actualprice,
        saleprice,
        discount,
        stock,
        description,
        type,
        Image,
        tagline,
         Orders,
        count} = doc.data();
        const st = parseInt(stock);
        
        list.push({
            name,
        id:id,
        category:category,
        vendor:vendor,
        actualprice:actualprice,
        saleprice:saleprice,
        discount:discount,
        stock:stock,
        description:description,
        type:type,
        Image:Image,
        tagline:tagline,
        Orders:Orders,
        count:count
        })
     })
   })
   getProducts(list)
 }

    

    useEffect(() => {
       fetchProducts()
    }, [])

    return (
        <div className={classes.search}>
            <InputBase
              placeholder="Search for products"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {
              text && 
              <List className={classes.list} hidden={open}>
                {
                  products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true)}  
                      >
                        {product.name}
                      </Link>
                    </ListItem>
                  ))
                }  
              </List>
            }
        </div>
    )
}

export default Search;