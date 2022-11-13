import { Container, Flex } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'

const HomeLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container maxWidth='container.lg'>
                <Flex gap={6}>
                    <Sidebar />
                    <main>{children}</main>
                </Flex>
            </Container>
        </>
    )
}

export default HomeLayout