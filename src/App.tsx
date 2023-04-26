import { Box, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import logo from './assets/logo.webp';
import Counter from './components/Counter';

const bounceTransition = {
  y: {
    duration: 1,
    yoyo: Infinity,
    ease: 'easeOut',
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: 'easeOut',
    repeatDelay: 0.8,
  },
};

function App(): JSX.Element {
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
          transition={bounceTransition}
          animate={{
            y: [20, 0],
          }}
        >
          <Image src={logo} alt="" h="40vmin" />
        </motion.div>
        <Counter name="counterRoman" />
        <Counter name="counterElizabeth" />
        <Counter name="counterArseniy" />
        <Counter name="counterDmitriy" />
        <Counter name="counterOksana" />
      </Flex>
    </Box>
  );
}

export default App;
