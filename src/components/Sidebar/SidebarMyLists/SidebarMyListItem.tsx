import { MyList, myListsState } from '@/atoms/myListAtom';
import { ColorSchemesBg } from '@/constants/colorScheme';
import { auth } from '@/firebase/clientApp';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaListUl } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { RxDotsHorizontal } from 'react-icons/rx';
import { useSetRecoilState } from 'recoil';
import CreateModal from '../CreateOrUpdateModal';
import RoundIcon from '../RoundIcon';

type SidebarMyListItemProps = {
  myList: MyList;
  isLastItem: boolean;
};

const SidebarMyListItem: React.FC<SidebarMyListItemProps> = ({
  myList,
  isLastItem = false,
}) => {
  const [user] = useAuthState(auth);
  const [isHover, setIsHover] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setMyListsStateValue = useSetRecoilState(myListsState);

  const handleDelete = () => {
    axios
      .delete(`/api/lists/${myList._id}`)
      .then((res) => {
        setMyListsStateValue((pre) => ({
          myLists: [...pre.myLists].filter((cur) => cur._id !== myList._id),
        }));
      })
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  const handleUpdate = (name: string, color: string) => {
    axios
      .post(`/api/lists/${myList._id}`, {
        uid: user!.uid,
        name: name,
        color: color,
      })
      .then((res) => {
        setMyListsStateValue((pre) => ({
          myLists: [
            ...pre.myLists.filter((cur) => cur._id !== myList._id),
            res.data.myList,
          ],
        }));
      })
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  return (
    <>
      <Link href={`/${myList._id}`}>
        <Flex
          justify={'space-between'}
          className={`cursor-pointer hover:bg-gray-50 hover:rounded-xl p-2 px-4 ${
            !isLastItem && 'border-b'
          }`}
        >
          <Flex alignItems={'center'} className='gap-2'>
            <RoundIcon color={ColorSchemesBg[myList.color]} IconAs={FaListUl} />
            <Text>{myList.name}</Text>
          </Flex>
          <Flex
            alignItems={'center'}
            className='text-gray-500 gap-2 px-3'
            onMouseEnter={() => setIsHover(true)}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Menu>
              <Text>{myList.numberOfTodos}</Text>
              <MenuButton as={Box}>
                <Icon as={RxDotsHorizontal} className='text-gray-500 text-lg' />
              </MenuButton>
              <MenuList marginTop={'-0.5rem'}>
                <MenuItem onClick={handleDelete}>
                  <Icon as={DeleteIcon} className='mr-2' />
                  Delete List
                </MenuItem>
                <MenuItem onClick={onOpen}>
                  <Icon as={MdDriveFileRenameOutline} className='mr-2' />
                  Rename List
                  <CreateModal
                    isOpen={isOpen}
                    onClose={onClose}
                    createOrUpdateBtnTitle={'Rename List'}
                    handleCreateOrUpdate={handleUpdate}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
            {/* {isHover ? (
              <Menu>
                <MenuButton as={Box}>
                  <Icon
                    as={RxDotsHorizontal}
                    className='text-gray-500 text-lg'
                  />
                </MenuButton>
                <MenuList marginTop={'-0.5rem'}>
                  <MenuItem onClick={handleDelete}>
                    <Icon as={DeleteIcon} className='mr-2' />
                    Delete List
                  </MenuItem>
                  <MenuItem onClick={onOpen}>
                    <Icon as={MdDriveFileRenameOutline} className='mr-2' />
                    Rename List
                    <CreateModal
                      isOpen={isOpen}
                      onClose={onClose}
                      createOrUpdateBtnTitle={'Rename List'}
                      handleCreateOrUpdate={handleUpdate}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Text>{myList.numberOfTodos}</Text>
            )} */}

            {/* <ChevronRightIcon className='text-gray-500' /> */}
          </Flex>
        </Flex>
      </Link>
    </>
  );
};
export default SidebarMyListItem;
