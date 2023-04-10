import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Explore Katelyn Nee's photography portfolio"
          />
          <meta property="og:site_name" content="katelynnee.vercel.app" />
          <meta
            property="og:description"
            content="Explore Katelyn Nee's photography portfolio"
          />
          <meta property="og:title" content="Katelyn Nee's photography portfolio" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Katelyn Nee's photography portfolio" />
          <meta
            name="twitter:description"
            content="Explore Katelyn Nee's photography portfolio"
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
