import React, { Component, useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Button, Menu, MenuItem, Badge, } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Zoom, Slide } from '@material-ui/core';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { updateLoginApiContext } from "../ApiContext"

import Browser from "../functions/Browser"
import Api from '../functions/Api';
import { Btn } from './elements/Button.jsx';




const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: "100%"
    },

});



function Nav() {
    const classes = useStyles();

    const history = useHistory()
    const [path, setPath] = useState(window.location.pathname)
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        handleChange()
        history.listen((location) => {
            setPath(location.pathname)
        })
    }, [path, history])

    const arrayPaths = ["/", "/chat", "/explore", "/not"]


    const handleChange = () => {
        let newIndex = arrayPaths.indexOf(path)
        if (newIndex == 0 && path != "/") {
            return;
        }
        setValue(newIndex);

    };

    const handleClick = (event, newValue) => {
        setValue(newValue);
        console.log(arrayPaths[newValue])
        history.push(`${arrayPaths[newValue]}`)
    };

    return (
        <Paper className={classes.root, ""}>
            <Tabs
                value={value}
                onChange={handleClick}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab icon={
                    <AppsRoundedIcon />
                } tabIndex={0} />
                <Tab icon={<ForumRoundedIcon />} tabIndex={1} />
                <Tab icon={<ExploreIcon />} tabIndex={2} />
                <Tab icon={<GradeRoundedIcon />} tabIndex={3} />
            </Tabs>
        </Paper>
    );
}



function UserMenu({ user }) {

    const [checked, setChecked] = useState(false)


    const handleLogout = async () => {

        const loginId = Browser.getCookie("loginId")
        const userId = Browser.getCookie("userId")

        if (loginId == user.login_id && userId == user.user_id) {

            console.log(loginId, userId)
            Api.deleteLoginUser(loginId, userId).then(res => {
                console.log(res.data)

                Browser.setCookie("loginId", "", -1)
                Browser.setCookie("userId", "", -1)

                window.location.pathname = '/'
            })
        }
    }


    const handleClick = (event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation(); 
        if (event.relatedTarget)
            if (event.relatedTarget.classList.contains("ListItem1"))
                return;
        console.log(event)
        setChecked((prev) => !prev);
    };



    // const handleLink = (event) => {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation(); 

    //     let linkTo = event.target.id.split("-")[1]
    //     if (linkTo == "profile") {
    //         linkTo += `/${user.username}`
    //     }
    //     console.log(linkTo)
    //     history.push(`/${linkTo}`)
    // }



    // onBlur={handleClick}
    return (
        <div className="position-relative">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} onBlur={handleClick}>
                <div className="profileImg-sm" style={{ backgroundImage: `url(${user.profileImg})` }} >
                    <Slide direction="down" className="custom-menu" in={checked} mountOnEnter unmountOnExit>

                        <div>
                            <List component="nav" aria-label="main mailbox folders">

                                <Link className="d-block" to={`/profile/${user.username}`} role="button" button>
                                    <ListItem className="ListItem1" button>
                                        <ListItemIcon>
                                            <AccountCircleRoundedIcon style={{ fontSize: "18px" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItem>

                                </Link>

                                <Link className="d-block" to={`/settings`} role="button" button>
                                    <ListItem className="ListItem1" button>
                                        <ListItemIcon>
                                            <SettingsRoundedIcon style={{ fontSize: "18px" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </ListItem>
                                </Link>

                                <ListItem className="ListItem1" button onClick={handleLogout}>
                                    <ListItemIcon>
                                        <MeetingRoomRoundedIcon style={{ fontSize: "18px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                            <Divider />

                        </div>
                    </Slide>
                </div>


            </Button>

            {/* <Zoom in={checked} className="custom-menu"> */}

            {/* </Zoom> */}
        </div>
    );

}

export default function Navbar(props) {
    // props : user, isUserLogin 
    const context = useContext(AuthContext)
    // const location = useLocation()
    // // const {} = useParams()

    // const history = useHistory()
    const [user, setUser] = useState({})
    const [isUserLogin, setIsUserLogin] = useState(props.isUserLogin)
    // const [path, setPath] = useState(Browser.getPathParam(window.location.pathname))
    // const [navPath, setNavPath] = useState(Browser.getPathParam(window.location.pathname))



    useEffect(() => {


        if (context.user) {
            setUser(context.user)

            setIsUserLogin(true)
        }


    }, [context])



    // function BottomNavbar() {
    //     return (
    //         <div className="nav nav-pills nav-fill fixed-bottom border-top bg-light d-block" style={{ boxShadow: "0px -3px 19px #c9c9c9 !important" }}>
    //             <Nav></Nav>
    //         </div>
    //     )
    // }




    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    return (
        <React.Fragment>
            {
                isUserLogin && user && user._id ?
                    <div className="nav nav-pills nav-fill fixed-bottom border-top bg-light d-block" style={{ boxShadow: "0px -3px 19px #c9c9c9 !important" }}>
                        <Nav></Nav>
                    </div>
                    :
                    null
            }
            <nav className="navbar bg-blur-light navbar-expand border-bottom sticky-top p-0" style={{ zIndex: 1021 }}>
                <div className="container-fluid p-0">
                    <Link to="/" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '25px' }} className="btn btn-sm btn-light position-relative " >lemetgram</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-nav m-auto d-none d-md-block">
                            <form className="input-group input-group-sm custom-form" onSubmit={handleSubmit}>
                                <span className="input-group-text grey lighten-1" id="basic-addon1"><SearchRoundedIcon /></span>
                                <input className="form-control grey lighten-2" id="search-input" type="search" placeholder="Search" aria-label="Search" aria-describedby="inputGroup-sizing-sm"
                                    onFocus={(e) => {
                                        e.target.parentElement.classList.add("focus-animation")
                                    }}
                                    onBlur={(e) => {
                                        e.target.parentElement.classList.remove("focus-animation")
                                    }}
                                />

                            </form>
                        </div>
                        <div className='d-flex float-end'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item ms-5 position-relative">
                                    {
                                        isUserLogin && user && user._id ?
                                            <UserMenu user={user} />
                                            :
                                            <Link to="/login" className="d-block" style={{ textDecoration: "unset" }}>
                                                <Btn>Login <LockOpenRoundedIcon /></Btn>
                                            </Link>
                                    }
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>

    )
}

