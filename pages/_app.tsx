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

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return <ChakraProvider theme={theme}>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Provider>
    </ChakraProvider>
}

export default MyApp
