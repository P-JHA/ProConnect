import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return <>
    <provider>
        <Component {...pageProps} />
    </provider>
    </>;
    }   
