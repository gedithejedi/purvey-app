import { Button, Spin } from "antd";
import { type NextPage } from "next";
import { useMetaMask } from '../hooks/useMetaMask'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const Home: NextPage = () => {
  const {
      state,
      dispatch
    } = useMetaMask()

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
  
 const handleDisconnect = () => {
    dispatch({ type: 'disconnect' })
  }

  if(state?.status === 'loading')  {
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
        <div><Button type="primary" onClick={handleDisconnect}>Logout</Button></div>
      </main>
    </>
  );
};

export default Home;
