import { AddIcon, CheckIcon, MinusIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { cloneDeep, isEqual } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '../../firebase';
import {
  decrement,
  increment,
  resetState,
  selectCount,
  setState,
} from '../features/counter/counterSlice';

const countersRef = doc(firestore, '/counters', 'm8QSBnn81U6SV78BAR1i');

const OverlayTwo = () => <ModalOverlay bg="none" backdropFilter="blur(10px) " />;

const Counter = ({ name }: { name: string }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const count = useSelector((state) => selectCount(name)(state));
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const submitForm = async (name: string, number: number) => {
    try {
      await updateDoc(countersRef, {
        [name]: number,
      });
      await fetchData();

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    let prevData: any;

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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calcAvatarUrl = (name: string) => {
    switch (name) {
      case 'Roman':
        return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/roma.jpg?alt=media&token=bf85377b-5fb1-4842-9b0f-a0eee17d539d';

      case 'Elizabeth':
        return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/liza.jpg?alt=media&token=6dbee5c8-532e-47b1-92f4-8b9082dd94b9';

      case 'Arseniy':
        return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/ars.jpg?alt=media&token=0c8e73d3-a8a7-4540-b1c7-372e8373c291';
      case 'Dmitriy':
        return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/dima.jpg?alt=media&token=dc1a5dec-822a-4d59-8a56-3cc9a00806a4';
      case 'Oksana':
        return 'https://firebasestorage.googleapis.com/v0/b/svintus3-f2840.appspot.com/o/oksana.jpg?alt=media&token=726e57b0-86b2-4235-99c0-6327774a986b';
      default:
        return '';
    }
  };

  const formattedName = name.replace('counter', '');

  return (
    <Card size="lg">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar size="xl" name={formattedName} src={calcAvatarUrl(formattedName)} />
            <Heading size="xl">{name.replace('counter', '')}</Heading>
          </Flex>
          <Spacer />
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<RepeatIcon />}
            onClick={() => dispatch(resetState(name)())}
          />
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
          <Stat p="4" mb="4" alignItems="center" bg="blackAlpha.50" rounded={'10'}>
            <StatLabel>Количество очков:</StatLabel>
            <StatNumber mt="1">{count}</StatNumber>
          </Stat>

          <ButtonGroup>
            <IconButton
              p="5"
              flex="1"
              variant="ghost"
              aria-label="Decrement counter"
              icon={<MinusIcon />}
              onClick={() => dispatch(decrement(name)())}
            />
            <IconButton
              p="5"
              flex="1"
              aria-label="Save counter"
              gap="2"
              icon={<CheckIcon />}
              variant="ghost"
              // onClick={() => submitForm(name, count)}
              onClick={() => {
                setOverlay(<OverlayTwo />);
                onOpen();
              }}
            />
            <IconButton
              p="5"
              flex="1"
              aria-label="Increment counter"
              variant="ghost"
              icon={<AddIcon />}
              onClick={() => dispatch(increment(name)())}
            />
          </ButtonGroup>
        </Flex>
      </CardBody>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Обновление данных</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              У {formattedName}будет {count} очков!
            </Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing="4">
              <Button bg="green.100" onClick={() => submitForm(name, count)}>
                Сохранить
              </Button>
              <Button bg="red.100" onClick={onClose}>
                Закрыть
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Counter;
