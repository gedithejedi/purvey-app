import { Button } from "antd";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>AnonCard</title>
        <meta name="description" content="Connect with your Frens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen px-4 py-2">
        <div><Button type="primary">Button</Button></div>
      </main>
    </>
  );
};

export default Home;
