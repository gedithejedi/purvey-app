import { type PropsWithChildren, useEffect } from 'react'
import { useListen } from '../hooks/useListen'
import { useMetaMask } from '../hooks/useMetaMask'
import { instantiateSdk } from '../lib/metamaskSDK'

export const SdkLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = useMetaMask()
  const listen = useListen()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local = window.localStorage.getItem('state')

      // user was previously connected, start listening to MM
      if (local) {
        listen()
      }

      // local could be null if not present in LocalStorage
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { wallet, balance }: {wallet: string | null, balance: string | null} = local
        ? JSON.parse(local)
        : // backup if local storage is empty
          { wallet: null, balance: null }

      instantiateSdk()
      dispatch({ type: 'pageLoaded', wallet, balance })
    }
  }, [dispatch, listen])

  return <div>{children}</div>
}