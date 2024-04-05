import { Box, makeStyles, Typography } from '@material-ui/core';
import { navData } from '../../constant/data';
import {useHistory} from 'react-router-dom';
const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '55px 130px 0 130px',
        overflowX: 'overlay',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    container: {
        padding: '12px 8px',
        textAlign: 'center'
    },
    image: {
        width: 64
    },
    text: {
        fontSize: 10,
        fontWeight: 600,
        fontFamily: 'inherit',
        width:80
    }
}));

const NavBar = () => {
    const classes = useStyle();
    const history = useHistory();

    const gotopage = (text) => {
if(text === "Become Vendor")
{
    history.push('/BeVendor');
}
if(text === "My Orders")
{
    history.push('/Orders');
}
if(text === "Laptops")
{
    history.push('/Laptops/');
}
if(text === "My Products")
{
    history.push('/Products/');
}
if(text === "SmartPhones")
{
    history.push('/SmartPhones/');
}
if(text === "Our Inspectors")
{
    history.push('/Inspectors/');
}
if(text === "Used Items")
{
    history.push('/UsedItems/');
}
if(text === "Top Vendors")
{
    history.push('/Vendors/');
}
    }
    return (
        <Box className={classes.component}>
            {
                navData.map(temp => (
                    <Box className={classes.container}>
                        <img src={temp.url} className={classes.image} />
                       <button onClick={()=>{gotopage(temp.text)}}> <Typography className={classes.text}>{temp.text}</Typography></button>
                    </Box>
                ))
            }
        </Box>
    )
}

export default NavBar;