'use client';

import { GeneralButton } from '@/components/Button/GeneralButton';
import { useSessionData } from '@/hooks/get-session-data';
import { api } from '@/utils/fetch';
import {
  Circle,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useCustomToast } from '../../hooks/custom-toast';
import { UserInfo } from './UserInfo';

export const UserConfigPopover: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useCustomToast();
  const router = useRouter();
  const { data: userData } = useSessionData();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const initials: string = userData
    ? `${userData?.name.split(' ')[0][0]}${userData?.name.split(' ')[1][0]}`
    : 'AB';

  const handleLogoutClick = async () => {
    try {
      setLoading(true);
      await api('/auth/logout', { method: 'POST' });

      router.push('/auth/login');
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Erro no logout',
        description: `Erro inesperado no logout: ${
          error.message || 'algo deu errado'
        }`,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <Flex
          justifyContent={{ base: 'center', md: 'flex-start' }}
          align="center"
          py="4"
          px="8"
          role="group"
          _hover={{
            cursor: 'pointer',
          }}
        >
          <Icon mr="4" fontSize="16" as={FiUser} />
          <Flex direction="column">
            <UserInfo userData={userData} />
          </Flex>
        </Flex>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Text
            align="center"
            textTransform="uppercase"
            fontSize={{ base: 'sm', md: 'xs' }}
          >
            Logado como
          </Text>

          <Circle
            size={'40px'}
            bg={'blue.800'}
            color={'white'}
            alignItems={'center'}
            my={3}
          >
            {initials}
          </Circle>

          <Text
            textTransform={'capitalize'}
            fontWeight={'bold'}
            mb={3}
            fontSize={{ base: 'lg', md: 'md' }}
          >
            {userData?.name}
          </Text>

          <GeneralButton
            w="full"
            size={{ base: 'md', md: 'sm' }}
            leftIcon={<FiLogOut />}
            ref={initialFocusRef}
            onClick={handleLogoutClick}
            isLoading={loading}
          >
            Sair
          </GeneralButton>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
