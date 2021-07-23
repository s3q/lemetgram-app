import React, { useContext, useState, useEffect, useRef } from 'react'
import {
    Link,
    useParams,
    useHistory

} from 'react-router-dom';

import { io } from "socket.io-client"
// import ChatAsideCss from './chatStyle/ChatAside.css'
// import ChatBoxCss from './chatStyle/ChatBox.css'

import ChatStyle from './ChatStyle.css'

import SendIcon from '@material-ui/icons/Send';
import ListIcon from '@material-ui/icons/List';
import AddCommentIcon from '@material-ui/icons/AddComment';

import { format } from "timeago.js"


import { AuthContext } from '../context/AuthContext'
import Api from '../functions/Api';


export default function ChatBody() {
    const context = useContext(AuthContext)

    const history = useHistory()
    // ############# -- socket -- ##################

    // const socket = useRef()

    // useEffect(() => socket.current = io("ws://localhost:8900"), [])

    // const [usersIsConnected, setUsersIsConnected] = useState([])
    // useEffect(() => {
    // context.socket.on("usersIsConnected", users => {
    //     console.log("IS CON:", users)
    //     setUsersIsConnected(users)
    //     getUsersConversationWith()
    // })
    //     console.log(context.usersIsConnected)
    // }, [context])




    const [conversations, setConversations] = useState([])

    const [conversation, setConversation] = useState({})
    const [followingsUsers, setFollowingsUsers] = useState({})

    const [conversationMessages, setConversationMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)


    const [usersConversationMessagesWith, setUsersConversationMessageWith] = useState([])

    const [usersConversationsWith, setUsersConversationsWith] = useState({})
    const { conversationId } = useParams()

    const messageRef = useRef()
    const scrollRef = useRef()


    useEffect(async () => {
        let followingsUsersAv = Object.create(followingsUsers)
        await Promise.all(context.user.followings.map(async userId => {
            await Api.fetchUser(userId).then(res => {
                followingsUsersAv[res.data._id] = res.data
            })
        })).then(() => {

            setFollowingsUsers(followingsUsersAv)
        })

    }, [context])

    useEffect(() => {

        context.socket.on("getMessage", data => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])

    useEffect(() => {
        if (arrivalMessage && conversation && conversation._id) {
            if (conversation.members.includes(arrivalMessage.senderId)) {
                setConversationMessages(prev => [...prev, arrivalMessage])
            }
        }
    }, [arrivalMessage, conversation])


    const getUsersConversationWith = () => {
        Promise.all(conversations.map(c => {
            c.members.map(m => {
                if (m != context.user._id) {
                    Api.fetchUser(m).then(res => {
                        if (res.status == 200 && res.data._id) {
                            let usersConversationsWithAv = Object.create(usersConversationsWith)

                            let userIsConnected = false

                            if (context.usersIsConnected.some(user => user.userId == res.data._id))
                                userIsConnected = true

                            // if (!Array.from(Object.values(usersConversationsWithAv)).some(uc => uc.conversationId == c._id)) {
                            //     usersConversationsWithAv[res.data._id] = {
                            //         user: res.data,
                            //         conversationId: c._id,
                            //         userIsConnected: userIsConnected
                            //     }
                            // }

                            usersConversationsWithAv[res.data._id] = {
                                user: res.data,
                                conversationId: c._id,
                                userIsConnected: userIsConnected
                            }


                            setUsersConversationsWith(usersConversationsWithAv)

                        }
                    })
                }
            })
        }))

    }

    const getConversation = async () => {
        await Api.getConversationByid(conversationId, context.user._id).then(async res => {

            let usersConversationMessagesWithAv = Array.from(usersConversationMessagesWith)
            await Promise.all(res.data.members.map(async mId => {
                if (!usersConversationMessagesWithAv.some(value => value._id == mId)) {
                    await Api.fetchUser(mId).then(res => {
                        usersConversationMessagesWithAv.push(res.data)
                    })
                }
            })).then(() => {
                setUsersConversationMessageWith(usersConversationMessagesWithAv)
            })

            setConversation(res.data)
        })
    }



    const getConversationMessages = async () => {
        if (conversation && conversation._id) {
            const secondUser = conversation.members.filter(u => u != context.user._id)
            Api.getConversationMessages(conversationId, context.user_id, secondUser).then(async res => {
                if (res.status == 200 && res.data.length > 0) {
                    setConversationMessages(res.data)
                }
            })
        }
    }

    const getUsersConversationMessagesWith = async () => {
        // if (conversationMessages && conversationMessages.length > 0) {
        conversationMessages.forEach(async cm => {
            if (cm.senderId != context.user._id) {
                await Api.fetchUser(cm.senderId).then(res => {
                    let usersConversationMessagesWithAv = Array.from(usersConversationMessagesWith)
                    usersConversationMessagesWithAv.push(res.data)
                    setUsersConversationMessageWith(usersConversationMessagesWithAv)
                })
                return
            }
        })
        // }
    }



    useEffect(async () => {
        await Api.getUserConversations(context.user._id).then(res => {
            setConversations(res.data)

            getUsersConversationWith()
        })
        getConversation()
    }, [conversationId])


    useEffect(() => {
        getUsersConversationWith()
    }, [conversations, context])

    useEffect(() => {
        getConversationMessages()
    }, [conversation])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [conversationMessages])



    // send message
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (conversation && conversation._id) {
            let messageText = messageRef.current.value
            if (messageText && messageText.length > 0) {

                Api.createMessage(conversation._id, context.user._id, messageText).then(res => {
                    getConversationMessages()
                    messageRef.current.value = ""
                })

                const receiverId = conversation.members.find(member => member != context.user._id)
                console.log(receiverId)
                context.socket.emit("sendMessage", {
                    senderId: context.user._id,
                    receiverId: receiverId,
                    text: messageText
                })
            }
        }
    }

    const handleNewConversation = async (e) => {
        const username = e.target.textContent.trim()
        await Api.fetchUser(username, "username").then(res => {
            console.log(res.data)
            let userId = res.data._id
            console.log(userId)
            try {
                Api.getConversation(context.user._id, userId ).then(resConv => {
                    if (resConv.status == 200 && resConv.data)
                        history.push(`/chat/${resConv.data._id}`)
                    else Api.createConversation(context.user._id, userId).then(resConv2 => {
                        if (resConv2.status == 200 && resConv2.data)
                            history.push(`/chat/${resConv2.data._id}`)
                        setConversation(prev => [...prev, resConv2.data])
                    })
                })
            } catch (err) {
                Api.createConversation(context.user._id, userId).then(resConv => {
                    if (resConv.status == 200)
                        history.push(`/chat/${resConv.data._id}`)
                    setConversation(prev => [...prev, resConv.data])
                })
            }

        })
    }


    function UserDev({ data, conversationId }) {
        return (
            <Link to={`/chat/${conversationId}`} class="btn btn-light d-flex align-items-center position-relative mt-2" id={conversationId}>

                <div className="profileImg" style={{ backgroundImage: `url(${data.user.profileImg})` }}></div>
                <span className="username position-relative" href="#">
                    {data.user.username}
                </span>

                {
                    function () {
                        if (data.isConnected == true) {
                            return (
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            )
                        }
                    }()
                }

            </Link>
        )
    }

    function UserBoxDev() {
        return (
            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                <button type="button" class="btn btn-warning mb-3" data-bs-toggle="modal" data-bs-target="#newConversationModal"><AddCommentIcon /></button>

                {
                    Array.from(Object.values(usersConversationsWith)).map(uc => {
                        return <UserDev data={{ user: uc.user, isConnected: uc.userIsConnected }} key={uc.user._id} conversationId={uc.conversationId} />
                    })
                }

            </div>
        )
    }

    function MessageDev({ message }) {
        let senderType = "puT"
        if (message.senderId == context.user._id) {
            senderType = "puO"
        }
        let user = usersConversationMessagesWith.filter(u => u._id == message.senderId)[0]
        return (
            <div className={`msgbox ${senderType}`} ref={scrollRef}>
                <Link className="profileImg-sm" to={`/profile/${user.username}`} style={{ backgroundImage: `url(${user.profileImg})` }}></Link>
                <div className="msg">
                    <div className="msg-text">
                        {message.text}
                    </div>
                    <div><small className="msg-time text-muted">{format(message.createdAt)}</small></div>
                </div>
            </div>
        )
    }

    function MessageBoxDev() {

        return (
            <React.Fragment>

                <div className="m-5">

                </div>

                {
                    Array.from(Object.values(conversationMessages)).map(cm => {

                        return <MessageDev message={cm} key={cm._id} />
                    })
                }


                {
                    conversation._id ?

                        <nav class="navbar position-fixed navbar-light bg-light mt-5 pb-sm-5 bg-body rounded nav-form">
                            <form class="container-fluid" id="form_message" onSubmit={handleSubmit}>

                                <div class="input-group">
                                    {/* <span class="input-group-text">#</span> */}
                                    <textarea type="text" name="message" id="message" rows="1" cols="80" class="form-control" placeholder="Message ...." autocomplete="off" spellcheck="false" required style={{ maxHeight: "100px" }} ref={messageRef}></textarea>
                                    <button class="btn btn-warning"><SendIcon /></button>
                                </div>

                            </form>
                        </nav>
                        : null
                }

            </React.Fragment>

        )
    }

    return (
        <React.Fragment>
            <React.Fragment>

                <div className="position-relative h-100 ">

                    <button class="btn btn-light position-absolute" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <ListIcon />
                    </button>

                    <aside className="bd-sidebar sticky-top m-3 d-none d-sm-block">
                        <nav className="navbar navbar-light bg-light bd-users-nav-chat shadow" style={{ borderRadius: "1.25rem" }}>
                            <div className="p-3 mb-3">
                                <UserBoxDev />
                            </div>
                        </nav>
                    </aside>
                </div>


                <div class="offcanvas offcanvas-start rounded" style={{ width: "200px" }} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column align-items-start">
                        <UserBoxDev />
                    </div>
                </div>
            </React.Fragment>

            <React.Fragment>
                <div class="container" >

                    <div id="message_box">

                        {/* <div class="tab-content" id="v-pills-tabContent">

                        </div> */}
                        <MessageBoxDev />

                    </div>


                </div>
            </React.Fragment>

            <div className="modal fade" id="newConversationModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Conversation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div class="btn-group-vertical w-100">

                                {
                                    Array.from(Object.values(followingsUsers)).map(user => {

                                        return <button className="btn btn-light" onClick={handleNewConversation} data-bs-dismiss="modal" aria-label="Close"> {user.username}</button>
                                    })
                                }

                            </div>

                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

