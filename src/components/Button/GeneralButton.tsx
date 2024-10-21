import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface IButtonProps extends ButtonProps {
  children?: string | number;
}

export const GeneralButton = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    return (
      <ChakraButton
        {...props}
        ref={ref}
        isLoading={props.isLoading}
        variant="solid"
        bgColor="blue.800"
        textColor="white"
        _hover={{
          bg: 'blue.600',
          textColor: 'white',
          boxShadow: 'lg',
        }}
      >
        {props.children}
      </ChakraButton>
    );
  }
);

GeneralButton.displayName = 'GeneralButton';
