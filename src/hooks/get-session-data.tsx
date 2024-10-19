import { IReqUser } from '@/types/user';
import { api } from '@/utils/fetch';
import { useEffect, useState } from 'react';

export function useSessionData(): IReqUser | undefined {
  const [userData, setUserData] = useState<IReqUser | undefined>(undefined);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const data = await api<IReqUser>('/users/profile', {
          credentials: 'include',
        });
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados da sessão:', error);
        setUserData(undefined);
      }
    };

    fetchSessionData();
  }, []);

  return userData;
}
