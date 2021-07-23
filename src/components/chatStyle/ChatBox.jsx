import React from 'react'
import {
    Link,
    useHistory

} from 'react-router-dom';



import ChatBoxCss from './ChatBox.css'

import SendIcon from '@material-ui/icons/Send';


export default function ChatBox() {

    function MessageDev() {
        return (
            <div className="msgbox puO">
                <Link className="profileImg" to="/">

                </Link>
                <div className="msg">
                    <div className="msg-text">

                     lkljljklh ddj dfdso hisudh ihfis dufh ihif uhiudfhuid ghfddddddddddddd
                    </div>
                    <div><small className="msg-time text-muted">1 hours ago</small></div>
                </div>
            </div>

        )
    }

    return (

        <div class="container" >

            <div id="message_box">
                <div id="info">Welcom To Equl Chat.</div>
                <div id="info">Welcom To Equl Chat.</div>
                <div id="info">Welcom To Equl Chat.</div>
                <MessageDev/>
                <MessageDev/>
                <MessageDev/>
                <MessageDev/>
                <MessageDev/>
                


                <nav class="navbar position-fixed navbar-light bg-light mt-5 pb-sm-5 bg-body rounded nav-form">
                    <form class="container-fluid" id="form_message">

                        <div class="input-group">
                            {/* <span class="input-group-text">#</span> */}
                            <textarea type="text" name="message" id="message" rows="1" cols="80" class="form-control" placeholder="Message ...." autocomplete="off" spellcheck="false" required style={{ maxHeight: "100px" }}></textarea>
                            <button class="btn btn-warning"><SendIcon/></button>
                        </div>

                    </form>
                </nav>

            </div>


        </div>
    )
}

