import { Modal, Button } from "antd";
import { type NextPage } from "next";
import Head from "next/head";
import { useListen } from '../../hooks/useListen'
import { useMetaMask } from '../../hooks/useMetaMask'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";

const Login: NextPage = () => {
  const {
      dispatch,
      state,
    } = useMetaMask()
  const listen = useListen()
  const [status, setStatus] = useState('idle');
  const router = useRouter()

  const [ethereumProviderInjected, setEthereumProviderInjected] = useState(false);
  useEffect(()=> {
    setEthereumProviderInjected(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
  }, [])

 useEffect(() => {
    if(state?.wallet) {
        router.replace("/")
    }
  }, [router, state?.wallet]);  
  

  const handleConnect = async () => {
    dispatch({ type: 'loading' })
    setStatus('loading')
    try {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        }) as string | null

        dispatch({ type: 'connect', wallet: accounts[0], balance })

        listen()
        setStatus('connect')
        router.replace("/")
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(e: any) {
      setStatus('idle')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorText = e.message ? e.message as string : "Unknown error occurred!"
      Modal.error({
        title: 'This is an error message',
        content: `Connection could not be established. (${errorText})`,
      });
    }
  }

  return (
    <>
      <Head>
        <title>AnonCard</title>
        <meta name="description" content="Connect your wallet and start to connecting with Frens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-3 items-center">
          <Image
            src="/Purvey_Logo_simple.svg"
            alt="logo"
            width={100}
            height={60}
          />
          <span className="text-sm text-gray-500">AnonCard - Connect with Frens</span>
        </div>
        <div className="max-w-md w-full flex flex-col gap-3">
          {ethereumProviderInjected && <Button type="primary" className="w-full" loading={status === 'loading'} onClick={handleConnect}>
              Sign in with MetaMask
          </Button>}
          {!ethereumProviderInjected &&
            <div className="text-sm text-gray-600 py-2">Opps! It looks like you didn't installed MetaMask extension on your browser... <br/>
            <span className="font-bold">Please install MetaMask to connect to our app!</span></div>
          }
          <Button type={ethereumProviderInjected ? 'default' : 'primary'} className="w-full"  href="https://metamask.io/" target="_blank">
            Check out MetaMask
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
