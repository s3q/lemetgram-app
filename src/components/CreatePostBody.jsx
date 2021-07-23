import React, { useContext, useRef, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

import url_join from "url-join"
import uuid from "uuid"
import Api from '../functions/Api';
import { AuthContext } from '../context/AuthContext';
import { updateLoginApiContext } from "../ApiContext"


import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, LinearProgress } from "@material-ui/core"
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Backdrop from '@material-ui/core/Backdrop';
import Browser from '../functions/Browser';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 1000000000000,
        color: '#fff',
    },
}));


export default function PostPostBody() {

    const context = useContext(AuthContext)

    const inputMedia = useRef()
    const inputTitle = useRef()
    const inputDescription = useRef()

    const [isFetching, setIsFetching] = useState(false)
    const [isFinishing, setIsFinishing] = useState(false)

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const ALLOWED_IMG = ["image/png", "image/jpeg"]
    const ALLOWED_IMG_SIZE = 5

 
    useEffect(() => {

        updateLoginApiContext(context.dispatch)

    }, [isFinishing])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFetching) {

            setIsFinishing(false)
            setOpenBackdrop(true)
            setIsFetching(true)


            const [file] = inputMedia.current.files

            const postData = {
                userId: context.user._id,
                title: inputTitle.current.value,
                desc: inputDescription.current.value,
                img: ""
            }

            try {
                const fromData = new FormData()
                fromData.append("file", file)


                await Api.createPost(postData, fromData).then(async res => {
                    console.log(res)
                    
                    setIsFetching(false)
                    setIsFinishing(true)
                })

            } catch (err) {
                console.error(err)
            }

        }
    }


    const handleUpload = async (e) => {

        const [file] = e.target.files

        if (file && ALLOWED_IMG.includes(file.type)) {

            const fileSize = file.size / 1000 / 1000
            
            const img = document.getElementById("preview-img");

            if (file && fileSize < ALLOWED_IMG_SIZE) {
                img.hidden = false

                const reader = new FileReader();
                reader.onload = (event) => {
                    let imgDataurl = event.target.result;
                    img.style.backgroundImage = `url(${imgDataurl})`

                    // Browser.resizeImage(imgDataurl, file.type, quality).then(res => {
                    //     let newFileSize = res.length / 100000
                    //     if (newFileSize < 1) {
                    //         img.style.backgroundImage = `url(${imgDataurl})`
                    //     }
                    // })
                    // Browser.compressImg(img, file.type)
                    // Browser.resizeFile(img)
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
                isFinishing ? <Redirect exact to={`/profile/${context.user.username}`} /> : <Redirect to="/create/post" />
            }
            <div className="card text-center m-auto custom-card" style={{ maxWidth: "500px" }}>

                <div className="card-header">
                    CREAT POST
                </div>
                {
                    isFetching ?
                        <LinearProgress />
                        :
                        <div className="bg-light" style={{ padding: ".12rem" }}></div>
                }
                <div className="card-body">

                    <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label for="inputTitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="inputTitle" placeholder="Title" ref={inputTitle} maxlength="40" />
                        </div>
                        <div className="g-4 mb-5 mt-5">
                            <hr />
                            <div className="col-md-12 mb-5">
                                <label for="inputMedia" className="form-label">Media File</label>
                                <input type="file" className="form-control" id="inputMedia" placeholder="Media File" onChange={handleUpload} accept="image/png, image/jpeg" ref={inputMedia} />
                            </div>
                            <div id="preview">
                                <div sizes="614px" className={`card-img-bottom feedImg`} id="preview-img">
                                </div>
                            </div>
                            <hr />
                        </div>

                        <div className="col-md-12">
                            <label for="inputDescription" className="form-label">Description</label>
                            <textarea className="form-control" id="inputDescription" rows="3" ref={inputDescription} maxlength="150"></textarea>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">

                                <div>

                                    {isFetching ? "Loading" : "Send Post"}

                                    {
                                        isFetching ?
                                            <CircularProgress disableShrink color="white" size="20px" className="ms-1" thickness={5} style={{ marginBottom: "-5px" }} />
                                            :
                                            <SendRoundedIcon className="ms-1" />
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
