import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, Link, useBoolean } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { default as NextLink } from 'next/link'
import logo from '../../../../public/img/taskit_logo.svg';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../store/hooks';
import { createUser } from '../services';
import { setErrorAlert, setSuccessAlert } from '../../../components/Alert';
import { getRequiredMessage } from '../../../utils';

const Signup = () => {
    const dispatch = useAppDispatch();
    const { isLoading, mutate } = useMutation(createUser, {
        onSuccess({ data }) {
            formik.setSubmitting(false);
            dispatch(setSuccessAlert({ message: data.message, redirectOnOkTo: '/login', redirectOnCancelTo: '/login' }))
        }, onError({ response }) {
            formik.setSubmitting(false);
            dispatch(setErrorAlert({ message: response.data.message }))
        },
    })
    const [isVisible, setVisible] = useBoolean()
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
    const wasSubmitted = formik.submitCount > 0;

    return (
        <Container py={8} centerContent>
            <Box width={130} mb={6}>
                <Image src={logo} alt="Taskit Logo" />
            </Box>
            <Box p={5} shadow='md' borderWidth={1} borderRadius={4} width='100%'>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='name' isRequired isInvalid={wasSubmitted && formik.touched.name && Boolean(formik.errors.name)}>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' {...formik.getFieldProps('name')} />
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='last-name' isRequired isInvalid={wasSubmitted && formik.touched.lastName && Boolean(formik.errors.lastName)}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' {...formik.getFieldProps('lastName')} />
                            <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='email' isRequired isInvalid={wasSubmitted && formik.touched.email && Boolean(formik.errors.email)}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' {...formik.getFieldProps('email')} />
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='username' isRequired isInvalid={wasSubmitted && formik.touched.username && Boolean(formik.errors.username)}>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' {...formik.getFieldProps('username')} />
                            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack spacing={4} mb={6}>
                        <FormControl id='password' isRequired isInvalid={wasSubmitted && formik.touched.password && Boolean(formik.errors.password)}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input type={isVisible ? 'text' : 'password'} placeholder='Password' {...formik.getFieldProps('password')} />
                                <InputRightElement width='4.5rem'>
                                    {isVisible ?
                                        <UnlockIcon h='1.75rem' onClick={setVisible.toggle}></UnlockIcon>
                                        : <LockIcon h='1.75rem' onClick={setVisible.toggle}></LockIcon>}
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='confirm-password' isRequired isInvalid={wasSubmitted && formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
                            <FormLabel>Confirm password</FormLabel>
                            <InputGroup size='md'>
                                <Input type={isVisible ? 'text' : 'password'} placeholder='Confirm password' {...formik.getFieldProps('confirmPassword')} />
                                <InputRightElement width='4.5rem'>
                                    {isVisible ?
                                        <UnlockIcon h='1.75rem' onClick={setVisible.toggle}></UnlockIcon>
                                        : <LockIcon h='1.75rem' onClick={setVisible.toggle}></LockIcon>}
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <Button
                        isLoading={isLoading}
                        isDisabled={wasSubmitted && !formik.isValid || formik.isSubmitting}
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

export default Signup
