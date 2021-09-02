import React, { Component, useEffect, useState, useContext } from 'react'

// import {addLike} from "../functions/Post"

import axios from "axios"
import { format } from "timeago.js"
import Api from "../functions/Api"
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { updateLoginApiContext } from "../ApiContext"

import { v4 as uuidv4 } from 'uuid';


import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import { CircularProgress, LinearProgress } from "@material-ui/core"


export default function Post(props) {
    // props : postId, posts
    const context = useContext(AuthContext)

    const [user, setUser] = useState({})
    const [post, setPost] = useState({})
    const [likeCount, setLikeCount] = useState(0)
    const [isLike, setIsLike] = useState(false)

    const [modalId, setModalId] = useState(`A${uuidv4()}`)


    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        updateLoginApiContext(context.dispatch)
    }, [isLike])


    const fetchPost = async () => {
        setIsFetching(true)
        await Api.fetchPost(props.postId).then(res => {
            setPost(res.data)
        })
    }

    const fetchUser = async () => {
        await Api.fetchUser(post.userId).then(res => {
            setUser(res.data)
        })
    }



    useEffect(() => {

        if (post._id) {
            setIsFetching(false)

            setLikeCount(post?.likes.length)
            setIsLike(post?.likes.includes(context.user._id))
            fetchUser()
        }


    }, [post])

    useEffect(() => {
        setIsFetching(false)
        fetchPost()
    }, [props.postId])


    const likePost = async () => {
        console.log(context.user._id)
        const res = await Api.likePost(post._id, context.user._id)
        return res.status
    }


    const handlerLike = async () => {
        const resStatus = await likePost()
        if (resStatus == 200) {
            if (isLike) {
                post.likes = post.likes.filter(e => {
                    return e != context.user._id
                })
            } else {
                post.likes.push(context.user._id)
            }

            setLikeCount(post?.likes.length)
            setIsLike(!isLike)

            // await updateLoginApiContext(context.dispatch)
        }
    }


    function handleLikeStatusDev() {

        if (isLike == true || isLike == "true") {
            return <FavoriteIcon />
        } else {
            return <FavoriteBorderIcon />
        }

    }

    const handelDeletePost = async () => {
        if (post._id) {

            let posts = props.state.posts
            posts = posts.filter(p => p._id != post._id)

            props.state.setPosts(posts)

            await Api.deletePost(post._id, context.user._id).then(res => {
                console.log(res.data)
                if (res == 200) {
                    setPost({});
                    return <Redirect to={`/profile/${context.user.username}`} />
                }
            })
        }
    }


    return (
        <React.Fragment>
            <div className="card mb-5 custom-card">
                <div className="card-header d-flex">

                    <div>

                        <Link to={`/profile/${user.username}`} className="btn btn-sm btn-light d-flex align-items-center">

                            <div className={`profileImg ${user.profileImg ? `loadImg` : `isLoading`}`} style={{ backgroundImage: (!user.profileImg ? `` : `url(${user.profileImg})`) }} ></div>
                            <span className="username">{user.username}</span>
                        </Link>
                    </div>

                    <button type="button" id={`B${uuidv4()}`} className="btn btn-sm btn-light ms-auto rounded-pill" data-bs-toggle="modal" data-bs-target={`#${modalId}`} >
                        <MoreHorizIcon />
                    </button>


                </div>

                {
                    // isFetching ?
                    // <LinearProgress />
                    // :
                    // <div className="bg-light" style={{ padding: ".12rem" }}></div>
                }

                <div style={{ backgroundImage: (!post.img ? `` : `url(${post.img})`) }} sizes="614px" className={`card-img-bottom feedImg ${post.img ? `loadImg` : `isLoading`}`}>
                    {isFetching ?
                        <CircularProgress color="secondary" />
                        :
                        null
                    }
                </div>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>


                    <p className="card-text">{post.desc}</p>
                    <p className="card-text"><small className="text-muted">{format(post.createdAt)}</small></p>
                    <button className="btn btn-sm btn-danger text-dark" onClick={() => handlerLike()}>
                        {handleLikeStatusDev()}
                        <span className="badge bg-light text-dark ms-1">{isFetching ? <CircularProgress size={10} /> : likeCount}</span>
                    </button>
                    {/* <button className="btn btn-sm btn-warning ms-4">
            <ChatBubbleOutlineIcon />
            <span className="badge bg-light text-dark ms-1">{postCommentCount}</span>
        </button> */}
                </div>
            </div>


            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`B${uuidv4()}`} aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{user.username} - post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {
                                post.userId == context.user._id ? (

                                    <div class="btn-group-vertical w-100">
                                        <button className="btn btn-light" onClick={handelDeletePost} data-bs-dismiss="modal" aria-label="Close"> delete</button>
                                        <button className="btn btn-light" onClick={() => {
                                            let postLink = `${window.location.host}/preview/post/${post._id}`
                                            navigator.clipboard.writeText(postLink)
                                        }}> getLink</button>
                                    </div>
                                )
                                    :
                                    null
                            }



                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}



