import { Avatar, Box, Button, Heading, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '../../src/features/workspaces';
import { Page } from '../../src/components/Page';
import { withSessionSsr } from '../../src/features/auth';
import { HomeLayout } from '../../src/components/Layouts';
import { NextPageWithLayout } from '../_app';

const Boards: NextPageWithLayout = () => {
    const { data: workspaces, isSuccess } = useQuery(['workspaces'], async () => {
        const { data } = await getWorkspaces({ params: { includes: ['boards'] } })
        return data.data
    });
    return <Page title='Boards'>
        <Box width='100%' py={6}>
            <Heading size='md' color='gray.500' textTransform='uppercase' mb={6}>Your Workspaces</Heading>
            {isSuccess && workspaces ?
                workspaces.map(workspace => (
                    <Box key={workspace.id} mb={4}>
                        <HStack mb={4}>
                            <Avatar size='xs' name={workspace.title} borderRadius={3} />
                            <Heading size='sm' color='gray.500'>{workspace.title}</Heading>
                        </HStack>
                        <Wrap justify={['center', 'start']} spacing={4}>
                            {isSuccess && workspace.boards ?
                                workspace.boards.map(board => (
                                    <WrapItem key={board.id}>
                                        <Box width='194px' height='96px' bg='blue.500' borderRadius={3} p={1}>
                                            <Text color='white'>{board.title}</Text>
                                        </Box>
                                    </WrapItem>
                                ))
                                : null}
                            <WrapItem>
                                <Button width='194px' height='96px' fontSize='sm' fontWeight='normal'>Create new board</Button>
                            </WrapItem>
                        </Wrap>
                    </Box>
                )) : null}
        </Box>
    </Page>
}

Boards.getLayout = (page) => {
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

export default Boards
