import Navbar from '@/components/Navbar'
import Footer from '@/components/organisms/Footer'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <Head>
        <title>Katelyn Nee</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
