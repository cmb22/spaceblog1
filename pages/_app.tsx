import "../globals.css";
// import { NextUIProvider } from '@nextui-org/react'
import Header from "../components/Header";
// import { GoogleAnalytics } from '@next/third-parties/google'

function MyApp({ Component, pageProps }: any) {
    return (
        <>
            {/* <NextUIProvider> */}
            <Header />
            <Component {...pageProps} />
            {/* </NextUIProvider> */}
        </>
    );
}

export default MyApp;