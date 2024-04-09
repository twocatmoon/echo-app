import { useEffect, useRef } from 'react'
import { useAppStore } from './useAppStore'
import { auth, useLogoutAction } from '../api/backend'

interface AuthProviderProps {
    children?: React.ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
    const hasVerifiedRef = useRef(false)
    const [ , dispatch ] = useAppStore()

    useEffect(() => {
        if (hasVerifiedRef.current) return
        
        (async () => {
            hasVerifiedRef.current = true

            try {
                const user = await auth.getUser()
                dispatch({ type: 'setUser', user })
            } catch {}
        })()
    })

    return (
        <>
            {children}
        </>
    )
}

export function useAuth () {
    const [ state, dispatch ] = useAppStore()

    const login = async (identifier: string, password: string) => {
        const user = await auth.login(identifier, password)
        dispatch({ type: 'setUser', user })
    }

    const logout = async () => {
        await auth.logout()
        dispatch({ type: 'setUser', user: undefined })
    }

    const register = async (username: string, email: string, password: string) => {
        const user = await auth.register(username, email, password)
        dispatch({ type: 'setUser', user })
    }

    useLogoutAction(logout)

    return {
        user: state.user,
        login,
        logout,
        register,
    }
}
