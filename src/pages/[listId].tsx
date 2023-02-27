import { MyList, myListsState } from '@/atoms/myListAtom';
import { todosState } from '@/atoms/todosAtom';
import ListTodoItem from '@/components/ListTodoItem';
import { ColorSchemes, ColorSchemesText } from '@/constants/colorScheme';
import { auth } from '@/firebase/clientApp';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';

const textColor = (color: string) => `text-${color}-700`;

const MyListPage: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  const [todosStateValue, setTodosStateValue] = useRecoilState(todosState);

  const myListsStateValue = useRecoilValue(myListsState);

  const router = useRouter();
  const { listId } = router.query;

  const [curList, setCurList] = useState<MyList>();

  useEffect(() => {
    setCurList(myListsStateValue.myLists.find((list) => list._id === listId));
  }, [listId]);

  //if there is no user yet loading and error handling
  useEffect(() => {
    if (!user) return;
    //if there is no user yet loading and error handling

    axios
      .get('/api/todos', { params: { uid: user.uid, list: listId } })
      .then((res) => {
        setTodosStateValue((pre) => ({
          ...pre,
          todos: res.data.todos,
        }));
      });
  }, [user, listId]);

  if (!curList) {
    return <>Not Found</>;
  }

  const textColorClass = ColorSchemesText[curList.color];

  return (
    <Stack spacing={'8'} className={'p-8 h-full'}>
      <Flex className='flex-col'>
        <Flex
          className={`justify-between text-3xl font-bold ${textColorClass}`}
        >
          <Text>{curList.name}</Text>
          <Text>{curList.numberOfTodos}</Text>
        </Flex>
        <Breadcrumb
          className='text-gray-500 text-sm px-1'
          spacing='8px'
          separator={<ChevronRightIcon color='gray.500' />}
        >
          <BreadcrumbItem>
            <Link href={'/'}>Lists</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Link href={'#'}>{curList.name}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      {todosStateValue.todos.map((todo) => (
        <ListTodoItem
          key={todo._id}
          todo={todo}
          editMode={false}
          listId={curList._id}
        />
      ))}
      <ListTodoItem editMode={true} listId={curList._id} />
    </Stack>
  );
};
export default MyListPage;
