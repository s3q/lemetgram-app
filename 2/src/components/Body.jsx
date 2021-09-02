import React, { Component, useEffect, useState, useContext } from 'react';

import SahreBar from "./SahreBar.jsx"
import Post from "./Post.jsx"


import { CircularProgress, LinearProgress } from "@material-ui/core"


import axios from "axios"
import Api from "../functions/Api"
import { AuthContext } from '../context/AuthContext.js';



export default function Body() {

    const context = useContext(AuthContext)

    const [user, setUser] = useState(context.user)
    const [posts, setPosts] = useState([])

    const [isFetching, setIsFetching] = useState(false)
    const [isFinishing, setIsFinishing] = useState(false)



    const fetchPosts = async () => {
        setIsFetching(true)
        await Api.fetchAllPostsId(context.user._id).then(res => {
            console.log(res.data)
            setPosts(res.data)
            setIsFetching(false)
        })

    }

    useEffect(() => {
        setIsFetching(false)
        fetchPosts()
        // fetchUser()
    }, [])

    return (
        <div className="body-container">
            <SahreBar />

            <div className="">
                <div className="mb-4">
                    {
                        isFetching ?
                            <LinearProgress />
                            :
                            <div className="bg-light" style={{ padding: ".12rem" }}></div>
                    }
                </div>
                {
                    posts.map(post => {
                        console.log(post._id)
                        return <Post key={post._id} postId={post._id} />
                    })
                }

            </div>
        </div>
    )
}



// export default class Body extends Component {

//     // props : userId

//     constructor(props) {
//         super(props)
//     }

//     state = {
//         posts: [],
//         user: {}
//     }



//     fetchUser = async () => {
//         await Api.fetchUser(this.props.userId).then(res => {
//             this.setState({ user: res.data })
//         })
//     }


//     fetchPosts = async () => {

//         await Api.fetchAllPosts(this.props.userId).then(res => {
//             this.setState({ posts: res.data })
//         })

//     }

//     componentDidMount() {
//         this.fetchPosts()
//         this.fetchUser()
//     }

//     // componentDidUpdate(prevProps, prevState) {}

//     render() {
//         return (
//             <div className="body-container">
//                 <SahreBar user={this.state.user} />

//                 <div className="">
//                     {
//                         this.state.posts.map(post => {
//                             return <Post key={post._id} post={post} userId={this.props.userId} />
//                         })
//                     }

//                 </div>
//             </div>
//         )
//     }
// }
