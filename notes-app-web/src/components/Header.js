import {
    AppBar,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import App from "../App";
import Labels from "./Labels";
import Notes from "./Notes";

const useStyles = makeStyles({
    // menuButton: {
    //     //backgroundColor: '#333'
    // }
    title: {
        flex: 1,
    },
    root: {
        marginBottom: 30
    },
    list: {
        width: 250
    }
});

function Header(props) {

    const { icon, primary, to } = props;

    const classes = useStyles();

    const [state, setState] = useState(false);

    const toggleDrawer = (toggle) => (event) => {
        if (event.type === 'keydown' && event.key === 'Tab' || event.key === 'Shift') {
            return;
        }
        setState(toggle);
    }


    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    // const list = () => {
    //     <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
    //         <List>
    //             <ListItem button key='home'>
    //                 <ListItemIcon>
    //                     <HomeOutlinedIcon />
    //                 </ListItemIcon>
    //                 <ListItemText primary="Home" />
    //             </ListItem>
    //         </List>
    //     </div>
    // };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <IconButton color='inherit' edge='start' aria-label='Menu' onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title} >Notes App</Typography>
                        <Button color='inherit'>LOGIN</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
                <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {/* <ListItem button>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem> */}
                        <Router>
                            <ListItem button component={renderLink} >
                                <ListItemIcon>
                                    <NoteAddOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Notes" />
                            </ListItem>
                            <ListItem button component={RouterLink} to="/labels">
                                <ListItemIcon>
                                    <LabelOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Labels" />
                            </ListItem>

                            {/* <Switch>
                        <Route path="/labels">
                            <Labels />
                        </Route> 
                        <Route path="/">
                            <Notes />
                        </Route>
                    </Switch> */}
                        </Router>
                    </List>
                    
                    {/* <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                    </List> */}
                </div>
            </Drawer>
        </div>
    );
}


export default Header;