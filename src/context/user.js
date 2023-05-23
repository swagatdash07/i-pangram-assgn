import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState("")
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('auth1'));
        setAuth(data)
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
