import React from 'react';
import Header from '../Header/index'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    list: {
        backgroundColor: '#f1f1f1',
        height: '100vh'
    },
    nav: {
        color: 'black'
    }
}));
const Layout = (props) => {
    const classes = useStyles()
    return (
        <>
            <Header />
            {
                props.sidebar ? (
                    <Grid container>
                        <Grid item sm={2} className={classes.list}>
                            <div >
                                <List component="nav" aria-label="main mailbox folders">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>

                                        <NavLink
                                            to='products'
                                            className={classes.nav}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: 'red'
                                            }}
                                        >
                                            <ListItemText primary="Product" />
                                        </NavLink>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <NavLink
                                            to='orders'
                                            className={classes.nav}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: 'red'
                                            }}
                                        >
                                            <ListItemText primary="Order" />
                                        </NavLink>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <NavLink
                                            to='home'
                                            className={classes.nav}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: 'red'
                                            }}
                                        >
                                            <ListItemText primary="Home" />
                                        </NavLink>

                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <NavLink
                                            to='categories'
                                            className={classes.nav}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: 'red'
                                            }}
                                        >
                                            <ListItemText primary="Categories" />
                                        </NavLink>

                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item sm={10}>
                            {props.children}
                        </Grid>
                    </Grid>
                ) : props.children
            }

        </>
    );
}

export default Layout;
