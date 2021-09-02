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
            Test2
            <Link to="/test">test</Link>
        </div>
    )
}
