import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import Router from 'next/router'
import React, { RefObject } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { onClose, selectAlert } from './alert-slice'


const Alert = () => {
    const { isOpen, type, message, redirectOnOkTo, redirectOnCancelTo } = useAppSelector(selectAlert)
    const dispatch = useAppDispatch()
    const cancelRef = React.useRef() as RefObject<HTMLButtonElement>

    const onCancel = () => {
        if (redirectOnCancelTo) Router.push(redirectOnCancelTo);
        dispatch(onClose())
    }

    const onOK = () => {
        if (redirectOnOkTo) Router.push(redirectOnOkTo);
        dispatch(onClose())
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onCancel}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {type}
                    </AlertDialogHeader>

                    {message ? <AlertDialogBody>
                        {message}
                    </AlertDialogBody> : null}

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme={type === 'Success' ? 'green' : 'red'} onClick={onOK} ms={3}>
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default Alert