import { createStore } from 'zustand/vanilla'

import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export type CounterState = {
  count: number
  isLoading: boolean
}

export type CounterActions = {
  incrementCount: () => void
  decrementCount: () => void
  setCount: (value: number) => void
}

export type CounterStore = CounterState & CounterActions

export const createCounterStore = (name: string, initialCount: number = 0) => {
  const counterDocRef = doc(firestore, '/counters', process.env.NEXT_PUBLIC_FB_DOC_PATH!)

  const store = createStore<CounterStore>((set) => ({
    count: initialCount,
    isLoading: false,
    incrementCount: () => {
      set((state) => ({ count: state.count + 1 }))
      updateDoc(counterDocRef, { [name]: store.getState().count })
    },
    decrementCount: () => {
      set((state) => ({ count: state.count - 1 }))
      updateDoc(counterDocRef, { [name]: store.getState().count })
    },
    setCount: (value: number) => set({ count: value }),
  }))

  onSnapshot(counterDocRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data()
      if (data[name] !== undefined) {
        store.setState({ count: data[name] })
      }
    }
  })

  return store
}
