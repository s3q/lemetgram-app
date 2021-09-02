import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,

} from "react-router-dom";

import PreviewPost from "../pages/preview/PreviewPost.jsx"

export default function CreateRouter() {
    return (
        <Route path="/preview/post/:id" >
            <PreviewPost />
        </Route>

    )
}
