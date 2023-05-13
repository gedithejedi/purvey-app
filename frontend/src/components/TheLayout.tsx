import Head from "next/head";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>AnonCard</title>
        <meta name="description" content="Connect with your Frens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen px-4 py-2">
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default PrimaryLayout;