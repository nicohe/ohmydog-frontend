import axios from 'axios';
import { createContext, useState } from 'react'
import { getBasicAuth } from '../utils/auth';

const baseUrl = 'http://localhost:8000'
const basicauth = { auth: { username: 'user1@mail.com', password: 'user1' } }

const UsersContext = createContext({
    usersLoading: true,
    userDetail: {},
    retrieveUser: () => {},
    loginHandler: () => {},
    userLoginError: null
})

export const UsersContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userDetail, setUserDetail] = useState(localStorage.getItem('user') || {})
    const [userLoginError, setUserLoginError] = useState({})

    const retrieveUserHandler = async () => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/users/me/`, getBasicAuth())
            .then((res) => {
                setUserDetail(res.data)
            })
            .catch((err) => {
                setUserDetail({})
                console.log('error retrieving user', err.response)
            })
        setIsLoading(false)
    }

    const loginHandler = async ({username, password}) => {
        setIsLoading(true)

        const basicauth = { auth: { username, password } }
        await axios
            .get(`${baseUrl}/users-api/users/me/`, basicauth)
            .then((res) => {
                // localStorage.setItem('user', JSON.stringify({ username, password }))
                localStorage.setItem('user', JSON.stringify({ ...res.data, password }))
                setUserDetail(res.data)
                setUserLoginError({})
            })
            .catch((err) => {
                setUserDetail({})
                setUserLoginError({ detail: 'Usuario o contraseña incorrecta'})
                console.log('Error al iniciar sesion', err.response)
            })


        setIsLoading(false)
    }

    return (
        <UsersContext.Provider
            value={{
                usersLoading: isLoading,
                userDetail: userDetail,
                setUserDetail,
                retrieveUser: retrieveUserHandler,
                loginHandler,
                userLoginError,
                setUserLoginError
            }}
        >
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext
