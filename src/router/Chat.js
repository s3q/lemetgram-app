import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,

} from "react-router-dom";

import Chat from "../pages/chat/Chat.jsx"

export default function CreateRouter() {
    return (
        <React.Fragment>

            <Route exact path="/chat/:conversationId" >
                <Chat />
            </Route>
            <Route exact path="/chat/" >
                <Chat />
            </Route>
        </React.Fragment>
    )
}
