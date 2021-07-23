import { Redirect, useHistory } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'

import Api from '../functions/Api'

import { AuthContext } from '../context/AuthContext'
import { updateLoginApiContext } from "../ApiContext"


export default function Settings() {
    const context = useContext(AuthContext)
    const history = useHistory()


    const handleDeleteUser = async () => {
        console.log(context.user._id)
        Api.deleteUser(context.user._id, context.user._id).then(res => {
            if (res == 200) {
                console.log(context)
                return window.location.pathname = "/"
            }
        })
    }
    return (
        <div>
            <button className="btn btn-primary " onClick={handleDeleteUser} >delete this user</button>
        </div>
    )
}
