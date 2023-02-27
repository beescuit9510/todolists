import { auth } from '@/firebase/clientApp';
import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';

const LoginPage: NextPage = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const router = useRouter();

  const createUserDocument = async (user: User) => {
    //todo api routes (create user)
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
      router.push('/');
    }
  }, [userCred]);

  //todo error handling
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Stack spacing={'8'}>
        <Button
          variant={'ghost'}
          className='p-4 py-6 bg-white w-full rounded-md border hover:bg-gray-100 '
          onClick={() => {
            signInWithGoogle();
          }}
          isLoading={loading}
        >
          <Flex className='items-center justify-center gap-2 font-semibold'>
            <FcGoogle size={'1.5rem'} />
            <Text>Sign in with Google</Text>
          </Flex>
        </Button>
        <div className='relative'>
          <Divider />
          <Text
            className='absolute  text-center font-semibold bg-white px-4 text-gray-200'
            bottom={'-0.7rem'}
            left={'43%'}
          >
            OR
          </Text>
        </div>
        <div className='w-full max-w-xs m-auto bg-blue-100 rounded-md p-5 border'>
          <div className='w-full max-w-xs m-auto bg-blue-100 rounded p-5'>
            <form>
              <div>
                <label className='block mb-2 text-blue-500' htmlFor='username'>
                  Username
                </label>
                <input
                  className='w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300'
                  type='text'
                  name='username'
                />
              </div>
              <div>
                <label className='block mb-2 text-blue-500' htmlFor='password'>
                  Password
                </label>
                <input
                  className='w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300'
                  type='password'
                  name='password'
                />
              </div>
              <div>
                <input
                  className='w-full bg-blue-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
                  type='submit'
                />
              </div>
            </form>
            <footer className='flex flex-row gap-2'>
              <a
                className='text-blue-700 hover:text-pink-700 text-sm float-left'
                href='#'
              >
                Forgot Password?
              </a>
              <a
                className='text-blue-700 hover:text-pink-700 text-sm float-right'
                href='#'
              >
                Create Account
              </a>
            </footer>
          </div>
        </div>
      </Stack>
    </div>
  );
};
export default LoginPage;
