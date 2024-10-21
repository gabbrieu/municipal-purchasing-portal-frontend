import { IGetSessionData, IReqUser } from '@/types/user';
import { api } from '@/utils/fetch';
import { useEffect, useState } from 'react';

export function useSessionData(): IGetSessionData {
  const [userData, setUserData] = useState<IReqUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);

        const data = await api<IReqUser>('/users/profile', {
          credentials: 'include',
        });

        setLoading(false);
        setUserData(data);
      } catch (error: any) {
        const message = error?.message || 'Erro ao buscar dados da sessão';

        setLoading(false);
        setUserData(undefined);
        setError(new Error(message));

        console.error(message);
      }
    };

    fetchSessionData();
  }, []);

  return { data: userData, loading, error };
}
