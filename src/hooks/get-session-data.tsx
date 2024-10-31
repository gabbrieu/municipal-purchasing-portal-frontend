import { IBackendReqUser, IGetSessionData, IReqUser } from '@/types/user';
import { api } from '@/utils/fetch';
import { SessionStorageHelper } from '@/utils/sessionStorage';
import { useEffect, useState } from 'react';

export function useSessionData(): IGetSessionData {
  const [userData, setUserData] = useState<IReqUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);

        let userOnSessionStorage = SessionStorageHelper.get<IReqUser>('user');

        if (!userOnSessionStorage) {
          const data = await api<IBackendReqUser>('/users/profile', {
            credentials: 'include',
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { cpf, ...rest } = data!;
          userOnSessionStorage = rest;

          SessionStorageHelper.add<IReqUser>('user', userOnSessionStorage);
        }

        setLoading(false);
        setUserData(userOnSessionStorage);
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
