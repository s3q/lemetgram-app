import React, { Component, useState, useContext, useEffect } from 'react'

import Navbar from "../components/Navbar.jsx"
import AsideBar from "../components/AsideBar.jsx"
import ProfileBody from "../components/ProfileBody.jsx"
import Post from "../components/Post"

import Api from "../functions/Api"
import Browser from "../functions/Browser"

import { CircularProgress, LinearProgress } from "@material-ui/core"


import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.js'



export default function Profile() {

    const context = useContext(AuthContext)

    const { username } = useParams()

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    const [isFetching, setIsFetching] = useState(false)
    const [isFinishing, setIsFinishing] = useState(false)



    useEffect(async () => {
        setIsFetching(false)
        await fetchUser()
    }, [username])

    const fetchUser = async () => {
        setIsFetching(true)
        await Api.fetchUser(username, "username").then(res => {
            console.log(res)
            setUser(res.data)
            fetchPosts(res.data)
        })
    }


    const fetchPosts = async (user) => {
        await Api.fetchUserPosts(user._id).then(res => {
            setPosts(res.data)
            setIsFetching(false)
        })
    }


    return (
        <React.Fragment>
            <div className="d-flex flex-column flex-md-row h-100 position-relative">
                <AsideBar />
                <div className="body-container">
                    <div className="mb-4">
                        {
                            isFetching ?
                                <LinearProgress />
                                :
                                <div className="bg-light" style={{ padding: ".12rem" }}></div>
                        }
                    </div>
                    <ProfileBody user={user} />
                    <div className="mb-4">

                        {
                            isFetching ?
                                <LinearProgress />
                                :
                                <div className="bg-light" style={{ padding: ".12rem" }}></div>
                        }
                    </div>
                    <div className="mb-5">

                        {
                            posts.map(post => {
                                return <Post key={post._id} postId={post._id} state={{ posts: posts, setPosts: setPosts}} />
                            })
                        }
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

