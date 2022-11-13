import type { NextPage } from 'next'
import { Page } from '../../src/components/Page';
import { SignupPage, withSessionSsr } from '../../src/features/auth';

const Signup: NextPage = () => {
    return <Page title='Signup'>
        <main><SignupPage /></main>
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


export default Signup
