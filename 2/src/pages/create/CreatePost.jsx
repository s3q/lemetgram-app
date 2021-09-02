
import React, { Component, useContext } from 'react'

import CreatePostBody from '../../components/CreatePostBody.jsx'



export default function Register() {
    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-center h-100 position-relative">
                <div className="body-container mt-5">
                    <CreatePostBody />
                </div>
            </div>
        </React.Fragment>
    )
}

