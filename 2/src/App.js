
import React, { useState, useContext, useEffect } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,

} from "react-router-dom";

// Pages 
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Settings from "./pages/Settings.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Navbar from "./components/Navbar.jsx"
import Explore from "./pages/Explore.jsx"

import Chat from "./pages/chat/Chat.jsx"

// Router
import CreateRouter from "./router/Create"
import PreviewRouter from "./router/Preview"
import ChatRouter from "./router/Chat"


import Browser from "./functions/Browser"
import { AuthContext } from "./context/AuthContext.js"
import { updateLoginApiContext, autoLoginApiContext } from "./ApiContext"


const updateLogin = async (dispatch) => {
    await updateLoginApiContext(dispatch)
    setInterval(async () => {
        await updateLoginApiContext(dispatch)
    }, 20000)
}


function App() {
    const context = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)

    useEffect(async () => {
        await autoLoginApiContext(context.dispatch)
        await updateLogin(context.dispatch)
    }, []);

    const handleRedirect = () => {

        const loginId = Browser.getCookie("loginId")
        const userId = Browser.getCookie("userId")

        if (userId && loginId) {
            return null
        } else {
            return <Redirect to="/login" />
        }
    }

    return (
        <Router>
            <Navbar isUserLogin={true} />
            <Switch>
                <Route exact path="/">
                    {context.user?._id ? <Home /> : handleRedirect()}
                </Route>
                <Route path="/profile/:username">
                    {context.user?._id ? <Profile /> : handleRedirect()}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/preview/post/:id">
                    {context.user?._id ? <PreviewRouter /> : handleRedirect()}
                </Route>
                <Route path="/create">
                    {context.user?._id ? <CreateRouter /> : handleRedirect()}
                </Route>
                <Route path="/settings">
                    {context.user?._id ? <Settings /> : handleRedirect()}

                </Route>
                <Route path="/chat">
                    {context.user?._id ? <ChatRouter /> : handleRedirect()}
    
                </Route>
                <Route path="/explore">
                    {context.user?._id ? <Explore /> : handleRedirect()}
    
                </Route>
            </Switch>
        </Router>
    )

}




export default App;
