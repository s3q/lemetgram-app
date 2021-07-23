import { createContext, useReducer , useEffect, useState, useRef} from "react"
import Api from "../functions/Api"
import Browser from "../functions/Browser"
import AuthReducer from "./AuthReducer"

import { io } from "socket.io-client"


const INITAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}


export const AuthContext = createContext(INITAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE)
    const [usersIsConnected, setUsersIsConnected] = useState([])
    const [socket, setSocket] = useState([])
      
    useEffect(() => setSocket(io("ws://lemetgram-socket.herokuapp.com")), [])

    useEffect(() => {
        
    
        if (state.user && state.user._id) {
            socket.emit("isConnected", state.user._id)
            socket.on("usersIsConnected", users => {
                console.log(users)
                setUsersIsConnected(users)
            })
        }
    }, [socket, state])


    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,

            socket: socket,
            usersIsConnected,

            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}