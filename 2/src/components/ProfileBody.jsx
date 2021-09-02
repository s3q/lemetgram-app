import React, { Component, useState, useContext, useEffect } from 'react'
import SharBer from "./SahreBar.jsx"

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { CircularProgress, LinearProgress } from "@material-ui/core"

import Api from '../functions/Api.js';

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext.js';
import { updateLoginApiContext } from "../ApiContext"

export default function ProfileBody(props) {
    // props: user
    const context = useContext(AuthContext)

    const [isFollowing, setIsFollowing] = useState(false)
    const [user, setUser] = useState(props.user)
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)

    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        updateLoginApiContext(context.dispatch)
    }, [user, isFollowing, followers, followings])



    useEffect(() => {
        setUser(props.user)
        setIsFetching(false)
        // console.log(props.user, props.user.id, Boolean(props.user.id))
        if (props.user._id) {
            setIsFetching(false)
        } else {
            setIsFetching(true)
        }

        setFollowers(props.user?.followers?.length)
        setFollowings(props.user?.followings?.length)

        setIsFollowing(props.user?.followers?.includes(context.user._id))

    }, [props.user])


    function followButton() {
        if (user._id && context.user._id && user._id != context.user._id) {
            if (isFollowing) {
                return <button className="btn btn-secondary" onClick={() => handleFollow()}>Unfollow <RemoveRoundedIcon /></button>
            } else {
                return <button className="btn btn-primary" onClick={() => handleFollow()}>Follow <AddRoundedIcon /></button>
            }
        } else {
            return
        }
    }

    const unfollowUser = async () => {
        const res = await Api.unfollowUser(user._id, context.user._id)
        return res.status
    }


    const followUser = async () => {
        const res = await Api.followUser(user._id, context.user._id)
        return res.status
    }



    const handleFollow = async () => {
        if (user._id != context.user._id) {
            if (isFollowing) {
                const resStatus = await unfollowUser()
                if (resStatus == 200) {

                    user.followers = user.followers.filter(e => {
                        return e != context.user._id
                    })

                    setUser(prevState => ({
                        ...prevState,
                        followers: user.followers
                    }))

                    setIsFollowing(false)
                }
            } else {
                const resStatus = await followUser()
                if (resStatus == 200) {

                    let newFollowers = user.followers.push(context.user._id)


                    setUser(prevState => ({
                        ...prevState,
                        followers: newFollowers
                    }))

                    setIsFollowing(true)
                }
            }
        }
    }


    return (
        <React.Fragment>
            <div className="card text-center mb-5 custom-card">
                <div className="card-body ">
                    <h5 className="card-title mb-3">
                    </h5>
                    <div className="position-relative">
                        <div style={{ backgroundImage: (!user.coverImg ? `` : `url(${user.coverImg})`) }} className={`card-img-top coverImg-center ${user.coverImg ? `loadImg` : `isLoading`}`}>
                            {/* {isFetching ? <CircularProgress /> : null} */}
                        </div>
                        <div style={{ backgroundImage: (!user.profileImg ? `` : `url(${user.profileImg})`) }} className={`profileImg-center shadow-lg p-1 bg-body rounded-circle ${user.profileImg ? `loadImg` : `isLoading`}`}>
                            {/* {isFetching ? <CircularProgress /> : null} */}
                        </div>
                        <div className="username-profile-div shadow-lg bg-body">
                            <span className="username-profile-span"><AccountCircleRoundedIcon /></span>
                            <span className="username-profile">{user?.username}</span>
                        </div>
                    </div>
                    <ul className="list-group mb-3 mt-3 position-relative">
                        {
                            isFetching ?
                                <div className=" position-absolute top-0 start-0 bg-light w-100 h-100 d-flex justify-content-center flex-column" style={{ zIndex: 10 }}>
                                    <CircularProgress className="m-auto" />
                                </div> :
                                null
                        }
                        <li className="list-group-item">Name : {user?.name}</li>
                        <li className="list-group-item">discrption : {user?.desc}</li>
                        <li className="list-group-item">Followers : <span className="badge bg-warning text-dark">{followers}</span></li>
                        <li className="list-group-item">Following : <span className="badge bg-danger text-dark">{followings}</span></li>
                        <li className="list-group-item">From : <span className="badge text-dark">{user?.from}</span></li>
                        <li className="list-group-item">City : <span className="badge text-dark">{user?.city}</span></li>
                        <li className="list-group-item">Email : <span className="badge text-dark">{user?.email}</span></li>
                    </ul>
                    {followButton()}
                </div>
            </div>
            {context.user._id == user._id ? <SharBer user={user} /> : ""}
        </React.Fragment>
    )
}
