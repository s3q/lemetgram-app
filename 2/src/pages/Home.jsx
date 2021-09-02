import React, { Component, useContext, useState, useEffect} from 'react'

// components :
import Navbar from "../components/Navbar.jsx"
import AsideBar from "../components/AsideBar.jsx"
import Body from "../components/Body.jsx"

// context :
import { AuthContext } from '../context/AuthContext.js'
import { autoLoginApiContext } from "../ApiContext"


export default function Home() {
    const context = useContext(AuthContext)
    
    const [ user, setUser ] = useState() 

    return (
        <React.Fragment>
            <div className="d-flex flex-column flex-md-row h-100 position-relative">
                <AsideBar />
                <Body />
            </div>
        </React.Fragment>
    )
}
