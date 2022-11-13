import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, CloseButton, Divider, Flex, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Spacer, Spinner, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Router from 'next/router'
import logo from '../../../public/img/taskit_logo_white_transparent.svg'
import { getWorkspaces } from '../../../src/features/workspaces';
import { logoutNextJs, useSession } from '../../features/auth'
import { useAppDispatch } from '../../store/hooks'
import { setErrorAlert } from '../Alert'

const Navbar = () => {
    const session = useSession();
    const dispatch = useAppDispatch();
    const { data: workspaces, isSuccess } = useQuery(['workspaces'], async () => {
        const { data } = await getWorkspaces({ params: { includes: ['boards'] } })

        return data.data
    })
    const { mutate, isLoading } = useMutation({
        mutationFn: logoutNextJs,
        onSuccess() {
            Router.push('/login')
        },
        onError({ response }) {
            dispatch(setErrorAlert({ message: response.data.message }))
        }
    })

    const fullName = `${session?.name ?? ''} ${session?.last_name ?? ''}`.trim();

    return (
        <Flex bg={'blue.500'} alignItems='center' gap='2' p={4}>
            <Box width='60px' height='25px'>
                <Image width='60px' height='25px' src={logo} alt="Taskit Logo" />
            </Box>
            <Menu>
                {({ onClose }) => (<>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost' colorScheme='whiteAlpha' color='white'>
                        Workspaces
                    </MenuButton>
                    <MenuList position='relative'>
                        <Text align='center' color='gray.600' mx='auto' mb={2}>Workspaces</Text>
                        <CloseButton onClick={onClose} position='absolute' top='5%' right='5%' transform='translate(-5%, -5%)' />
                        <Divider />
                        <MenuGroup title='Your workspaces' color='gray.600'>
                            {isSuccess && workspaces ?
                                workspaces.map(workspace => (
                                    <MenuItem key={workspace.id}>
                                        <Avatar size='sm' name={workspace.title} borderRadius={3} me={2} />
                                        <Text>{workspace.title}</Text>
                                    </MenuItem>
                                )) : null}
                        </MenuGroup>
                    </MenuList>
                </>)}
            </Menu>
            <Spacer />
            <Menu>
                {({ onClose }) => (<>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost' colorScheme='whiteAlpha' color='white'>
                        <Avatar name={fullName} size='sm' />
                    </MenuButton>
                    <MenuList position='relative'>
                        <Text align='center' color='gray.600' mx='auto' mb={2}>Account</Text>
                        <CloseButton onClick={onClose} position='absolute' top='5%' right='5%' transform='translate(-5%, -5%)' />
                        <Divider />
                        <MenuItem isDisabled={isLoading} closeOnSelect={false} onClick={() => mutate()}>
                            <Text me={4}>Logout</Text>
                            {isLoading ? <Spinner size='sm' /> : null}
                        </MenuItem>
                    </MenuList>
                </>)}
            </Menu>
        </Flex >
    )
}

export default Navbar