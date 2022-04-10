import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://eaxb7qtzm3mc.usemoralis.com:2053/server"
      appId="cnR47uA3yiqyLjzi3WX0gnxzUnDZZbrTm36Fx0Wi"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
