import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,

} from "react-router-dom";

import CreatePost from "../pages/create/CreatePost.jsx"

export default function CreateRouter() {
    return (
        <Route path="/create/post" >
            <CreatePost />
        </Route>

    )
}
