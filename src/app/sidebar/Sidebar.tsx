'use client';

import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MobileNav } from './MobileNav';
import { SidebarContent } from './SidebarContent';

const pagesToNotRenderSidebar: string[] = ['/auth/login'];

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
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
