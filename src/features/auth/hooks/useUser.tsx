import { useEffect, useState } from 'react'
import Router from 'next/router'
import { getUserNextJs, logoutNextJs } from '../../../api/auth'
import { useQuery } from '@tanstack/react-query';

export default function useUser({
    redirectTo = '',
    redirectIfFound = false,
} = {}) {
    const [user, setUser] = useState(null)
    const { } = useQuery(['getUser'], getUserNextJs, {
        onSuccess: ({ data: { data } }) => {
            setUser(data)
        },
        onError: async () => {
            await logoutNextJs()
            Router.push('/login')
        },
        retry: false
    })

    useEffect(() => {
        if (!redirectTo || !Boolean(user)) return

        if (
            (redirectTo && !redirectIfFound && !Boolean(user)) ||
            (redirectIfFound && Boolean(user))
        ) {
            Router.push(redirectTo)
        }
    }, [user, redirectTo, redirectIfFound])


    return { user }
}
