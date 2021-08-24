import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link, Nav } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/auth.action';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navLink: {
        marginRight: '20px',
        cursor: 'pointer'
    }
}));
const Header = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth);


    const logout = () => {
        dispatch(signOut())
    }
    const renderNonLoggedInLinks = () => {
        return (
            <div>
                <NavLink
                    to='signin'
                    className={classes.navLink}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "white"
                    }}> Sign In </NavLink>
                <NavLink
                    to='signup'
                    className={classes.navLink}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "white"
                    }}
                >Sign Up</NavLink>
            </div>
        )
    }
    const renderLoggedInLinks = () => {
        return (
            <div
                className={classes.navLink}
                onClick={logout}
            > Sign Out </div>
        )
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/'>AnvuShop</Link>
                    </Typography>

                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
