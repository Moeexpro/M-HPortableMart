import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import {LoginContext} from '../../context/contex';

const useStyle = makeStyles({
    component: {
        marginTop: 40,
    },
    logout: {
        fontSize: 14,
        marginLeft: 20
    }
})

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    const {logout} = useContext(LoginContext);
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

   
    
    return (
        <>
            <Link onClick={handleClick}><Typography style={{ marginTop: 2 }}>{account}</Typography></Link>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <MenuItem    onClick={() => { logout()}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    )    
}

export default Profile;