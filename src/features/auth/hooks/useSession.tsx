import { useEffect, useState } from 'react'
import Router from 'next/router'
import { getUserNextJs, logoutNextJs } from '../services'
import { useQuery } from '@tanstack/react-query';
import { UserAndApiToken } from '../services/interface';

export default function useSession({
    redirectTo = '',
    redirectIfFound = false,
} = {}) {
    const [session, setSession] = useState<UserAndApiToken>()
    useQuery(['getUser'], getUserNextJs, {
        onSuccess: ({ data: { data } }) => {
            setSession(data)
        },
        onError: async () => {
            await logoutNextJs()
            Router.push('/login')
        },
        retry: false
    })

    useEffect(() => {
        if (!redirectTo || !Boolean(session)) return

        if (
            (redirectTo && !redirectIfFound && !Boolean(session)) ||
            (redirectIfFound && Boolean(session))
        ) {
            Router.push(redirectTo)
        }
    }, [session, redirectTo, redirectIfFound])

    return session
}
