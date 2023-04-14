import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'jotai';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import myStore from './store';
import theme from './theme';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