// export default className Post extends Component {
//     // props : post , userId
//     constructor(props) {
//         super(props)
//     }
//     state = {
//         user: {},
//         isLike: false,
//         likeCount: 0
//     }



//     fetchUser = async () => {
//         await Api.fetchUser(this.props.post.userId).then(res => {
//             this.setState({ user: res.data })
//         })
//     }

//     componentDidMount() {
//         this.fetchUser()

//         this.state.likeCount = this.props.post?.likes.length
//         this.state.isLike = this.props.post?.likes.includes(this.props.userId)
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.userId !== this.props.userId) {
//             this.fetchUser()
//         }
//     }

//     likePost = async () => {
//         const res = await Api.likePost(this.props.post._id, this.props.userId)
//         return res.status
//     }


//     handlerLike = async () => {
//         const resStatus = await this.likePost()
//         if (resStatus == 200) {

//             if (this.state.isLike) {
//                 this.props.post.likes = this.props.post.likes.filter(e => {
//                     return e != this.props.userId
//                 })
//             } else {
//                 this.props.post.likes.push(this.props.userId)
//             }

//             this.setState({ likeCount: this.props.post?.likes.length })
//             this.setState({ isLike: !this.state.isLike })
//         }

//     }

//     handleLikeStatusDev() {

//         if (this.state.isLike == true || this.state.isLike == "true") {
//             return <FavoriteIcon />
//         } else {
//             return <FavoriteBorderIcon />
//         }

//     }

//     render() {

//         return (

//             <div className="card mb-3">
//                 <h5 className="card-header">
//                     <Link to={`/profile/${this.state.user.username}`} className="btn btn-sm btn-light">
//                         <img className="profileImg" src={this.state.user.profileImg} alt="" />
//                         <span className="username">{this.state.user.username}</span>
//                     </Link>
//                 </h5>
//                 <img src={this.props.post.img} className="card-img-bottom feedImg" alt="..." />
//                 <div className="card-body">
//                     <h5 className="card-title">{this.props.post.title}</h5>
//                     {

//                         /* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. 
//                         Card title
//                         */
//                     }
//                     <p className="card-text">{this.props.post.desc}</p>
//                     <p className="card-text"><small className="text-muted">{format(this.props.post.createdAt)}</small></p>
//                     <button className="btn btn-sm btn-danger text-dark" onClick={() => this.handlerLike()}>
//                         {this.handleLikeStatusDev()}
//                         <span className="badge bg-light text-dark ms-1">{this.state.likeCount}</span>
//                     </button>
//                     {/* <button className="btn btn-sm btn-warning ms-4">
//                     <ChatBubbleOutlineIcon />
//                     <span className="badge bg-light text-dark ms-1">{postCommentCount}</span>
//                 </button> */}
//                 </div>
//             </div>
//         )
//     }
// }


// export default function Post({ post }) {
//     console.log(post);
//     let postLikeCount = post.likes.length
//     console.log(postLikeCount);
//     let postIsLike = true

//     const [like, setLike] = useState(postLikeCount)
//     const [isLike, setIsLike] = useState(postIsLike)

//     function addLike() {
//         setLike(isLike ? like - 1 : like + 1)
//         setIsLike(!isLike)
//     }

//     const user = {
//         username: "s3q",
//         profileImg: "profile.jpg"
//     }

//     return (
//         <div className="card mb-3">
//             <h5 className="card-header">
//                 <a href="#" type="button" className="btn btn-sm btn-light">
//                     <img className="profileImg" src={user.profileImg} alt="" />
//                     <span href="#" className="username">{user.username}</span>
//                 </a>
//             </h5>
//             <img src={post.img} className="card-img-bottom feedImg" alt="..." />
//             <div className="card-body">
//                 <h5 className="card-title">{post.title}</h5>
//                 {
//                     /* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. 
//                     Card title
//                     */
//                 }
//                 <p className="card-text">{post.desc}</p>
//                 <p className="card-text"><small className="text-muted">{post.createdAt} ago</small></p>
//                 <button className="btn btn-sm btn-danger text-dark" onClick={addLike()}>
//                     {
//                         function () {
//                             if (isLike == "true") {
//                                 return <FavoriteIcon />
//                             } else {
//                                 return <FavoriteBorderIcon />
//                             }
//                         }()
//                     }

//                     <span className="badge bg-light text-dark ms-1">{like}</span>
//                 </button>
//                 {/* <button className="btn btn-sm btn-warning ms-4">
//                     <ChatBubbleOutlineIcon />
//                     <span className="badge bg-light text-dark ms-1">{postCommentCount}</span>
//                 </button> */}
//             </div>
//         </div>
//     )
// }
