import React, { Component, useState, useEffect, useContext } from 'react'

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
const PROFILE_IMG = process.env.PROFILE_IMG
const COVER_IMG = process.env.PROFILE_IMG



export default function Navbar(props) {
    // props : user, isUserLogin 
    const context = useContext(AuthContext)
    const location = useLocation()
    // const {} = useParams()

    const history = useHistory()
    const [user, setUser] = useState({})
    const [isUserLogin, setIsUserLogin] = useState(props.isUserLogin)
    const [path, setPath] = useState(Browser.getPathParam(location.pathname))
    const [navPath, setNavPath] = useState(Browser.getPathParam(location.pathname))


    
    // useEffect(() => {
    //     return history.listen((location) => {
    //         if (navPath != location.pathname) {
    //             console.log(location.pathname)
    //             setNavPath(location.pathname)
    //             Browser.setHistoryUrl()
    //         }
    //     })
    // }, [])
    

    useEffect(() => {

        handleNavToggle(path)

        
        if (context.user) {
            setUser(context.user)

            setIsUserLogin(true)
        }

        return history.listen((location) => {
            setPath(Browser.getPathParam(location.pathname))
            handleNavToggle(path)
        })
    }, [context, history, path])

    const handleLogout = async () => {

        const loginId = Browser.getCookie("loginId")
        const userId = Browser.getCookie("userId")

        if (loginId == context.user.login_id && userId == context.user.user_id) {

            console.log(loginId, userId)
            Api.deleteLoginUser(loginId, userId).then(res => {
                console.log(res.data)

                Browser.setCookie("loginId", "", -1)
                Browser.setCookie("userId", "", -1)

                window.location.pathname = '/'
            })
        }
    }

    function handleNavToggle(path) {
        let navPath = path
        let navButton = document.querySelectorAll(".navButton")

        navButton.forEach(e => {

            if (e.classList.contains("dropdown-item")) {
                e.classList.remove("active")
                if (e.href == `http://localhost:3000/${navPath}` || e.href.startsWith(`http://localhost:3000/${navPath}/`)) {
                    e.classList.add("active")
                }
            } else {

                e.classList.remove("btn-primary")
                e.classList.add("btn-light")
                if (e.href == `http://localhost:3000/${navPath}` || e.href.startsWith(`http://localhost:3000/${navPath}/`)) {
                    e.classList.add("btn-primary")
                    e.classList.remove("btn-light")
                }
            }
        })
    }

    function userLoginDev() {
        if (isUserLogin && user && user.username) {
            return (
                <React.Fragment>
                    <div className="btn-group ">
                        <button type="button" id="navbarDarkDropdownMenuLink" className="btn btn-sm btn-light text-dark position-relative dropdown-toggle d-flex align-items-center" aria-current="page" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="profileImg-sm" style={{ backgroundImage: `url(${user.profileImg})` }} ></div>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><Link className="dropdown-item navButton" to={`/profile/${user.username}`}>profile  <small className="text-muted float-end"><AccountCircleRoundedIcon style={{ fontSize: "18px" }} /></small></Link></li>
                            <li><Link className="dropdown-item navButton" to="/settings">Setting <small className="text-muted float-end"><SettingsRoundedIcon style={{ fontSize: "18px" }} /></small></Link></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>Logout <small className="text-muted float-end"><MeetingRoomRoundedIcon style={{ fontSize: "18px" }} /></small></button></li>
                        </ul>
                    </div>

                </React.Fragment>
            )
        } else {
            return (
                <Link to="/login" type="button" className="btn btn-sm btn-secondary position-relative" aria-current="page">
                    Login <LockOpenRoundedIcon />
                </Link>
            )
        }
    }

    function navButtonsDev() {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link type="button" className="btn btn-sm btn-light position-relative navButton" aria-current="page" to="/">
                        <AppsRoundedIcon />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link type="button" className="btn btn-sm btn-light position-relative navButton" aria-current="page" to="/chat">
                        <ForumRoundedIcon />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
                            1
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link type="button" className="btn btn-sm btn-light position-relative navButton" aria-current="page" to="/explore">
                        <ExploreIcon />
                        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                        <span className="visually-hidden">unread messages</span>
                                    </span> */}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link type="button" className="btn btn-sm btn-light position-relative navButton" aria-current="page" to="/not">
                        <GradeRoundedIcon />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
                            1
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </Link>
                </li>
            </React.Fragment >
        )
    }


    function userInteractiveDev() {
        if (isUserLogin && user && user.username) {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="d-none d-sm-flex nav-item justify-content-between" style={{ width: "234px" }}>
                        {navButtonsDev()}
                    </li>
                    <li className="nav-item ms-5 position-relative">
                        {userLoginDev()}
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item ms-5 position-relative">
                        {userLoginDev()}
                    </li>
                </ul>
            )
        }
    }




    function buttomNavButtonsDev() {
        if (isUserLogin && user && user.username) {
            return (
                <React.Fragment>
                    <ul className="nav nav-pills nav-fill fixed-bottom pb-2 pt-3 border-top d-sm-none bg-light shadow-lg"
                        style={{ boxShadow: "1rem 0 2rem rgb(0 0 0 / 22%) !important" }}>
                        {navButtonsDev()}
                        <li className="nav-item">
                            <Link type="button" className="btn btn-sm btn-light position-relative navButton" aria-current="page" to={`/profile/${context.user.username}`}>
                                <div className="profileImg-sm" style={{ backgroundImage: `url(${user.profileImg})` }} ></div>

                            </Link>
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    return (
        <React.Fragment>
            {buttomNavButtonsDev()}
            <nav className="navbar navbar-light bg-light navbar-expand border-bottom sticky-top" style={{ zIndex: 1000000000000000 }}>
                <div className="container-fluid">
                    <Link to="/" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '25px' }} className="btn btn-sm btn-light position-relative " >lemetgram</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-nav m-auto d-none d-md-block">
                            <form className="input-group input-group-sm" onSubmit={handleSubmit}>
                                <span className="input-group-text" id="basic-addon1"><SearchRoundedIcon /></span>
                                <input className="form-control" id="search-input" type="search" placeholder="Search" aria-label="Search" aria-describedby="inputGroup-sizing-sm" />
                            </form>
                        </div>
                        <div className='d-flex ms-auto'>
                            {userInteractiveDev()}
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}


// export default class Navbar extends Component {
//     // props : user, isUserLogin

//     constructor(props) {
//         super(props)
//         this.state = {
//             user: this.props.user,
//             isUserLogin: this.props.isUserLogin
//         }
//     }



//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.user != this.state.user) {
//             this.setState({ user: this.props.user })
//             this.setState({ isUserLogin: this.props.isUserLogin })
//         }
//     }

//     userLoginDev() {
//         if (this.state.isUserLogin && this.state.user && this.state.user.username) {
//             return (
//                 <React.Fragment>
//                     <div className="btn-group ">

//                         <a type="button" id="navbarDarkDropdownMenuLink" className="btn btn-sm btn-light position-relative dropdown-toggle" aria-current="page" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                             <img className="profileImg-sm" src={this.props.user.profileImg} alt="" />
//                         </a>

//                         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
//                             <li><Link className="dropdown-item" to={`/profile/${this.props.user.username}`}>profile  <small className="text-muted float-end"><AccountCircleRoundedIcon style={{ fontSize: "18px" }} /></small></Link></li>
//                             <li><Link className="dropdown-item" to="/setting">Setting <small className="text-muted float-end"><SettingsRoundedIcon style={{ fontSize: "18px" }} /></small></Link></li>
//                             <li><Link className="dropdown-item" to="/logout">Logout <small className="text-muted float-end"><MeetingRoomRoundedIcon style={{ fontSize: "18px" }} /></small></Link></li>
//                         </ul>
//                     </div>

//                 </React.Fragment>
//             )
//         } else {
//             return (
//                 <Link to="/login" type="button" className="btn btn-sm btn-secondary position-relative" aria-current="page">
//                     Login <LockOpenRoundedIcon />
//                 </Link>
//             )
//         }
//     }

//     userInteractiveDev() {
//         if (this.state.isUserLogin && this.state.user && this.state.user.username) {
//             return (
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <a type="button" className="btn btn-sm btn-light position-relative" aria-current="page" href="#">
//                             <AppsRoundedIcon />
//                             <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
//                                 <span className="visually-hidden">New alerts</span>
//                             </span>
//                         </a>
//                     </li>
//                     <li className="nav-item ms-2">
//                         <a type="button" className="btn btn-sm btn-light position-relative" aria-current="page" href="#">
//                             <ForumRoundedIcon />
//                             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
//                                 1
//                                 <span className="visually-hidden">unread messages</span>
//                             </span>
//                         </a>
//                     </li>
//                     <li className="nav-item ms-2">
//                         <a type="button" className="btn btn-sm btn-light position-relative" aria-current="page" href="#">
//                             <ExploreIcon />
//                             {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                                         99+
//                                         <span className="visually-hidden">unread messages</span>
//                                     </span> */}
//                         </a>
//                     </li>
//                     <li className="nav-item ms-2">
//                         <a type="button" className="btn btn-sm btn-light position-relative" aria-current="page" href="#">
//                             <GradeRoundedIcon />
//                             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
//                                 1
//                                 <span className="visually-hidden">unread messages</span>
//                             </span>
//                         </a>
//                     </li>
//                     <li className="nav-item ms-5 position-relative">
//                         {this.userLoginDev()}
//                     </li>
//                 </ul>
//             )
//         } else {
//             return (
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item ms-5 position-relative">
//                         {this.userLoginDev()}
//                     </li>
//                 </ul>
//             )
//         }
//     }

//     render() {
//         return (
//             <nav className="navbar navbar-light bg-light navbar-expand border-bottom sticky-top" style={{ zIndex: 1000000000000000 }}>
//                 <div className="container-fluid">
//                     <Link to="/" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '25px' }} className="btn btn-sm btn-light position-relative " >lemetgram</Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//                         <div className="navbar-nav m-auto d-none d-md-block">
//                             <form className="input-group input-group-sm">
//                                 <span className="input-group-text" id="basic-addon1"><SearchRoundedIcon /></span>
//                                 <input className="form-control" id="search-input" type="search" placeholder="Search" aria-label="Search" aria-describedby="inputGroup-sizing-sm" />
//                             </form>
//                         </div>
//                         <div className='d-flex ms-auto'>
//                             {this.userInteractiveDev()}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         )
//     }
// }
