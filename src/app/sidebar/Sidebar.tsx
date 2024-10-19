'use client';

import { useSessionData } from '@/hooks/get-session-data';
import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { FiHome, FiMenu, FiUser } from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  redirectTo: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, redirectTo: '/' },
  //   { name: 'Trending', icon: FiTrendingUp, redirectTo: '/' },
  //   { name: 'Explore', icon: FiCompass, redirectTo: '/' },
  //   { name: 'Favourites', icon: FiStar, redirectTo: '/' },
  //   { name: 'Settings', icon: FiSettings, redirectTo: '/' },
];
const pagesToNotRenderSidebar = ['/auth/login'];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const bg = useColorModeValue('gray.100', 'gray.900');

  if (pagesToNotRenderSidebar.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Box minH="100vh" bg={bg}>
      {/* Sidebar do PC */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          {/* Sidebar do celular */}
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const userData = useSessionData();

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

      <Divider />
      <Flex
        justifyContent={{ base: 'center', md: 'flex-start' }}
        align="center"
        py="4"
        px="8"
        role="group"
      >
        <Icon mr="4" fontSize="16" as={FiUser} />
        <Flex direction="column">
          <Text wordBreak="break-all">{userData?.username || 'Usuário'}</Text>
          <Text fontSize="xx-small" wordBreak="break-all">
            {userData?.email || 'email'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  redirectTo: string;
}
const NavItem = ({ icon, children, redirectTo, ...rest }: NavItemProps) => {
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
          bg: 'cyan.400',
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
