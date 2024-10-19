import { useToast, UseToastOptions } from '@chakra-ui/react';

export function useCustomToast(options?: UseToastOptions) {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: 'top',
    status: 'success',
    ...options,
  });

  return toast;
}
