import { auth } from '@/firebase/clientApp';
import { Box, Flex } from '@chakra-ui/layout';
import { CircularProgress, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Flex className='justify-center items-center w-full h-screen'>
          <Spinner size='xl' color='blue.500' />
        </Flex>
        <main className='flex-grow'>{children}</main>
      </>
    );
  }

  if (router.pathname === '/login') {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  //todo fix tagList layout
  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <Box className='md:min-w-[300px] md:max-w-[400px] md:border-r md:flex md:min-h-screen '>
          <Sidebar />
        </Box>
        <main className='flex-grow'>{children}</main>
      </div>
    </>
  );
};
export default Layout;
