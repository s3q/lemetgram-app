import React, { useContext } from 'react'

import AddBoxIcon from '@material-ui/icons/AddBox';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';


import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

export default function ShareBar() {
    const context = useContext(AuthContext)

    return (
        <div className="card mb-5 mt-2 custom-card">
            <div className="d-flex flex-wrap p-4">
                <div>

                    <a type="button" href="#" className="btn btn-sm btn-light">
                        <div className="profileImg-lg" style={{ backgroundImage: `url(${context.user.profileImg})` }} > </div>
                        <span href="#" className="username-lg">{context.user.username}</span>
                    </a>
                </div>
                <div className="ms-auto">
                    <Link to="/create/post" type="button" className="btn btn-sm btn-secondary text-dark d-block">Add Post  <AddBoxIcon /></Link>
                    <Link to="/settings" type="button" className="btn btn-sm btn-danger text-dark d-block mt-3">Settings  <SettingsRoundedIcon /></Link>
                    <Link to="/explore" type="button" className="btn btn-sm btn-warning d-block mt-3">Explore  <ExploreIcon /></Link>
                </div>
            </div>
        </div>
    )
}
