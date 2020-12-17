import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [user, setUser] = useState([])

    const getUserById = id => {
        return fetch(`http://localhost:8088/user/${id}`)
            .then(res => res.json())
            .then(setUser)
    }

    return (
        <UserContext.Provider value={
            {
                getUserById, user, setUser
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}