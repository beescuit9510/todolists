import {
  ColorScheme,
  ColorSchemes,
  ColorSchemesBg,
  ColorSchemesOutline,
  defaultColorScheme,
} from '@/constants/colorScheme';
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  createOrUpdateBtnTitle: string;
  handleCreateOrUpdate: (name: string, color: string) => void;
};

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  createOrUpdateBtnTitle,
  handleCreateOrUpdate,
}) => {
  const [color, setColor] = React.useState<string>(defaultColorScheme);
  const [name, setName] = React.useState<string>('');

  const handleClose = () => {
    setColor(defaultColorScheme);
    setName('');
    onClose();
  };

  const handleCreateBtnClick = () => {
    handleCreateOrUpdate(name, color);
    handleClose();
  };
  //todo placeholder for name when tis update
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className='flex flex-col gap-2 my-4'>
            <Flex alignItems={'center'} className={'gap-2'}>
              <label htmlFor='tagName'>Name: </label>
              <input
                id='tagName'
                type='text'
                value={name}
                onChange={({ target }) => setName(target.value)}
                className={`border rounded-md flex-grow p-1 px-3 focus:outline-none`}
              />
            </Flex>
            <Flex>
              <label
                htmlFor='tagColor'
                className='flex flex-row items-center gap-2'
              >
                <Text>Color:</Text>
                <RadioGroup onChange={setColor} value={color}>
                  <Stack direction='row'>
                    {ColorSchemes.map((color) => {
                      return (
                        <Radio
                          key={color}
                          value={color}
                          border={color}
                          className={`${ColorSchemesBg[color]}`}
                          colorScheme={`${ColorSchemesBg[color]}`}
                          _focus={{ shadow: 'none' }}
                        />
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </label>
              <Flex></Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex className='gap-2'>
              <button
                className='border px-3 rounded-lg shadow-sm hover:bg-gray-50'
                onClick={handleClose}
              >
                Cancel
              </button>
              {name === '' ? (
                <button
                  className='border px-3 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400'
                  disabled
                >
                  {createOrUpdateBtnTitle}
                </button>
              ) : (
                <button
                  className='border px-3 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400'
                  onClick={handleCreateBtnClick}
                >
                  {createOrUpdateBtnTitle}
                </button>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateModal;
