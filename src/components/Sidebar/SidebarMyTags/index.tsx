import { MyTag, myTagsState } from '@/atoms/myTagsAtom';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { User } from 'firebase/auth';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import CreateModalButton from '../CreateOrUpdateModal/CreateModalButton';
import SidebarEmptyList from '../SidebarEmptyList';
import SidebarMyTagItem from './SidebarMyTagItem';

type SidebarMyTagsProps = { user: User };

const SidebarMyTags: React.FC<SidebarMyTagsProps> = ({ user }) => {
  const [myTagsSateValue, setMyTagsStateValue] = useRecoilState(myTagsState);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/tags/${user.uid}`)
      .then((res) => setMyTagsStateValue({ myTags: res.data.myTags }))
      .catch(console.error);
    //todo error handling (alert or toast)

    setLoading(false);
  }, []);

  const handleCreate = (name: string, color: string) => {
    axios
      .post('/api/tags', { uid: user.uid, name, color })
      .then((res) =>
        setMyTagsStateValue((pre) => ({
          myTags: [...pre.myTags, res.data.myTag as MyTag],
        }))
      )
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  if (loading) {
    return (
      <Flex className='flex-wrap gap-2'>
        <Skeleton className='h-5 w-5'>
          <Tag className='rounded-lg'>#Tag</Tag>
        </Skeleton>
        <Skeleton className='h-5 w-5 rounded-lg'>
          <Tag className='rounded-lg'>#Tag</Tag>
        </Skeleton>
        <Skeleton className='h-5 w-5 rounded-lg'>
          <Tag className='rounded-lg'>#Tag</Tag>
        </Skeleton>
      </Flex>
    );
  }

  return (
    <Stack>
      <Flex justify={'space-between'} alignItems={'center'}>
        <Text className='text-xl font-bold'>
          My Tags
          <Box
            className='ml-2 px-1 inline-block rounded-full hover:bg-gray-50 cursor-pointer'
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </Box>
        </Text>
        <CreateModalButton
          createBtnTitle='Create a new Tag'
          handleCreate={handleCreate}
        />
      </Flex>
      {hidden ? (
        <Divider />
      ) : myTagsSateValue ? (
        <Flex className='flex-wrap gap-2'>
          <Tag className='hover:font-bold hover:bg-red-200' colorScheme={'red'}>
            All Tags
          </Tag>
          {myTagsSateValue.myTags.map((tag) => (
            <SidebarMyTagItem key={tag._id} tag={tag} />
          ))}
        </Flex>
      ) : (
        <SidebarEmptyList />
      )}
    </Stack>
  );
};
export default SidebarMyTags;
