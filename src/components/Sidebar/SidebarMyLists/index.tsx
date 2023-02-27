import { MyList, myListsState } from '@/atoms/myListAtom';
import { ColorSchemesBg } from '@/constants/colorScheme';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';

import { User } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import CreateModalButton from '../CreateOrUpdateModal/CreateModalButton';
import SidebarEmptyList from '../SidebarEmptyList';
import MyListItem from './SidebarMyListItem';

type SidebarMyListsProps = { user: User };

const SidebarMyLists: React.FC<SidebarMyListsProps> = ({ user }) => {
  const [myListSateValue, setMyListStateValue] = useRecoilState(myListsState);

  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/lists/${user.uid}`)
      .then((res) => setMyListStateValue({ myLists: res.data.myLists }))
      .catch(console.error);
    //todo error handling (alert or toast)

    setLoading(false);
  }, []);

  const handleCreate = (name: string, color: string) => {
    axios
      .post('/api/lists', { uid: user.uid, name, color })
      .then((res) =>
        setMyListStateValue((pre) => ({
          myLists: [...pre.myLists, res.data.myList as MyList],
        }))
      )
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  if (loading) {
    return (
      <Stack>
        <Skeleton className='h-5' />
        <Skeleton className='h-5' />
        <Skeleton className='h-5' />
      </Stack>
    );
  }

  return (
    <Stack>
      <Flex justify={'space-between'} alignItems={'center'}>
        <Text className='text-xl font-bold'>
          My Lists
          <Box
            className='ml-2 px-1 inline-block rounded-full hover:bg-gray-50 cursor-pointer'
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </Box>
        </Text>
        <CreateModalButton
          createBtnTitle='Create a new List'
          handleCreate={handleCreate}
        />
      </Flex>

      {hidden ? (
        <Divider />
      ) : myListSateValue.myLists ? (
        <Box className='border rounded-xl flex flex-col'>
          {myListSateValue.myLists.map((myList, index) => {
            const iconColor = ColorSchemesBg[myList.color];
            return (
              <>
                <Link href={`/${myList.color}`}>
                  <MyListItem
                    myList={myList}
                    myListTitle={myList.name}
                    myListColor={iconColor}
                    numberOfTodos={9}
                    isLastItem={index == myListSateValue.myLists.length - 1}
                  />
                </Link>
              </>
            );
          })}
        </Box>
      ) : (
        <SidebarEmptyList />
      )}
    </Stack>
  );
};
export default SidebarMyLists;
