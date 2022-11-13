import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import theme from '../theme'
import { getStore } from '../store'
import { Store } from 'redux'
import { Alert } from '../components/Alert'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
        logger: {
            log: console.log,
            warn: console.warn,
            error: () => { },
        }
    });

    return <ChakraProvider theme={theme}>
        <Provider store={getStore() as Store}>
            <QueryClientProvider client={queryClient}>
                <Alert />
                {children}
            </QueryClientProvider>
        </Provider>
    </ChakraProvider>

}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }