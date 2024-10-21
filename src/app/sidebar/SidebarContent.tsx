import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FiHome } from 'react-icons/fi';
import { NavItem } from './NavItem';
import { UserConfigPopover } from './UserConfigPopover';

export interface ILinkItemProps {
  name: string;
  icon: IconType;
  redirectTo: string;
}

export const LinkItems: Array<ILinkItemProps> = [
  { name: 'Home', icon: FiHome, redirectTo: '/' },
  //   { name: 'Trending', icon: FiTrendingUp, redirectTo: '/' },
  //   { name: 'Explore', icon: FiCompass, redirectTo: '/' },
  //   { name: 'Favourites', icon: FiStar, redirectTo: '/' },
  //   { name: 'Settings', icon: FiSettings, redirectTo: '/' },
];

export interface ISidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent: React.FC<ISidebarProps> = ({
  onClose,
  ...rest
}) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      display="flex"
      flexDirection="column"
      {...rest}
    >
      <Box flex="1">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            Logo
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>

        <Flex direction="column" justifyContent={'space-between'}>
          {LinkItems.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              redirectTo={link.redirectTo}
            >
              {link.name}
            </NavItem>
          ))}
        </Flex>
      </Box>

      <Divider borderColor={'gray.300'} />

      <UserConfigPopover />
    </Box>
  );
};
