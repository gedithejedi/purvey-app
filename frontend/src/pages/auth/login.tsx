import { Button } from "antd";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>AnonCard</title>
        <meta name="description" content="Connect your wallet and start to connecting with Frens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen px-4 py-2">
        <div>
            <Button type="primary">
                <Link href="https://metamask.io/" target="_blank">Create My Wallet</Link>
            </Button></div>
      </main>
    </>
  );
};

export default Home;
