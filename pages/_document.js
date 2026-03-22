// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#080810" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main /><NextScript />
      </body>
    </Html>
  );
}
