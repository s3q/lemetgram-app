import React, { Component, useContext, useState, useEffect } from 'react'
import {
    Link,
    useParams,
    useHistory

} from 'react-router-dom';


// components :
import AsideBar from "../components/AsideBar.jsx"

// context :
import { AuthContext } from '../context/AuthContext.js'
import Api from '../functions/Api.js'


export default function Explore() {
    const context = useContext(AuthContext)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        Api.fetchAllUsers().then(res => {
            console.log(res.data)
            setAllUsers(res.data)
        })
    }, [])

    return (
        <React.Fragment>
            <div className="d-flex flex-column flex-md-row h-100 position-relative">
                <AsideBar />
                <div className="body-container">
                    {
                        allUsers.map(user => {
                            return <Link className="btn btn-light d-flex align-items-center m-5" key={user._id} to={`/profile/${user.username}`} >

                                <div className="profileImg" style={{ backgroundImage: `url(${user.profileImg})` }}></div>
                                <span className="username position-relative" href="#">
                                    {user.username}
                                </span>

                            </Link>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

