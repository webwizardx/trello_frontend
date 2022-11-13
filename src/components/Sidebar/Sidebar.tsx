import { AddIcon, DeleteIcon, EditIcon, Search2Icon, StarIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Button, Divider, HStack, Link, List, ListIcon, ListItem, Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { default as NextLink } from 'next/link';
import React, { useState } from 'react'
import { CreateWorkspaceModal, deleteWorkspace, getWorkspaces, Workspace } from '../../features/workspaces';
import { useAppDispatch } from '../../store/hooks';
import { setErrorAlert, setSuccessAlert } from '../Alert';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryClient = useQueryClient();
    const { data: workspaces, isSuccess } = useQuery(['workspaces'], async () => {
        const { data } = await getWorkspaces({ params: { includes: ['boards'] } })

        return data.data
    })
    const { isLoading, mutate } = useMutation(deleteWorkspace, {
        onSuccess({ data }) {
            dispatch(setSuccessAlert({ message: data.message }));
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        }, onError({ response }) {
            dispatch(setErrorAlert({ message: response.data.message }));
        },
    });
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>()
    const openEditWorkspaceModal = (workspace: Workspace) => {
        setCurrentWorkspace(workspace);
        onOpen();
    }
    const onCloseComplete = () => {
        setCurrentWorkspace(undefined)
    }

    return (
        <>
            <CreateWorkspaceModal
                isOpen={isOpen}
                onClose={onClose}
                workspace={currentWorkspace}
                onCloseComplete={onCloseComplete}
            />
            <VStack display={['none', 'flex']} width='100%' maxWidth='272px' align='start' py={6}>
                <List spacing={3}>
                    <ListItem>
                        <NextLink href='/boards' passHref>
                            <Link><ListIcon as={EditIcon} />Boards</Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <ListIcon as={Search2Icon} />
                        Templates
                    </ListItem>
                    <ListItem>
                        <NextLink href='/' passHref>
                            <Link><ListIcon as={StarIcon} />Home</Link>
                        </NextLink>
                    </ListItem>
                </List>
                <Divider />
                <HStack justify='space-between' width='100%'>
                    <Text fontSize='sm' color='gray.700'>Workspaces</Text>
                    <Button onClick={onOpen} variant='ghost'>
                        <AddIcon />
                    </Button>
                </HStack>
                <Accordion width='100%' allowToggle>
                    {isSuccess && workspaces ?
                        workspaces.map(workspace => (
                            <AccordionItem key={workspace.id} data-testid="sidebar-workspace-item">
                                <AccordionButton ps={0}>
                                    <Avatar size='xs' name={workspace.title} borderRadius={3} me={2} />
                                    {workspace.title}
                                    <AccordionIcon ms='auto' />
                                </AccordionButton>
                                <AccordionPanel >
                                    <List spacing={3}>
                                        <ListItem onClick={() => openEditWorkspaceModal(workspace)}
                                            cursor='pointer'
                                            transitionDuration='normal'
                                            _hover={{
                                                background: 'blackAlpha.50'
                                            }}
                                        >
                                            <ListIcon as={EditIcon} />
                                            Edit
                                        </ListItem>
                                        <ListItem
                                            pointerEvents={isLoading ? 'none' : 'auto'}
                                            onClick={() => mutate(workspace.id)}
                                            cursor='pointer'
                                            transitionDuration='normal'
                                            _hover={{
                                                background: 'blackAlpha.50'
                                            }}
                                        >
                                            <ListIcon as={DeleteIcon} />
                                            <Text display='inline' me={4}>Delete</Text>
                                            {isLoading ? <Spinner size='sm' /> : null}
                                        </ListItem>
                                    </List>
                                </AccordionPanel>
                            </AccordionItem>
                        )) : null}
                </Accordion>
            </VStack>
        </>
    )
}

export default Sidebar