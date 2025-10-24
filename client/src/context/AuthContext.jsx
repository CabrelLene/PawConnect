import { createContext, useContext, useEffect, useState } from 'react'
import { api, setAuthToken } from '../api'


const Ctx = createContext(null)


export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [token, setToken] = useState(localStorage.getItem('token') || '')


useEffect(() => {
setAuthToken(token)
}, [token])


const login = async (email, password) => {
const { data } = await api.post('/auth/login', { email, password })
setUser(data.user)
setToken(data.token)
localStorage.setItem('token', data.token)
}


const register = async (name, email, password) => {
const { data } = await api.post('/auth/register', { name, email, password })
setUser(data.user)
setToken(data.token)
localStorage.setItem('token', data.token)
}


const logout = () => {
setUser(null)
setToken('')
localStorage.removeItem('token')
setAuthToken(null)
}


return (
<Ctx.Provider value={{ user, token, login, register, logout }}>
{children}
</Ctx.Provider>
)
}


export const useAuth = () => useContext(Ctx)