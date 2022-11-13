import Head from 'next/head'
import React, { FC } from 'react'

const Page: FC<{ title?: string, children?: React.ReactNode }> = ({ title, children }) => {
    return (
        <>
            <Head>
                {title ? <title>{title}</title> : null}
            </Head>
            {children}
        </>
    )
}

export default Page