import { Button, Spin } from "antd";
import { type NextPage } from "next";
import { useMetaMask } from '../hooks/useMetaMask'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const Home: NextPage = () => {
  const {
      state: { status, isMetaMaskInstalled, wallet },
      dispatch
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
  
 const handleDisconnect = () => {
    dispatch({ type: 'disconnect' })
  }

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
        {wallet}
        <div><Button type="primary" onClick={handleDisconnect}>Logout</Button></div>
      </main>
    </>
  );
};

export default Home;
