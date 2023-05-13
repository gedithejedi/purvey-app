import { stateAtomWithPersistence } from '~/store'
import { useAtom } from 'jotai'

type ConnectAction = { type: 'connect'; wallet: string; balance: string }
type DisconnectAction = { type: 'disconnect' }
type PageLoadedAction = {
  type: 'pageLoaded'
  wallet: string | null
  balance: string | null
}
type LoadingAction = { type: 'loading' }
type IdleAction = { type: 'idle' }

type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction

type Dispatch = (action: Action) => void

type Status = 'loading' | 'idle' | 'pageNotLoaded'

export type State = {
  wallet: string | null
  isMetaMaskInstalled: boolean | null
  status: Status
  balance: string | null
}

/**
 * It takes in a state and an action, and returns a new state
 * @param {State} state - State - the current state of the reducer
 * @param {Action} action - This is the action that is being dispatched.
 * @returns The state of the metamask reducer.
 */
function metamaskReducer(state: State, action: Action): State {
  // start by checking if window.ethereum is present, indicating a wallet extension
  const ethereumProviderInjected = typeof window.ethereum !== 'undefined'

  // this could be other wallets so we can verify if we are dealing with metamask
  const isMetaMaskInstalled =
    ethereumProviderInjected && Boolean(window.ethereum.isMetaMask)

  switch (action.type) {
    case 'connect': {
      const { wallet, balance } = action
      const newState = { ...state, wallet, isMetaMaskInstalled, balance, status: 'idle' } as State
      return newState
    }
    case 'disconnect': {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged')
      }
      return { ...state, wallet: null, isMetaMaskInstalled, balance: null }
    }
    case 'pageLoaded': {
      const { balance, wallet } = action
      return { ...state, isMetaMaskInstalled, status: 'idle', wallet, balance }
    }
    case 'loading': {
      return { ...state, isMetaMaskInstalled, status: 'loading' }
    }
    case 'idle': {
      return { ...state, isMetaMaskInstalled, status: 'idle' }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

function useMetaMask() {
  const [state, setState] = useAtom(stateAtomWithPersistence)
  const dispatch: Dispatch = (action: Action) => 
    setState(metamaskReducer(state, action))

  return {state, dispatch}
}

export { useMetaMask }