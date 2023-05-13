import Head from "next/head";
import { useRouter } from "next/router";
import { useRouter as useNavigation} from "next/navigation";

import TheNavbar from '~/components/TheNavbar'
import { useMetaMask } from '~/hooks/useMetaMask'
import { Spin } from "antd";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  const router = useRouter()
  const navigation = useNavigation()

  const { state, dispatch } = useMetaMask()

  const handleDisconnect = () => {
    dispatch({ type: 'disconnect' })
    navigation.replace("/auth/login")
  }

  if(!router.route.includes('auth') && !state) {
    return (
      <div className="min-h-screen px-4 py-2">
        <Spin tip="Loading" className="min-h-screen">
          <div className="content" />
        </Spin>
      </div>
    );
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