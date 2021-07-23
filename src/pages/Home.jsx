import React, { Component, useContext, useState, useEffect} from 'react'

// components :
import Navbar from "../components/Navbar.jsx"
import AsideBar from "../components/AsideBar.jsx"
import Body from "../components/Body.jsx"
import Users from "../data/Users"

// context :
import { AuthContext } from '../context/AuthContext.js'
import { autoLoginApiContext } from "../ApiContext"


export default function Home() {
    const context = useContext(AuthContext)
    
    const [ user, setUser ] = useState() 

    return (
        <React.Fragment>
            <div className="d-flex flex-column flex-md-row h-100 position-relative">
                <AsideBar />
                <Body />
            </div>
        </React.Fragment>
    )
}


// export default class Home extends Component {
//     // props : userId
//     constructor(props) {
//         super(props)
//         console.log(props)
//     }

//     state = {
//         user: {}
//     }

//     fetchUser = async () => {
//         await Api.fetchUser(this.props.userId).then(res => {
//             this.setState({ user: res.data })
//         })
//     }

//     componentDidMount() {
//         this.fetchUser()
//         let value = this.context;
//         console.log(value)
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="d-flex flex-column flex-md-row h-100 position-relative">
//                     <AsideBar userId={this.props.userId} />
//                     <Body userId={this.props.userId} />
//                 </div>
//             </React.Fragment>
//         )
//     }
// }
// Home.contextType = AppContext
