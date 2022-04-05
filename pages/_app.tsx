import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {server} from '../server'


function MyApp({ Component, pageProps }: AppProps) {
  server
  return <Component {...pageProps} />
}

export default MyApp
