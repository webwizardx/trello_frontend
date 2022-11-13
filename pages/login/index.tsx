import type { NextPage } from 'next'
import { Page } from '../../src/components/Page';
import { LoginPage, withSessionSsr } from '../../src/features/auth';


const Login: NextPage = () => {
    return <Page title='Login'>
        <main>
            <LoginPage />
        </main>
    </Page>
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    const user = req.session.user;

    if (user) return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }

    return {
        props: {}
    }
})

export default Login
