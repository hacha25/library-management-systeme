import { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (savedToken && savedUser) {
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }
        setLoading(false)
    },[]);

    const login = (userData, tokenData) => {
        setUser(userData)
        setToken(tokenData)

        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', tokenData)
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout, loading}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)