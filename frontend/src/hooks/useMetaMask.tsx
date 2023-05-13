import { stateAtomWithPersistence } from '~/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react';

type ConnectAction = { type: 'connect'; wallet: string; balance: string }
type DisconnectAction = { type: 'disconnect' }
type PageLoadedAction = {
  type: 'pageLoaded'
  isMetaMaskInstalled: boolean
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
  isMetaMaskInstalled: boolean
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
  switch (action.type) {
    case 'connect': {
      const { wallet, balance } = action
      const newState = { ...state, wallet, balance, status: 'idle' } as State
      return newState
    }
    case 'disconnect': {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged')
      }
      return { ...state, wallet: null, balance: null }
    }
    case 'pageLoaded': {
      const { isMetaMaskInstalled, balance, wallet } = action
      return { ...state, isMetaMaskInstalled, status: 'idle', wallet, balance }
    }
    case 'loading': {
      return { ...state, status: 'loading' }
    }
    case 'idle': {
      return { ...state, status: 'idle' }
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