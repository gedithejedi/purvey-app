import { type AppType } from "next/dist/shared/lib/utils";
import { ConfigProvider } from "antd";
import TheLayout from "~/components/TheLayout";
import { MetaMaskProvider } from "~/hooks/useMetaMask";
import "~/styles/globals.css";
import "~/styles/preflight.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MetaMaskProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4996c5',
          },
        }}
      >
        <TheLayout>
          <Component {...pageProps} />
        </TheLayout>
      </ConfigProvider>
    </MetaMaskProvider>
  );
};

export default MyApp;
