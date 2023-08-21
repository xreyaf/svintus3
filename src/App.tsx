import { Center, Container, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import {
  format,
  formatDistance,
  intlFormatDistance,
  startOfDay,
  subDays,
} from 'date-fns';
import { FC, Suspense } from 'react';

import Counter from './components/Counter';

const App: FC = () => {
  const date = new Date();
  const ago = subDays(date, 4);
  const start = startOfDay(date);

  const formattedDate = format(date, 'MM/dd/yyyy');
  const distanceDate = intlFormatDistance(ago, Date.now(), { locale: 'ru' });
  const libDistanceDate = formatDistance(ago, Date.now(), {
    addSuffix: true,
  });

  console.log(date);
  console.log(ago);
  console.log(start);
  console.log(formattedDate);
  console.log(distanceDate);
  console.log(libDistanceDate);

  return (
    <>
      <Container maxW="90vw" as="main">
        <Center>
          <Text
            bgGradient="linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            m="10"
          >
            cвинтус
          </Text>
        </Center>
        <Suspense fallback={<Spinner />}>
          <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(1, 1fr))">
            <Counter name="counterRoman" />
            <Counter name="counterElizabeth" />
            <Counter name="counterArseniy" />
            <Counter name="counterDmitriy" />
            <Counter name="counterOksana" />
          </SimpleGrid>
        </Suspense>
      </Container>
      <Container maxW="90vw" as="footer"></Container>
    </>
  );
};

export default App;
