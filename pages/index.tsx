import { Page } from '../src/components/Page';
import { withSessionSsr } from '../src/features/auth';
import { HomeLayout } from '../src/components/Layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
    return <Page title='Home' />
}

Home.getLayout = (page) => {
    return <HomeLayout>
        {page}
    </HomeLayout>
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
