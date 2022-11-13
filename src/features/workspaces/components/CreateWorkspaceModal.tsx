import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import { setErrorAlert, setSuccessAlert } from '../../../components/Alert'
import { useAppDispatch } from '../../../store/hooks'
import { createWorkspace, updateWorkspace } from '../services'
import * as Yup from 'yup'
import { getRequiredMessage } from '../../../utils'
import { useSession } from '../../auth'
import { Workspace } from '../services/interface'

type CreateWorkspaceModalProps = {
    workspace?: Workspace
} & Pick<ModalProps, 'isOpen' | 'onClose' | 'onCloseComplete'>

const CreateWorkspaceModal: FC<CreateWorkspaceModalProps> = ({ isOpen, onClose, workspace, onCloseComplete }) => {
    const dispatch = useAppDispatch();
    const session = useSession();
    const queryClient = useQueryClient();
    const { isLoading: isCreatingLoading, mutate: mutateCreate } = useMutation(createWorkspace, {
        onSuccess({ data }) {
            onCloseCompleteFn();
            dispatch(setSuccessAlert({ message: data.message }));
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        }, onError({ response }) {
            formik.setSubmitting(false);
            dispatch(setErrorAlert({ message: response.data.message }));
        },
    });
    const { isLoading: isUpdatingLoading, mutate: mutateUpdate } = useMutation(async (updatedWorkspace: any) => {
        const data = await updateWorkspace(updatedWorkspace.id, updatedWorkspace.body)
        return data;
    }, {
        onSuccess({ data }) {
            onCloseCompleteFn();
            dispatch(setSuccessAlert({ message: data.message }));
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        }, onError({ response }) {
            formik.setSubmitting(false);
            dispatch(setErrorAlert({ message: response.data.message }));
        },
    })
    const isLoading = isCreatingLoading || isUpdatingLoading;

    const formik = useFormik({
        initialValues: {
            title: workspace?.title ?? '',
            user_id: workspace?.user_id ?? 0
        },
        validationSchema: Yup.object({
            title: Yup.string().required(getRequiredMessage),
        }),
        onSubmit: (body) => {
            if (!session) {
                dispatch(setErrorAlert({ message: "Sorry, we are unable to process your request at this time" }))
                return
            }
            body.user_id = session.id
            if (workspace) {
                mutateUpdate({ id: workspace.id, body })
                return
            }
            mutateCreate(body)
        },
        enableReinitialize: true
    });
    const wasSubmitted = formik.submitCount > 0;
    const onCloseCompleteFn = () => {
        formik.resetForm();
        if (onCloseComplete) onCloseComplete();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onCloseComplete={onCloseCompleteFn}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{workspace ? 'Edit' : 'Create'} workspace</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form noValidate>
                        <FormControl id='title' mb={6} isRequired isInvalid={wasSubmitted && formik.touched.title && Boolean(formik.errors.title)}>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' {...formik.getFieldProps('title')} />
                            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} me={3}>Cancel</Button>
                    <Button
                        onClick={() => formik.handleSubmit()}
                        isLoading={isLoading}
                        isDisabled={wasSubmitted && !formik.isValid || formik.isSubmitting}
                        loadingText='Submitting'
                        colorScheme='blue'
                    >
                        {workspace ? 'Edit' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateWorkspaceModal