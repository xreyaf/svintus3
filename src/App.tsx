import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import logo from './assets/logo.webp';
import useCount from './store';

const textFontSizes = [16, 18, 24, 30];

function App(): JSX.Element {
  const [count, dispatch] = useCount();

  return (
    <Box>
      <Flex
        as="header"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        fontSize="3xl"
      >
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          <Image src={logo} alt="" h="40vmin" />
        </motion.div>
        <Text fontSize={textFontSizes}>Hello Vite + React + Typescript + Chakra UI!</Text>
        <Button
          colorScheme="blue"
          fontSize={textFontSizes}
          onClick={() => dispatch({ type: 'dec' })}
          marginTop="2"
        >
          -1
        </Button>
        <Text fontSize={textFontSizes}>count is: {count}</Text>
        <Button
          colorScheme="blue"
          fontSize={textFontSizes}
          onClick={() => dispatch({ type: 'inc' })}
          marginTop="2"
        >
          +1
        </Button>
        <Text fontSize={textFontSizes}></Text>
      </Flex>
    </Box>
  );
}

export default App;
