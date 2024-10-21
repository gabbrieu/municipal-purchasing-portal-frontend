import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

export interface INavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  redirectTo: string;
}

export const NavItem: React.FC<INavItemProps> = ({
  icon,
  children,
  redirectTo,
  ...rest
}) => {
  return (
    <Box
      as="a"
      href={redirectTo}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.800',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
