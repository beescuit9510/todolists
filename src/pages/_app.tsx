import Layout from '@/components/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default App;
