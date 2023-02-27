import { auth } from '@/firebase/clientApp';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import SidebarCollection from './SidebarCollection';
import SidebarMyLists from './SidebarMyLists';
import SidebarMyTags from './SidebarMyTags';
import SidebarSearchInput from './SidebarSearchInput';

const Sidebar: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <></>;
  }

  if (user === undefined) {
    router.push('/login');
  }

  return (
    <Stack className='w-full p-5' spacing={7}>
      <SidebarSearchInput user={user} />
      <SidebarCollection user={user} />
      <SidebarMyLists user={user} />
      <SidebarMyTags user={user} />
    </Stack>
  );
};
export default Sidebar;
