import { AddIcon, CheckIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { cloneDeep, isEqual } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const count = useSelector((state: ICounterState) => selectCount(name)(state));
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const countersRef = doc(firestore, '/counters', 'm8QSBnn81U6SV78BAR1i');

  const formattedName = name.replace('counter', '');

  const countTitles = ['очко', 'очка', 'очков'];
  const getFormattedCount = (number: number, titles: string[]) => {
    number = Math.abs(number);
    let cases;
    if (Number.isInteger(number)) {
      cases = [2, 0, 1, 1, 1, 2];
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    }
    return titles[1];
  };

  const fetchData = async () => {
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
  };

  const submitForm = async (name: string, number: number) => {
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

    onClose();
    toast({
      title: 'Данные обновлены',
      status: 'success',
      duration: 2000,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card size="lg">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar size="xl" name={formattedName} src={calcAvatarUrl(formattedName)} />
          <Heading size="xl">{formattedName}</Heading>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          flexWrap="wrap"
        >
          <Stat
            position="relative"
            w="100%"
            p="4"
            mb="4"
            alignItems="center"
            border="4px"
            borderColor="blackAlpha.50"
            rounded="10"
          >
            <StatLabel>Количество очков:</StatLabel>
            <StatNumber mt="1">{count}</StatNumber>
            <ModalConfirmation
              name={name}
              formattedName={formattedName}
              onApprove={() => submitForm(name, 0)}
            />
          </Stat>

          <ButtonGroup w="100%">
            <IconButton
              p="5"
              flex="1"
              variant="ghost"
              aria-label="Decrement counter"
              icon={<MinusIcon />}
              onClick={() => dispatch(decrement(name)())}
            />
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <IconButton
                  p="5"
                  flex="1"
                  aria-label="Save counter"
                  gap="2"
                  variant="ghost"
                  icon={<CheckIcon />}
                  onClick={onToggle}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">Обновление данных</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  У {formattedName} будет {count} {getFormattedCount(count, countTitles)}!
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button variant="outline" onClick={onClose}>
                      Отменить
                    </Button>
                    <Button colorScheme="green" onClick={() => submitForm(name, count)}>
                      Сохранить
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
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
    </Card>
  );
};

export default Counter;
