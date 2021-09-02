import React, { Component, useState, useEffect, useContext } from 'react';
import {
    Link,
    useParams,
    useHistory

} from 'react-router-dom';


import { AuthContext } from '../context/AuthContext';

import Api from '../functions/Api';



export default function AsideBar() {

    const context = useContext(AuthContext)

    const [friends, setFriends] = useState([])


    function UserDev({ user }) {

        let isConnected = false;
        console.log(context.usersIsConnected)
        if (context.usersIsConnected.some(u => u.userId == user._id))
            isConnected = true;
        console.log(isConnected);

        return (
            <Link to={`/profile/${user.username}`} class="btn btn-light d-flex align-items-center position-relative mt-2">

                <div className="profileImg" style={{ backgroundImage: `url(${user.profileImg})` }}></div>
                <span className="username position-relative" href="#">
                    {user.username}
                </span>

                {
                    function () {
                        if (isConnected == true) {
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


    const fetchUserFriends = async () => {
        let friendsAv = Array.from(friends)
        console.log(friendsAv)
        await Promise.all(context.user.followings.map(async userId => {
            await Api.fetchUser(userId).then(res => {
                console.log(res.data)
                friendsAv.push(res.data)
            })
        }))
        setFriends(friendsAv)
    }

    useEffect(() => {
        fetchUserFriends()

    }, [])


    return (
        <div className="h-md-100  rigth-side position-relative" style={{}}>
            <aside className="bd-sidebar sticky-top ">
                <nav className="navbar navbar-expand-md navbar-light bg-light bd-users_nav shadow" style={{ borderRadius: "1.25rem" }}>
                    <div className="p-3">
                        <button className="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo04" aria-controls="navbarTogglerDemo04" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="p-3 collapse navbar-collapse flex-md-wrap" id="navbarTogglerDemo04">
                            <div className="mb-3">
                                <p className="fw-bold">Online Friends</p>
                                {
                                    friends.map(user => {
                                        return <UserDev user={user} key={user._id} />
                                    })
                                }
                            </div>
                            <div className="">
                                <p className="fw-bold">Suggestions For You</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}



// class AsideBar extends Component {
//     // props : userId
//     state = {
//         user: {}
//     }

//     UserDev({ user, userStatus }) {
//         return (
//             <a href={`profile/${user.username}`} type="button" className="btn btn-sm btn-light d-block position-relative mt-2">
//                 <img className="profileImg" src={user.profileImg} alt="" />
//                 <span className="username position-relative" href="#">
//                     {user.username}
//                 </span>

//                 {
//                     function () {
//                         if (userStatus == "true") {
//                             return (
//                                 <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success rounded-circle">
//                                     <span className="visually-hidden">New alerts</span>
//                                 </span>
//                             )
//                         }
//                     }()
//                 }

//             </a>
//         )
//     }



//     fetchUser = async () => {
//         await Api.fetchUser(this.props.userId).then(res => {
//             this.setState({ user: res.data })
//         })
//     }



//     componentDidMount() {
//         this.fetchUser()

//     }

//     render() {
//         return (
//             <div className="h-md-100  rigth-side position-relative" style={{}}>
//                 <aside className="bd-sidebar sticky-top">
//                     <nav className="navbar navbar-expand-md navbar-light bg-light bd-users_nav">
//                         <div className="">
//                             <button className="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo04" aria-controls="navbarTogglerDemo04" aria-expanded="false" aria-label="Toggle navigation">
//                                 <span className="navbar-toggler-icon"></span>
//                             </button>
//                             <div className="p-3 collapse navbar-collapse flex-md-wrap" id="navbarTogglerDemo04">
//                                 <div className="mb-3">
//                                     <p className="fw-bold">Online Friends</p>
//                                     {
//                                         <this.UserDev user={this.state.user} key={this.state.user.id} userStatus="true" />
//                                     }
//                                 </div>
//                                 <div className="">
//                                     <p className="fw-bold">Suggestions For You</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </nav>
//                 </aside>
//             </div>
//         )
//     }
// }


// export default AsideBar
