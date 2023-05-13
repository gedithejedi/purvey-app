import { Button, Spin } from "antd";
import { type NextPage } from "next";
import { useMetaMask } from '../hooks/useMetaMask'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const Home: NextPage = () => {
  const {
      state: { status, isMetaMaskInstalled, wallet },
    } = useMetaMask()

  const router = useRouter()
  useEffect(() => {
    if(status !== 'loading' || !isMetaMaskInstalled) {
      const shouldRedirectToAuthPage =
        status !== 'pageNotLoaded' && !wallet
      
      if (shouldRedirectToAuthPage) {
        router.replace("/auth/login")
      }
    }
  }, [status, isMetaMaskInstalled, router, wallet]);  
  
  if(status === 'loading')  {
    return (
      <>
        <main className="min-h-screen px-4 py-2">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </main>
      </>
    );
  }
  return (
    <>
      <main className="min-h-screen px-4 py-2">
        <div><Button type="primary">Button</Button></div>
      </main>
    </>
  );
};

export default Home;
