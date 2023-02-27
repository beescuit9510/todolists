import { myListsState } from '@/atoms/myListAtom';
import { myTagsState } from '@/atoms/myTagsAtom';
import { todosState } from '@/atoms/todosAtom';
import { CalendarIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { User } from 'firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsBoxSeam, BsCalendarDate, BsFlagFill } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import RoundIcon from './RoundIcon';

type SidebarCollectionProps = { user: User };

const SidebarCollection: React.FC<SidebarCollectionProps> = ({ user }) => {
  const [all, setAll] = useState<number>(0);
  const [flagged, setFlagged] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [today, setToday] = useState<number>(0);
  const [scheduled, setScheduled] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const todosStateValue = useRecoilValue(todosState);
  const myListsStateValue = useRecoilValue(myListsState);
  const myTagsStateValue = useRecoilValue(myTagsState);

  useEffect(() => {
    axios
      .get('/api/todos/count', {
        params: {
          uid: user.uid,
          dueDate: moment(new Date()).format('YYYY-MM-DD'),
        },
      })
      .then((res) => setToday(res.data.todos));
    axios
      .get('/api/todos/count', {
        params: {
          uid: user.uid,
        },
      })
      .then((res) => {
        setAll(res.data.todos);
      });
    axios
      .get('/api/todos/count', {
        params: {
          uid: user.uid,
          flagged: true,
        },
      })
      .then((res) => {
        setFlagged(res.data.todos);
      });
    axios
      .get('/api/todos/count', {
        params: {
          uid: user.uid,
          completed: true,
        },
      })
      .then((res) => {
        setCompleted(res.data.todos);
      });
    axios
      .get('/api/todos/count', {
        params: {
          uid: user.uid,
          scheduled: true,
        },
      })
      .then((res) => {
        setScheduled(res.data.todos);
      });
  }, [todosStateValue, myListsState, myTagsState]);

  return (
    <Stack>
      <Flex className='gap-2 flex-col md:flex-row'>
        <Box className='bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 flex flex-col gap-1 w-full'>
          <Flex justify={'space-between'}>
            <RoundIcon color={'bg-blue-500'} IconAs={BsCalendarDate} />
            <Text className='font-bold text-gray-700 text-xl'>{today}</Text>
          </Flex>
          <Text className='font-semibold text-gray-700'>Today</Text>
        </Box>
        <Box className='bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 flex flex-col gap-1 w-full'>
          <Flex justify={'space-between'}>
            <RoundIcon color={'bg-red-500'} IconAs={CalendarIcon} />
            <Text className='font-bold text-gray-700 text-xl'>{scheduled}</Text>
          </Flex>
          <Text className='font-semibold text-gray-700'>Scheduled</Text>
        </Box>
      </Flex>
      <Flex className='gap-2 flex-col md:flex-row'>
        <Box className='bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 flex flex-col gap-1 w-full'>
          <Flex justify={'space-between'}>
            <RoundIcon color={'bg-gray-800'} IconAs={BsBoxSeam} />
            <Text className='font-bold text-gray-700 text-xl'>{all}</Text>
          </Flex>
          <Text className='font-semibold text-gray-700'>All</Text>
        </Box>
        <Box className='bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 flex flex-col gap-1 w-full'>
          <Flex justify={'space-between'}>
            <RoundIcon color={'bg-orange-500'} IconAs={BsFlagFill} />
            <Text className='font-bold text-gray-700 text-xl'>{flagged}</Text>
          </Flex>
          <Text className='font-semibold text-gray-700'>Flagged</Text>
        </Box>
      </Flex>
      <Flex className='gap-2 flex-col md:flex-row'>
        <Box className='bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 flex flex-col gap-1 w-full'>
          <Flex justify={'space-between'}>
            <RoundIcon color={'bg-gray-500'} IconAs={CheckIcon} />
            <Text className='font-bold text-gray-700 text-xl'>{completed}</Text>
          </Flex>
          <Text className='font-semibold text-gray-700'>Completed</Text>
        </Box>
        <Box className='p-2 w-full'></Box>
      </Flex>
    </Stack>
  );
};
export default SidebarCollection;
