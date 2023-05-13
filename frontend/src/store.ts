import { atom } from "jotai";
import type { State } from "~/hooks/useMetaMask"

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: null,
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
    }
    set(stateAtom, newState)
    localStorage.setItem('state',JSON.stringify(newState))
  },
)