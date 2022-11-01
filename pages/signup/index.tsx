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
import { createUser } from '../../src/api';
import { withSessionSsr } from '../../src/features/auth';

const SignUp: NextPage = () => {
    const { isLoading, mutate } = useMutation(createUser, {
        onSuccess({ data }) {
            toast({
                title: data.message,
                status: 'success',
                isClosable: true,
                duration: 4000,
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
            name: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less.')
                .required(getRequiredMessage),
            lastName: Yup.string()
                .max(15, 'Must be 15 characters or less.')
                .required(getRequiredMessage),
            email: Yup.string().email('Invalid email address.').required(getRequiredMessage),
            username: Yup.string()
                .max(15, 'Must be 20 characters or less.')
                .required(getRequiredMessage),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more.')
                .required(getRequiredMessage),
            confirmPassword: Yup
                .string()
                .required(getRequiredMessage)
                .oneOf([Yup.ref("password")], "Passwords must match."),
        }),
        onSubmit: body => {
            const { name, lastName, email, username, password } = body
            const newUser = {
                name, last_name: lastName, email, username, password
            }
            mutate(newUser)
        },
    });

    return (
        <Container py={8} centerContent>
            <Box width={130} mb={6}>
                <Image src={logo} alt="Taskit Logo" />
            </Box>
            <Box p={5} shadow='md' borderWidth='1px' borderRadius={4} width='100%'>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='name' isRequired isInvalid={formik.touched.name && Boolean(formik.errors.name)}>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' {...formik.getFieldProps('name')} />
                            {formik.touched.name && formik.errors.name ? (
                                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl id='last-name' isRequired isInvalid={formik.touched.lastName && Boolean(formik.errors.lastName)}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' {...formik.getFieldProps('lastName')} />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='email' isRequired isInvalid={formik.touched.email && Boolean(formik.errors.email)}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl id='username' isRequired isInvalid={formik.touched.username && Boolean(formik.errors.username)}>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' {...formik.getFieldProps('username')} />
                            {formik.touched.username && formik.errors.username ? (
                                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='password' isRequired isInvalid={formik.touched.password && Boolean(formik.errors.password)}>
                            <FormLabel >Password</FormLabel>
                            <InputGroup size='md'>
                                <Input type={show ? 'text' : 'password'} placeholder='Password' {...formik.getFieldProps('password')} />
                                <InputRightElement width='4.5rem'>
                                    {show ?
                                        <UnlockIcon h='1.75rem' onClick={setFlag.toggle}></UnlockIcon>
                                        : <LockIcon h='1.75rem' onClick={setFlag.toggle}></LockIcon>}
                                </InputRightElement>
                            </InputGroup>
                            {formik.touched.password && formik.errors.password ? (
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl id='confirm-password' isRequired isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
                            <FormLabel>Confirm password</FormLabel>
                            <InputGroup size='md'>
                                <Input type={show ? 'text' : 'password'} placeholder='Confirm password' {...formik.getFieldProps('confirmPassword')} />
                                <InputRightElement width='4.5rem'>
                                    {show ?
                                        <UnlockIcon h='1.75rem' onClick={setFlag.toggle}></UnlockIcon>
                                        : <LockIcon h='1.75rem' onClick={setFlag.toggle}></LockIcon>}
                                </InputRightElement>
                            </InputGroup>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                            ) : null}
                        </FormControl>
                    </HStack>
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
                    <NextLink href='/login' passHref>
                        <Link>Already have an account?</Link>
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


export default SignUp
