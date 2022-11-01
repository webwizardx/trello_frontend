import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, Link, useBoolean, useToast } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { NextPage } from 'next'
import Image from 'next/image';
import { default as NextLink } from 'next/link'
import logo from '../../public/img/taskit_logo.svg';
import { MessageParams } from 'yup/lib/types';
import { useMutation } from '@tanstack/react-query';
import { loginNextJs } from '../../src/api/auth';
import Router from 'next/router';
import { withSessionSsr } from '../../src/features/auth';

const Login: NextPage = () => {
    const { isLoading, mutate } = useMutation(loginNextJs, {
        onSuccess({ data }) {
            toast({
                title: data.message,
                status: 'success',
                isClosable: true,
                duration: 4000,
                onCloseComplete() {
                    Router.push('/')
                },
            })
        }, onError({ response }) {
            toast({
                title: response.data.message,
                status: 'error',
                isClosable: true,
                duration: 4000,
            })
        },
    })

    const toast = useToast();
    const [show, setFlag] = useBoolean()

    const getRequiredMessage = (messageParams: MessageParams) => `The field '${messageParams.path}' is required.`;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address.').required(getRequiredMessage),
            password: Yup.string()
                .required(getRequiredMessage)
        }),
        onSubmit: body => {
            mutate(body)
        },
    });

    return (
        <Container py={8} centerContent>
            <Box width={130} mb={6}>
                <Image src={logo} alt="Taskit Logo" />
            </Box>
            <Box p={5} shadow='md' borderWidth='1px' borderRadius={4} width='100%'>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl id='email' mb={6} isRequired isInvalid={formik.touched.email && Boolean(formik.errors.email)}>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Email' {...formik.getFieldProps('email')} />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id='password' mb={6} isRequired isInvalid={formik.touched.password && Boolean(formik.errors.password)}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input type={show ? 'text' : 'password'} placeholder='Password' {...formik.getFieldProps('password')} />
                            <InputRightElement width='4.5rem'>
                                {show ?
                                    <UnlockIcon h='1.75rem' onClick={setFlag.toggle}></UnlockIcon>
                                    : <LockIcon h='1.75rem' onClick={setFlag.toggle}></LockIcon>}
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                        isLoading={isLoading}
                        isDisabled={!formik.isValid}
                        loadingText='Submitting'
                        colorScheme='blue'
                        width='100%'
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
                <HStack mt={6} justify='end'>
                    <NextLink href='/signup' passHref>
                        <Link>Don&apos;t have an account?</Link>
                    </NextLink>
                </HStack>
            </Box>
        </Container>
    )
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
