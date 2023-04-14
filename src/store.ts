import { createStore, useAtom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';
import { atomFamily } from 'jotai/utils';

const myStore = createStore();

const countReducer = (prev: number, action: { type: 'inc' | 'dec' }) => {
  if (action.type === 'inc') {
    return prev + 1;
  } else if (action.type === 'dec') {
    return prev - 1;
  } else {
    throw new Error('unknown action type');
  }
};

const myFamily = atomFamily((name: string) => atomWithReducer(name, 0, countReducer));

export default myStore;
