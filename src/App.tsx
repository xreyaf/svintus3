import { Center, Container, SimpleGrid, Text } from '@chakra-ui/react';

import Counter from './components/Counter';

function App(): JSX.Element {
  return (
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

      <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(1, 1fr))">
        <Counter name="counterRoman" />
        <Counter name="counterElizabeth" />
        <Counter name="counterArseniy" />
        <Counter name="counterDmitriy" />
        <Counter name="counterOksana" />
      </SimpleGrid>
    </Container>
  );
}

export default App;
