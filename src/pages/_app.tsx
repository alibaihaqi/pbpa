import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { Analytics } from '@vercel/analytics/react'
import { apolloClient } from '@/services'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PBPA</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
          <Analytics mode={"production"} />
        </ApolloProvider>
      </RecoilRoot>
    </>
  )
}
