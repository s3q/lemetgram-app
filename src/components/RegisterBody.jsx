import React, { Component, useRef, useState, useEffect, useContext } from 'react'

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

import Api from '../functions/Api';
import Browser from '../functions/Browser';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { loginApiContext } from '../ApiContext';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, LinearProgress } from "@material-ui/core"
import Backdrop from '@material-ui/core/Backdrop';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 1000000000000,
        color: '#fff',
    },
}));

export default function RegisterBody() {

    const context = useContext(AuthContext)


    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const [isFetching, setIsFetching] = useState(false)

    const inputEmail = useRef()
    const inputPassword = useRef()
    const inputPasswordConfirmation = useRef()
    const inputUsername = useRef()
    const inputName = useRef()
    const inputCity = useRef()
    const inputFrom = useRef()
    const inputDescription = useRef()
    const inputCoverImg = useRef()
    const inputProfileImg = useRef()

    const ALLOWED_IMG = ["image/png", "image/jpeg"]
    const ALLOWED_IMG_SIZE = 5

    const handleSubmit = async (event) => {
        setOpenBackdrop(true)
        event.preventDefault()
        console.log(!context.isFetching)
        if (!context.isFetching) {

            if (inputPassword.current.value != inputPasswordConfirmation.current.value) {
                return inputPasswordConfirmation.current.setCustomValidity("Password don't match!")
            }


            const coverImg = inputCoverImg.current.files[0]
            const profileImg = inputProfileImg.current.files[0]

            const userData = {
                email: inputEmail.current.value,
                password: inputPassword.current.value,
                username: inputUsername.current.value,
                name: inputName.current.value,
                city: inputCity.current.value,
                from: inputFrom.current.value,
                desc: inputDescription.current.value,
            }

            try {
                setIsFetching(true)

                if (coverImg != {}) coverImg.id = "coverImg"
                if (profileImg != {}) profileImg.id = "profileImg"

                const fromData = new FormData()
                fromData.append("coverImg", coverImg)
                fromData.append("profileImg", profileImg)

                console.log(userData)


                await Api.registerUser(userData).then(async res => {
                    console.log(res)
                    if (res.status == 200) {
                        const imgData = {
                            set: true
                        }

                        if (coverImg != {}) imgData.coverImg = ""
                        if (profileImg != {}) imgData.profileImg = ""

                        console.log(imgData)

                        await Api.updateUserImg(res.data._id, res.data._id, imgData, fromData)


                        let userCredentials = {
                            userEmail: inputEmail.current.value,
                            userPassword: inputPassword.current.value
                        }

                        await loginApiContext(userCredentials, context.dispatch).then(res => {
                            if (res.status == 200) {
                                setIsFetching(false)
                            }
                        })
                    }
                })

            } catch (err) {

            }
        }
    }


    const handleUpload = async (e) => {

        const [file] = e.target.files

        if (file && ALLOWED_IMG.includes(file.type)) {

            let img = {}
            let quality = 7

            const fileSize = file.size / 1000 / 1000

            if (e.target.attributes.id.value == "inputCoverImg") {

                img = document.getElementById("preview-coverImg")
                // quality = .3
            }
            else if (e.target.attributes.id.value == "inputProfileImg") {

                img = document.getElementById("preview-profileImg")
                // quality = .2
            }

            if (file && fileSize < ALLOWED_IMG_SIZE) {
                img.hidden = false

                const reader = new FileReader();
                reader.onload = (event) => {
                    let imgDataUrl = event.target.result;
                    img.style.backgroundImage = `url(${imgDataUrl})`

                    // Browser.resizeImage(imgDataUrl, file.type, quality).then(res => {
                    //     let newFileSize = res.length / 100000
                    //     console.log(res, newFileSize)
                    //     if (newFileSize < 1) {
                    //         img.style.backgroundImage = `url(${res})`
                    //         console.log(img.style.backgroundImage)
                    //     }
                    // })
                };
                reader.readAsDataURL(file);

            }

        }
    }


    return (
        <React.Fragment>

            {
                isFetching ?
                    <Backdrop className={classes.backdrop} open={openBackdrop}>
                        <CircularProgress color="light" />
                    </Backdrop>
                    :
                    openBackdrop ? setOpenBackdrop(false) : null
            }
            {
                context.user ? <Redirect exact to="/" /> : <Redirect to="/register" />
            }
            <div className="card text-center m-auto custom-card" style={{ maxWidth: "500px" }}>


                <div className="card-header">
                    REGISTER
                </div>
                {

                    isFetching ?
                        <LinearProgress />
                        :
                        <div className="bg-light" style={{ padding: ".12rem" }}></div>
                }
                <div className="card-body">
                    <form className="row g-4 " onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label for="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" ref={inputEmail} required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword" minLength="6" placeholder="Password" ref={inputPassword} required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPasswordConfirmation" className="form-label">Password Confirmation</label>
                            <input type="password" className="form-control" id="inputPasswordConfirmation" minLength="6" placeholder="Password Confirmation" ref={inputPasswordConfirmation} required />
                        </div>
                        <div className="col-12">
                            <label for="inputUsername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputUsername" placeholder="Username" required ref={inputUsername} />
                        </div>
                        <div className="col-12">
                            <label for="inputName" className="form-label">Your Name</label>
                            <input type="text" className="form-control" id="inputName" placeholder="You Name" ref={inputName} required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" placeholder="City" ref={inputCity} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputFrom" className="form-label">From</label>
                            <input type="text" className="form-control" id="inputFrom" placeholder="From" ref={inputFrom} />
                        </div>

                        <div className="g-4 mb-5 mt-5">
                            <hr />
                            <div className="col-md-12 mb-5">
                                <label for="inputProfileImg" className="form-label">Profile Image</label>
                                <input type="file" className="form-control" id="inputProfileImg" onChange={handleUpload} placeholder="profile image" accept="image/png, image/jpeg" ref={inputProfileImg} />
                            </div>
                            <div className="col-md-12 mb-5">
                                <label for="inputCoverImg" className="form-label">Cover Image</label>
                                <input type="file" className="form-control" id="inputCoverImg" onChange={handleUpload} placeholder="profile image" accept="image/png, image/jpeg" ref={inputCoverImg} />
                            </div>

                            <div id="preview">
                                <div className={`card-img-top coverImg-center`} id="preview-coverImg"  >
                                </div>
                                <div className={`profileImg-center shadow-lg p-1 bg-body rounded-circle`} id="preview-profileImg" >
                                </div>
                            </div>

                            <hr />
                        </div>

                        <div className="col-md-12">
                            <label for="inputDescription" className="form-label">Description</label>
                            <textarea className="form-control" id="inputDescription" rows="3" ref={inputDescription}></textarea>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                <div>

                                    {isFetching ? "Loading" : "Register"}

                                    {
                                        isFetching ?
                                            <CircularProgress disableShrink color="white" size="20px" className="ms-1" thickness={5} style={{ marginBottom: "-5px" }} />
                                            :
                                            <ExitToAppRoundedIcon className="ms-1" />
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    I have an account - <a href="/login">login </a>
                </div>
            </div>
        </React.Fragment>
    )
}

