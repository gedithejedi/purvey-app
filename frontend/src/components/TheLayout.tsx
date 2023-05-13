import Head from "next/head";
import { useRouter } from "next/router";
import TheNavbar from '~/components/TheNavbar'
import { useMetaMask } from '~/hooks/useMetaMask'

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  const router = useRouter()
  const { state, dispatch } = useMetaMask()

  const handleDisconnect = () => {
    dispatch({ type: 'disconnect' })
  }

  return (
    <>
      <Head>
        <title>AnonCard</title>
        <meta name="description" content="Connect with your Frens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className="min-h-screen">
        {!router.route.includes('auth') && <TheNavbar state={state} onLogout={handleDisconnect} />}
        <div className="px-6 h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default PrimaryLayout;