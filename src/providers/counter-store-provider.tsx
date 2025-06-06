'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { CounterStore, createCounterStore } from '@/stores/counter-store'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined)

export interface CounterStoreProviderProps {
  children: ReactNode
  name: string
  initialCount?: number
}

export const CounterStoreProvider = ({ children, name }: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi | null>(null)
  if (!storeRef.current) {
    storeRef.current = createCounterStore(name, 0)
  }

  return <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>
}

export const useCounterStore = <T,>(selector: (store: CounterStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
