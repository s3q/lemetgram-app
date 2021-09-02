
import React, { Component } from 'react'

import Navbar from "../components/Navbar.jsx"
import AsideBar from "../components/AsideBar.jsx"
import RegisterBody from "../components/RegisterBody.jsx"



export default function Register() {
    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-center h-100 position-relative">
                <div className="body-container mt-5">
                    <RegisterBody />
                </div>
            </div>
        </React.Fragment>
    )
}

