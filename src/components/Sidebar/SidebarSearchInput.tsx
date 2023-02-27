import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

type SidebarSearchInputProps = { user: User };

const SidebarSearchInput: React.FC<SidebarSearchInputProps> = ({ user }) => {
  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Search2Icon />
        </InputLeftElement>
        <Input
          type='text'
          placeholder='Search'
          className='contrast-more:border-slate-400 contrast-more:placeholder-slate-500'
        />
      </InputGroup>
    </Stack>
  );
};
export default SidebarSearchInput;
