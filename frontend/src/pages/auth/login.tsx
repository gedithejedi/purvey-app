import { Modal, Button } from "antd";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useListen } from '../../hooks/useListen'
import { useMetaMask } from '../../hooks/useMetaMask'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const Login: NextPage = () => {
  const {
      dispatch,
      state: { wallet },
    } = useMetaMask()
  const listen = useListen()
  const [status, setStatus] = useState('idle');
  const router = useRouter()

  const [ethereumProviderInjected, setEthereumProviderInjected] = useState(false);
  useEffect(()=> {
    setEthereumProviderInjected(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
  }, [])

 useEffect(() => {
  console.log(wallet)
    if(wallet) {
        router.replace("/")
    }
  }, [router, wallet]);  
  

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
      <main className="min-h-screen px-4 py-2">
        <div>
            <Button type="primary" loading={status === 'loading'} disabled={!ethereumProviderInjected} onClick={handleConnect}>
                Sign in with MetaMask
            </Button>
            <Button>
                <Link href="https://metamask.io/" target="_blank">Create My Wallet</Link>
            </Button>
        </div>
      </main>
    </>
  );
};

export default Login;
