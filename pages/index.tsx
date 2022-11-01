import type { NextPage } from 'next'
import { withSessionSsr } from '../src/features/auth';

const Home: NextPage = () => {
    return (
        <h1>Dashboard</h1>
    )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {

    const user = req.session.user;

    if (!user) return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }

    return {
        props: {}
    }
})

export default Home
