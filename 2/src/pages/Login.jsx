import React from 'react'
import Navbar from "../components/Navbar.jsx"
import AsideBar from "../components/AsideBar.jsx"
import LoginBody from "../components/LoginBody.jsx"


import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


export default function Login() {
    return (
        <React.Fragment>

                <div className="d-flex flex-row justify-content-center h-100 position-relative">
                    <div className="body-container mt-5">
                        <LoginBody />
                    </div>
                </div>
        </React.Fragment>
    )
}
