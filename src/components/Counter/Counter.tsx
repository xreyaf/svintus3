import { AddIcon, CheckIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Avatar,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { cloneDeep, isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import {
  decrement,
  ICounterState,
  increment,
  selectCount,
  setState,
} from '../../features/counter/counterSlice';
import { firestore } from '../../lib/firebase';
import ModalConfirmation from './ModalConfirmation';
import { calcAvatarUrl } from './utils';

interface ICounterProp {
  name: string;
}

const Counter = ({ name }: ICounterProp) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const count = useSelector((state: ICounterState) => selectCount(name)(state));

  const countersRef = doc(firestore, '/counters', 'm8QSBnn81U6SV78BAR1i');
  const formattedName = name.replace('counter', '');
  const gradient =
    'linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)';

  const fetchData = async () => {
    setIsLoading(true);

    let prevData: ICounterState[];
    await getDocs(collection(firestore, '/counters')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      if (isEqual(prevData, newData)) {
        return;
      } else {
        prevData = cloneDeep(newData);
      }
      const counters = newData;
      delete counters[0]._id;
      for (const index in counters[0]) {
        dispatch(setState(index)(counters[0][index]));
      }
    });

    setIsLoading(false);
  };

  const submitForm = async (name: string, number: number) => {
    setIsLoading(true);

    await updateDoc(countersRef, {
      [name]: number,
    }).catch((err) => {
      toast({
        title: 'An error occurred',
        description: err.description as string,
        status: 'error',
        duration: 1500,
      });
    });

    await fetchData();

    toast({
      title: 'Данные обновлены',
      status: 'success',
      duration: 2000,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card size="lg">
      <CardHeader>
        <Flex flex="1" gap="4" flexDirection="column" alignItems="center" flexWrap="wrap">
          <Avatar size="xl" name={formattedName} src={calcAvatarUrl(formattedName)} />
          <Heading size="xl">{formattedName}</Heading>
        </Flex>
      </CardHeader>

      <CardBody pt="0">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          flexWrap="wrap"
        >
          <Flex w="100%" alignItems="center" flexDirection="column">
            <ModalConfirmation
              name={name}
              formattedName={formattedName}
              onApprove={() => submitForm(name, 0)}
            />
            <Text
              flex="1"
              bgGradient={gradient}
              bgClip="text"
              fontSize="8xl"
              fontWeight="extrabold"
              align="center"
            >
              {isLoading ? '(⁠ᵔ⁠ᴥ⁠ᵔ⁠)' : count}
            </Text>
          </Flex>

          <ButtonGroup w="100%">
            <IconButton
              p="5"
              flex="1"
              variant="ghost"
              aria-label="Decrement counter"
              icon={<MinusIcon />}
              fontSize="2xl"
              onClick={() => dispatch(decrement(name)())}
            />
            <IconButton
              p="5"
              flex="1"
              aria-label="Save counter"
              gap="2"
              variant="ghost"
              fontSize="2xl"
              icon={<CheckIcon />}
              isLoading={isLoading}
              spinner={<BeatLoader color="gray" size={8} />}
              onClick={() => submitForm(name, count)}
            />
            <IconButton
              p="5"
              flex="1"
              aria-label="Increment counter"
              variant="ghost"
              fontSize="2xl"
              icon={<AddIcon />}
              onClick={() => dispatch(increment(name)())}
            />
          </ButtonGroup>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Counter;
