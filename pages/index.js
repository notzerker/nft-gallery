import Head from "next/head";
import Image from "next/image";
import Gallery from "../components/Gallery";
import Main from "../components/Main";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Gallery</title>
      </Head>
      <Main />
    </>
  );
}
