import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'


import Post from "../../components/Post.jsx"

import Api from "../../functions/Api"

export default function PreviewPost() {

    const { id } = useParams()

    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-center h-100 position-relative">
                <div className="body-container mt-5">

                    <Post postId={id} />
                </div>
            </div>
        </React.Fragment>
    )
}
