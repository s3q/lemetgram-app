import React, { useContext } from 'react'
import ChatAsideCss from './ChatAside.css'

import ListIcon from '@material-ui/icons/List';

import { AuthContext } from '../../context/AuthContext'

export default function ChatAside() {
    const context = useContext(AuthContext)

    function UserDev({ user, userStatus }) {
        return (
            <a href={`profile/${user.username}`} type="button" className="btn btn-sm btn-light d-block position-relative mt-2">
                <img className="profileImg" src={user.profileImg} alt="" />
                <span className="username position-relative" href="#">
                    {user.username}
                </span>

                {
                    function () {
                        if (userStatus == "true") {
                            return (
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            )
                        }
                    }()
                }

            </a>
        )
    }


    return (
        <React.Fragment>

            <div className="position-relative h-100 ">

            <button class="btn btn-light position-absolute" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <ListIcon/>
            </button>

                <aside className="bd-sidebar sticky-top m-3 d-none d-sm-block">
                    <nav className="navbar navbar-light bg-light bd-users-nav-chat shadow" style={{ borderRadius: "1.25rem" }}>
                        <div className="p-3 mb-3">
                            <div className="">
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />

                            </div>
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
                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />
                                <UserDev user={context.user} key={context.user._id} userStatus="true" />

                </div>
            </div>
        </React.Fragment>



    )
}
