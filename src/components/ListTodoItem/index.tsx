import { MyTag, myTagsState } from '@/atoms/myTagsAtom';
import { Todo, todosState } from '@/atoms/todosAtom';
import { auth } from '@/firebase/clientApp';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFlag, BsFlagFill } from 'react-icons/bs';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useSetRecoilState } from 'recoil';

type ListTodoItemProps = {
  todo?: Todo;
  editMode: boolean;
  listId: string;
};

const ListTodoItem: React.FC<ListTodoItemProps> = ({
  todo,
  editMode,
  listId,
}) => {
  const [user] = useAuthState(auth);
  const [todoId, setTodoId] = useState<string | undefined>(todo?._id);

  const [todoTaskName, setTodoTaskName] = useState<string | undefined>(
    todo?.taskName
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(
    todo?.completed ?? false
  );
  const [isFlagged, setIsFlagged] = useState<boolean>(todo?.flagged ?? false);
  const [todoNote, setTodoNote] = useState<string | undefined>(todo?.notes);
  const [todoDueDate, setTodoDueDate] = useState<string | undefined>(
    todo?.dueDate
  );
  const [todoDueTime, setTodoDueTime] = useState<string | undefined>(
    todo?.dueTime
  );
  const [todoTags, setTodoTags] = useState<MyTag[] | undefined>(todo?.tags);

  const [newTag, setNewTag] = useState<string>();

  const [isEditMode, setIsEditMode] = useState<boolean>(editMode);

  const setTodoStateValues = useSetRecoilState(todosState);

  const [searchTags, setSearchTags] = useState<MyTag[]>([]);

  const setMyTagsStateValue = useSetRecoilState(myTagsState);

  const handleDelete = () => {
    axios
      .delete(`/api/todos/${todoId}`)
      .then((res) => {
        setTodoStateValues((pre) => ({
          todos: pre.todos.filter((todo) => todo._id !== todoId),
        }));
      })
      .catch(console.error);
    //handle error alert or notification
  };

  useEffect(() => {
    axios
      .get(`/api/tags/${user!.uid}`, { params: { name: newTag } })
      .then((res) => setSearchTags(res.data.myTags))
      .catch(console.error);
    //todo error handling (alert or toast)
  }, [newTag]);

  const handleCreate = () => {
    if (!user!.uid) return;
    if (!todoTaskName) return;

    const body = {
      uid: user!.uid,
      taskName: todoTaskName,
      completed: isCompleted,
      flagged: isFlagged,
      notes: todoNote,
      dueDate: todoDueDate,
      dueTime: todoDueTime,
      list: listId,
      tags: todoTags?.map((tag) => tag._id),
    };

    Object.keys(body).forEach((k: any) => {
      !body[k] && delete body[k];
    });

    console.log(body);

    axios
      .post('/api/todos', body)
      .then((res) =>
        setTodoStateValues((pre) => ({
          todos: [...pre.todos, res.data.todo as Todo],
        }))
      )
      .catch(console.error);

    //handle error alert or notification
  };

  const handleUpdate = () => {
    if (
      todoTaskName === todo?.taskName &&
      isCompleted === todo?.completed &&
      isFlagged === todo?.flagged &&
      todoNote === todo?.notes &&
      todoDueDate === todo?.dueDate &&
      todoDueTime === todo?.dueTime &&
      todoTags?.map((tag) => tag._id) === todoTags?.map((tag) => tag._id)
    )
      return;

    axios
      .put(`/api/todos/${todoId}`, {
        uid: user!.uid,
        taskName: todoTaskName,
        completed: isCompleted,
        flagged: isFlagged,
        notes: todoNote,
        dueDate: todoDueDate,
        dueTime: todoDueTime,
        tags: todoTags?.map((tag) => tag._id),
      })
      .then((res) => {})
      .catch(console.error);
    //handle error alert or notification
  };

  const toggleCompleted = () => setIsCompleted(!isCompleted);
  const onChangeTaskName = (event: any) => setTodoTaskName(event.target.value);
  const onChangeNotes = (event: any) => setTodoNote(event.target.value);
  const onChangeTagInput = (event: any) => setNewTag(event.target.value);
  const onChangeDueDate = (event: any) => setTodoDueDate(event.target.value);
  const onChangeDueTime = (event: any) => setTodoDueTime(event.target.value);

  const onClickTag = (tag: MyTag) => {
    const pre = todoTags ?? [];
    setTodoTags([...pre, { ...tag }]);
    setNewTag('');
  };

  const onKeyDownTaskNameInput = (event: any) => {
    if (event.key !== 'Enter') return;
    handleMouseOut();
  };

  const handleMouseOver = (event: any) => {
    event.target.addEventListener('click', () => {
      setIsEditMode(true);
    });
  };
  const handleMouseOut = () => {
    if (isEditMode && editMode) {
      handleCreate();

      setTodoTaskName('');
      setIsFlagged(false);
      setIsCompleted(false);
      setTodoNote('');
      setTodoDueDate(undefined);
      setTodoDueTime(undefined);
      setTodoTags(undefined);
    }
    if (isEditMode && !editMode && todoTaskName) {
      handleUpdate();
    }
    if (isEditMode && !editMode && !todoTaskName) {
      handleDelete();
    }

    setIsEditMode(false);
  };

  const handleTagCreate = () => {
    axios
      .post('/api/tags', { uid: user!.uid, name: newTag, color: 'gray' })
      .then((res) => {
        setMyTagsStateValue((pre) => ({
          myTags: [...pre.myTags, res.data.myTag as MyTag],
        }));
        setNewTag('');
      })
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  return (
    <>
      <Flex
        className='items-start gap-2'
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        <Flex className='pt-0.5'>
          <input
            type={'radio'}
            checked={isCompleted}
            onClick={toggleCompleted}
            className='w-5 h-5'
            readOnly
          />
        </Flex>
        <Flex className='flex-col flex-grow'>
          <Flex className='flex-col'>
            <Flex className=''>
              <ReactTextareaAutosize
                autoFocus
                placeholder={editMode ? 'Add a New Task' : ''}
                className='outline-0 resize-none flex-grow'
                value={todoTaskName}
                onChange={onChangeTaskName}
                readOnly={!isEditMode}
                onKeyDown={onKeyDownTaskNameInput}
              />
              <Stack className='items-end'>
                <Flex>
                  {isFlagged && !isEditMode && (
                    <Icon as={BsFlagFill} color={'orange'} />
                  )}
                </Flex>
              </Stack>
            </Flex>
            <Collapse
              className='flex w-full'
              in={isEditMode || !todoNote == false}
            >
              <ReactTextareaAutosize
                className='outline-0 resize-none text-sm text-gray-500 flex-grow w-full'
                value={todoNote}
                placeholder={'Notes'}
                onChange={onChangeNotes}
                readOnly={!isEditMode}
              />
            </Collapse>
          </Flex>
          <Flex className='flex-wrap gap-1'>
            {todoDueDate && (
              <Text className='text-gray-500'>
                {moment(new Date(todoDueDate)).format('ddd DD MMM')}
                {todoDueTime ? `, ${todoDueTime}` : ''}
              </Text>
            )}
            {todoTags?.map((tag) => {
              return (
                <Tag key={tag.name} colorScheme={tag.color}>
                  <Text>#</Text>
                  {tag.name}
                </Tag>
              );
            })}
          </Flex>
          <Collapse in={isEditMode}>
            <Flex>
              <input
                className='outline-0 resize-none flex-grow text-sm text-gray-500'
                value={newTag}
                placeholder={'Add Tags'}
                onChange={onChangeTagInput}
              />
            </Flex>
            <Stack direction={'row'} className={'pb-1 flex-wrap'}>
              {searchTags?.map((tag) => {
                const textColor = `text-${tag.color}-500`;
                return (
                  <Text
                    key={tag._id}
                    className={`text-sm cursor-pointer ${textColor}`}
                    onClick={() => onClickTag(tag)}
                  >
                    #{tag.name}
                  </Text>
                );
              })}
              {(!searchTags || searchTags?.length === 0) && (
                <Text
                  className={`text-sm cursor-pointer hover:underline text-center`}
                  onClick={handleTagCreate}
                >
                  Create &quot;#{newTag}&quot;
                </Text>
              )}
            </Stack>
            <Flex>
              <Flex className={'flex flex-row gap-6'}>
                <input
                  type={'date'}
                  className={'outline-none'}
                  value={todoDueDate}
                  onChange={onChangeDueDate}
                />
                <input
                  type={'time'}
                  className={
                    'outline-none disabled:bg-gray-200 rounded-md px-1'
                  }
                  value={todoDueTime}
                  onChange={onChangeDueTime}
                  disabled={!todoDueDate}
                />
                <Box
                  className='bg-gray-50 p-2 py-0 rounded-md hover:bg-gray-100'
                  onClick={() => setIsFlagged(!isFlagged)}
                >
                  <Icon
                    as={isFlagged ? BsFlagFill : BsFlag}
                    color={'orange'}
                    fontSize={'0.7rem'}
                  />
                </Box>
              </Flex>
            </Flex>
          </Collapse>
          <Divider className='mt-2' />
        </Flex>
      </Flex>
    </>
  );
};
export default ListTodoItem;
