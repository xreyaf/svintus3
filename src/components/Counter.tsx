import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment, selectCount } from '../features/counter/counterSlice';

const Counter = ({ name }: { name: string }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const count = useSelector((state) => selectCount(name)(state));
  const dispatch = useDispatch();

  const submitForm = async (name: string, number: number) => {
    const isProved = confirm(`Хочешь обновить ${name}?`);
    if (isProved) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/svin`, {
        method: 'PUT',
        body: JSON.stringify({
          [name]: number,
        }),
      });
      await res.json();
      setTimeout(() => {
        console.log(1);
      }, 500);
    } else {
      setTimeout(() => {
        console.log(1);
      }, 500);
      return null;
    }
  };

  const loadData = async () => {
    const res = await fetch(
      'https://us-east-2.aws.data.mongodb-api.com/app/data-rctre/endpoint/data/v1',
      {
        headers: {},
      },
    );
    console.log(res.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Heading>{name.replace('counter', '')}</Heading>
      <Text>{count}</Text>
      <Button onClick={() => dispatch(decrement(name)())}>-1</Button>
      <Button onClick={() => dispatch(increment(name)())}>+1</Button>
      <Button onClick={() => submitForm(name, count)}>upd</Button>
    </>
  );
};

export default Counter;
