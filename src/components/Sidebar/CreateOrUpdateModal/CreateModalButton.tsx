import { AddIcon } from '@chakra-ui/icons';
import { Box, Icon, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import CreateModal from '.';

type CreateModalButtonProps = {
  createBtnTitle: string;
  handleCreate: (name: string, color: string) => void;
};

const CreateModalButton: React.FC<CreateModalButtonProps> = ({
  createBtnTitle,
  handleCreate,
}) => {
  const [isOnHover, setIsOnHover] = React.useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        className={`hover:bg-blue-500 p-1 rounded-full flex justify-center items-center white`}
        onMouseEnter={() => setIsOnHover(true)}
        onMouseLeave={() => setIsOnHover(false)}
        onClick={() => {
          onOpen();
        }}
      >
        <Icon as={AddIcon} color={isOnHover ? 'white' : 'gray.500'} />
      </Box>
      <CreateModal
        isOpen={isOpen}
        onClose={onClose}
        createOrUpdateBtnTitle={createBtnTitle}
        handleCreateOrUpdate={handleCreate}
      />
    </>
  );
};
export default CreateModalButton;
