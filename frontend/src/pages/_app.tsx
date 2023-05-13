import { type AppType } from "next/dist/shared/lib/utils";
import { ConfigProvider } from "antd";
import TheLayout from "~/components/TheLayout";
import "~/styles/globals.css";
import "~/styles/preflight.css";
import { Provider as JotaiProvider } from "jotai";
import { Spin } from "antd";
import { useMetaMask } from '../hooks/useMetaMask'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { state } = useMetaMask()

  const router = useRouter()
  useEffect(() => {
    const isNotLoggedIn = state?.status !== 'loading' && !Boolean(state?.wallet)

    if(state?.isMetaMaskInstalled === false || isNotLoggedIn) {
      router.replace("/auth/login")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  

  if(state?.status === 'loading')  {
    return (
      <div className="min-h-screen px-4 py-2">
        <Spin tip="Loading" className="min-h-screen">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4996c5',
        },
      }}
    >
      <JotaiProvider>
        <TheLayout>
          <Component {...pageProps} />
        </TheLayout>
      </JotaiProvider>
    </ConfigProvider>
  );
};

export default MyApp;
