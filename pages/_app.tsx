import '../styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import theme from '../src/theme'
import { store } from '../src/store'
import { Store } from 'redux'
import { Alert } from '../src/components/Alert'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const queryClient = new QueryClient();
    const getLayout = Component.getLayout ?? ((page) => page);

    return <ChakraProvider theme={theme}>
        <Provider store={store as Store}>
            <QueryClientProvider client={queryClient}>
                <Alert />
                {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
        </Provider>
    </ChakraProvider>
}

export default MyApp
