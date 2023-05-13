import { atom } from "jotai";
import type { State } from "~/hooks/useMetaMask"


// Jotai implementation
export const metaMaskAtom = atom<State | null>(null);
