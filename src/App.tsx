import { Center, Container, Image, SimpleGrid } from '@chakra-ui/react';

import logo from './assets/logo.webp';
import Counter from './components/Counter';

function App(): JSX.Element {
  return (
    <Container mb="6" maxW="90vw" as="main">
      <Center>
        <Image src={logo} alt="logo" w="60vw" h="20vh" m="10" />
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
