import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const source = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API}`;

export default function Document() {
  return (
    <Html>
      <Head>
        <Script type="text/javascript" src={source} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
