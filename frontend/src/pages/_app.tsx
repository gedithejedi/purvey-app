import { type AppType } from "next/dist/shared/lib/utils";
import { ConfigProvider } from "antd";
import TheLayout from "~/components/TheLayout";
import "~/styles/globals.css";
import "~/styles/preflight.css";
import { Provider as JotaiProvider } from "jotai";

const MyApp: AppType = ({ Component, pageProps }) => {
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
