'use client'

import React, {createContext, ReactNode, useCallback, useContext, useMemo, useState} from 'react'

export interface UserContextProps {
    isAuthenticated: boolean;
    token: string | null;
    setToken: (token: string) => void,
}

const UserContext = createContext<UserContextProps>({
    isAuthenticated: false,
    token: null,
    setToken: () => {
    },
})

export const UserProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const setTokenUpdate = useCallback((t: string) => {
        console.log("SetToke.log", t);
        setToken(t)
        localStorage.setItem('token', t)
    }, []);
    const isAuthenticated = useMemo(() => !!token, [token]);

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                token,
                setToken: setTokenUpdate,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider')
    }

    return context
}
