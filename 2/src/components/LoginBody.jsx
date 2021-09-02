import React, { Component, useEffect, useState, useContext, useRef } from 'react'

import {
    Redirect,
    Route,
    Link,
    useHistory

} from 'react-router-dom';

import Api from '../functions/Api';

// context 
import { AuthContext } from '../context/AuthContext';
import { loginApiContext, autoLoginApiContext } from '../ApiContext';

// material 
import { makeStyles } from '@material-ui/core/styles';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { CircularProgress, LinearProgress } from "@material-ui/core"
import Backdrop from '@material-ui/core/Backdrop';
import Browser from '../functions/Browser';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 1000000000000,
        color: '#fff',
    },
}));


export default function LoginBody() {
    const context = useContext(AuthContext)
    const history = useHistory()

    const inputEmail = useRef()
    const inputPassword = useRef()

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    useEffect(async () => {

        // await autoLoginApiContext(context.dispatch)

            // console.log(res)
            // let lastUrlVistedArray = Browser.getHistoryUrl()
            // console.log(lastUrlVistedArray)
            // let lastUrlVisted = lastUrlVistedArray[lastUrlVistedArray.length - 1]
            // console.log(lastUrlVisted, window.location.href, lastUrlVisted != window.location.href)

            // history.go("http://localhost:3000/profile/test2")
            // if (lastUrlVisted != window.location.href) {

            //     history.go(lastUrlVisted)
            // } 
            // else {
            //     history.go(window.location.host)
            // }


    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        setOpenBackdrop(true);

        let userCredentials = {
            userEmail: inputEmail.current.value,
            userPassword: inputPassword.current.value
        }

        const res = await loginApiContext(userCredentials, context.dispatch)

    }



    return (
        <React.Fragment>

            {
                context.isFetching ?
                    <Backdrop className={classes.backdrop} open={openBackdrop}>
                        <CircularProgress color="light" />
                    </Backdrop>
                    :
                    openBackdrop ? setOpenBackdrop(false) : null
                // setOpen(false)
            }
            {
                context.user ? <Redirect exact to="/" /> : <Redirect to="/login" />
            }
            <div className="card text-center m-auto custom-card" style={{ maxWidth: "500px" }}>
                <div className="card-header">
                    LOGIN
                </div>
                {context.isFetching ? <LinearProgress /> : <div className="bg-light" style={{ padding: ".12rem" }}></div>}
                <div className="card-body">
                    <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" required ref={inputEmail} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword" minLength="6" placeholder="Password" required ref={inputPassword} />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary text-center position-relative">
                                <div>

                                    {context.isFetching ? "Loading" : "Login"}

                                    {
                                        context.isFetching ?
                                            <CircularProgress disableShrink color="white" size="20px" className="ms-1" thickness={5} style={{ marginBottom: "-5px" }} />
                                            :
                                            <LockOpenRoundedIcon className="ms-1" />
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">

                    I don't have an account - <Link to="/register">register </Link>

                </div>
            </div>

        </React.Fragment>
    )
}


// export default class LoginBody extends Component {

//     constructor(props) {
//         super(props)
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     state = {
//         inputEmail: "",
//         inputPassword: ""
//     }

//     handleChange(event, stateStr) {
//         this.setState({ [stateStr]: event.target.value });
//     }

//     loginUser = async (userEmail, userPassword) => {
//         return await Api.loginUser(userEmail, userPassword)
//     }

//     handleSubmit = async (event) => {
//         event.preventDefault();
//         const res = await this.loginUser(this.state.inputEmail, this.state.inputPassword)
//         if (res.status == 200) {
//             console.log("login seccssufly !!!!")
//             const [setUser, setAuth] = this.context.setContext
//             setUser(res.data)

//             if (this.context.state.user) {
//                 setAuth(true)
//             }

//         }
//     }


//     componentDidMount() {
//         console.log(this.context, this.context.state.user)
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 {
//                     this.context.state.isAuthenticated ? <Redirect exact to="/" /> : <Redirect to="/login" />
//                 }
//                 <div className="card text-center m-auto" style={{ maxWidth: "500px" }}>
//                     <div className="card-header">
//                         REGISTER
//                     </div>
//                     <div className="card-body">
//                         <form className="row g-4" onSubmit={this.handleSubmit}>
//                             <div className="col-md-6">
//                                 <label for="inputEmail" className="form-label">Email</label>
//                                 <input type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={(e) => this.handleChange(e, "inputEmail")} />
//                             </div>
//                             <div className="col-md-6">
//                                 <label for="inputPassword" className="form-label">Password</label>
//                                 <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => this.handleChange(e, "inputPassword")} />
//                             </div>
//                             <div className="col-12">
//                                 <button type="submit" className="btn btn-primary" >Login <LockOpenRoundedIcon /> </button>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="card-footer text-muted">
//                         I don't have an account - <a href="/register">register </a>
//                     </div>
//                 </div>

//             </React.Fragment>

//         )
//     }
// }

// LoginBody.contextType = AppContext