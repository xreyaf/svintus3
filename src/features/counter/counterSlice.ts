import { createSlice } from '@reduxjs/toolkit';

interface ICounters {
  [key: string]: any;
}

const countersByName: ICounters = {};

const initialState = {
  value: 0,
};

export const createGenericSlice = (sliceName: string) => {
  return createSlice({
    name: sliceName,
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        if (state.value <= 0) {
          state.value = 0;
        } else state.value -= 1;
      },
      incrementByAmount: (state, { payload }) => {
        if (state.value <= 0) {
          state.value = 0;
        } else state.value += Math.abs(payload);
      },
      setState: (state, { payload }) => {
        state.value = payload;
      },
    },
  });
};

export const increment = (counterName: string) =>
  countersByName[counterName].actions.increment;
export const decrement = (counterName: string) =>
  countersByName[counterName].actions.decrement;
export const incrementByAmount = (counterName: string) =>
  countersByName[counterName].actions.incrementByAmount;
export const setState = (counterName: string) =>
  countersByName[counterName].actions.setState;

export const selectCount =
  (counterName: string) => (state: { [x: string]: { value: number } }) =>
    state[counterName].value;

const createCounter = (name: string) => {
  const slice = createGenericSlice(name);

  countersByName[name] = {
    actions: slice.actions,
  };

  return slice.reducer;
};

export default createCounter;
