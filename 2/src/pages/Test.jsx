import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
export default function Test() {
    return (
        <div>
            Test
            <Link to="/test2">test2</Link>
        </div>
    )
}
