import { Icon } from '@chakra-ui/react';
import React from 'react';

type RoundIconProps = {
  color: string;
  IconAs: any;
};

const RoundIcon: React.FC<RoundIconProps> = ({ color, IconAs }) => {
  return (
    <div
      className={`${color} p-2 rounded-full flex justify-center items-center`}
    >
      <Icon as={IconAs} color={'white'} />
    </div>
  );
};
export default RoundIcon;
