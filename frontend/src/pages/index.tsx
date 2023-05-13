import { Spin } from "antd";
import { type NextPage } from "next";
import { useMetaMask } from '../hooks/useMetaMask'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const Home: NextPage = () => {
  const { state } = useMetaMask()

  const router = useRouter()
  useEffect(() => {
    if(state?.status !== 'loading' || !state?.isMetaMaskInstalled) {
      const shouldRedirectToAuthPage =
        state?.status !== 'pageNotLoaded' && !state?.wallet
      
      if (shouldRedirectToAuthPage) {
        router.replace("/auth/login")
      }
    }
  }, [state, router]);  
  

  if(state?.status === 'loading')  {
    return (
      <div className="min-h-screen px-4 py-2">
        <Spin tip="Loading">
          <div className="content" />
        </Spin>
      </div>
    );
  }
  return (
    <main className="min-h-screen px-4 py-2">
      <div>Contents</div>
    </main>
  );
};

export default Home;
