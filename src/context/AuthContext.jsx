import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Opcional: Aquí puedes decodificar el payload del JWT para extraer el rol/usuario
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};