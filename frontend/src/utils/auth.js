import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from "./utils/config";

export const login = async (user) => {
    await axios.post(`${SERVER_URL}/v1/user/login`, user).then((res) =>{
        if (res.status === 'success') {
            localStorage.clear()
            localStorage.setItem("access-token", res.data.accessJWT)
            localStorage.getItem("refresh-token", res.data.refreshJWT)
        }
    }
    )
}

export const signup = (user) => {
    axios.post(`${SERVER_URL}/v1/user`, user)
}