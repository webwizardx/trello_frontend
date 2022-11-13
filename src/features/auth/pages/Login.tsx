import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, Link, useBoolean } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { default as NextLink } from 'next/link'
import logo from '../../../../public/img/taskit_logo.svg';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../store/hooks';
import { setErrorAlert, setSuccessAlert } from '../../../components/Alert';
import { loginNextJs } from '../services';
import { getRequiredMessage } from '../../../utils';

const Login = () => {
    const dispatch = useAppDispatch()
    const { isLoading, mutate } = useMutation(loginNextJs, {
        onSuccess({ data }) {
            formik.setSubmitting(false);
            dispatch(setSuccessAlert({ message: data.message, redirectOnOkTo: '/', redirectOnCancelTo: '/' }))
        }, onError({ response }) {
            formik.setSubmitting(false);
            dispatch(setErrorAlert({ message: response.data.message }))
        },
    })
    const [isVisible, setVisible] = useBoolean();
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
        onSubmit: (body) => {
            mutate(body)
        }
    });
    const wasSubmitted = formik.submitCount > 0;

    return (
        <Container py={8} centerContent>
            <Box width={130} mb={6}>
                <Image src={logo} alt="Taskit Logo" />
            </Box>
            <Box p={5} shadow='md' borderWidth={1} borderRadius={4} width='100%'>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl id='email' mb={6} isRequired isInvalid={wasSubmitted && formik.touched.email && Boolean(formik.errors.email)}>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Email' {...formik.getFieldProps('email')} />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id='password' mb={6} isRequired isInvalid={wasSubmitted && formik.touched.password && Boolean(formik.errors.password)}>
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
                    <NextLink href='/signup' passHref>
                        <Link>Don&apos;t have an account?</Link>
                    </NextLink>
                </HStack>
            </Box>
        </Container>
    )
}

export default Login
