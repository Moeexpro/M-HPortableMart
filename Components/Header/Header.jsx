import { AppBar, Toolbar, makeStyles, Box, Typography, withStyles, IconButton, Drawer, List, ListItem} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomButtons from './CustomButtons';
import Search from './Search';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';
import logo from '../../redux/M & H Logo.png'

const useStyle = makeStyles(theme => ({
    header: {
        background: '#00008B',
        height: 55
    },
    component: {
        marginLeft: '12%',
        lineHeight: 0,
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    logo: {
        width: 75
    },
    container: {
        display: 'flex',
    },
    subHeading: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    subURL: {
        width: 10,
        height: 10,
        marginLeft: 4
    },
    list: {
        width: 250
    },
    menuButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    customButtons: {
        margin: '0 15% 0 auto', 
        [theme.breakpoints.down('sm')]: {
            display:'flex'
        } 
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 100,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF'
        } 
    }  
}));

const ToolBar = withStyles({
    root: {
      minHeight: 55
    },
})(Toolbar);






const Header = () => {
    const classes = useStyle();
    const logoURL = logo;
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);
    const [ ope, setOpe ] = useState(false);
    const [devops,SetDevops] = useState('')
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box className={classes.list} onClick={handleClose}>
            <List>
                <listItem button>
                <CustomButtons />
                </listItem>
            </List>
        </Box>
    );


    return (
        <AppBar position="fixed" className={classes.header}>
            <ToolBar>
               
              
                <Link to='/' className={classes.component}>
                    <img src={logoURL} className={classes.logo} />
                    <Box component="span" className={classes.container}>
                        <Typography className = {classes.subHeading}>Tech <Box component="span" style={{color:'#FFE500'}}>Plaza</Box></Typography>
                        
                    </Box>
                </Link>
                <Search />
                <span className={classes.customButtons}>
                <CustomButtons /></span>
            </ToolBar>
        </AppBar>
    )
}

export default Header;