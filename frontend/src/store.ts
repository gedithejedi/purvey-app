import { atom } from "jotai";
import type { State } from "~/hooks/useMetaMask"

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: false,
  status: 'loading',
  balance: null,
} as const

// Jotai implementation
const stateAtom = atom<State | null>(initialState)
stateAtom.onMount = (dispatch) => {
  if(typeof window !== undefined) {
    dispatch(JSON.parse(localStorage.getItem('state')) as State)
  }
}

export const stateAtomWithPersistence = atom(
  (get) => get(stateAtom),
  (_get, set, newState: State | null) => {
    if(typeof window === undefined) {
      return
      // throw Error('Set action cannot be called in server side rendering!')
    }
    set(stateAtom, newState)
    localStorage.setItem('state',JSON.stringify(newState))
  },
)