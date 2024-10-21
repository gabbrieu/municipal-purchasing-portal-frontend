import { IReqUser } from '@/types/user';
import { Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

export interface IUserInfo {
  userData: IReqUser | undefined;
}

export const UserInfo: React.FC<IUserInfo> = ({ userData }) => {
  //  TODO: usar Popover para as opções do usuário (logout, configurações, etc)

  return (
    <>
      {userData ? (
        <>
          <Text wordBreak="break-all">{userData.username}</Text>
          <Text fontSize="xx-small" wordBreak="break-all">
            {userData.email}
          </Text>
        </>
      ) : (
        <>
          <Skeleton height="20px" width="100px" />
          <Skeleton height="12px" width="150px" />
        </>
      )}
    </>
  );
};
