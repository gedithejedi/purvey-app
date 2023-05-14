import { useMetaMask } from './useMetaMask'

function isAccountList(accounts: unknown): accounts is string[] {
  return (
    Array.isArray(accounts) &&
    accounts.every((account) => typeof account === 'string')
  )
}

export const useListen = () => {
  const { dispatch } = useMetaMask()

  return () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.ethereum?.on('accountsChanged', async (newAccounts: string[]) => {
      if (isAccountList(newAccounts) && newAccounts.length > 0) {
        // upon receiving a new wallet, we'll request the balance to synchronize the UI again.
        const newBalance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [newAccounts[0], 'latest'],
        })
        const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
        const narrowedBalance = typeof newBalance === 'string' ? newBalance : ''
        const narrowedChainId = typeof newChainId === 'string' ? newChainId : null

        console.log(narrowedBalance)
        dispatch({
          type: 'connect',
          wallet: newAccounts[0],
          balance: narrowedBalance,
          chainId: narrowedChainId,
        })
      } else {
        // if the length is 0, then the user has disconnected from the wallet UI
        dispatch({ type: 'disconnect' })
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.ethereum?.on('chainChanged', async (newChainId: string[]) => {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log(newChainId)
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }) as string | null

      dispatch({
        type: 'updateChainId',
        wallet: accounts[0],
        chainId: newChainId[0],
        balance
      })
    })
  }
}