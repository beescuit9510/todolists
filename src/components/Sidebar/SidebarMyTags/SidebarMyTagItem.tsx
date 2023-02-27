import { MyTag, myTagsState } from '@/atoms/myTagsAtom';
import { Box, Collapse, Tag, Text } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil';

type SidebarMyTagItemProps = {
  tag: MyTag;
};

const SidebarMyTagItem: React.FC<SidebarMyTagItemProps> = ({ tag }) => {
  const setMyTagsStateValue = useSetRecoilState(myTagsState);
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`/api/tags/${tag._id}`)
      .then((res) => {
        setMyTagsStateValue((pre) => ({
          myTags: [...pre.myTags].filter((cur) => cur._id !== tag._id),
        }));
      })
      .catch(console.error);
    //todo error handling (alert or toast)
  };

  return (
    <Box
      // href={`/tags/${tag._id}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Tag
        key={tag._id}
        className={`hover:font-bold hover:bg-${tag.color}-300`}
        colorScheme={tag.color}
      >
        <Text>#</Text>
        {tag.name}
        {show && (
          <FiDelete
            className={`hover:text-lg`}
            fontSize={'1rem'}
            onClick={handleDelete}
          />
        )}
      </Tag>
    </Box>
  );
};
export default SidebarMyTagItem;
