'use client';

import { useCustomToast } from '@/hooks/custom-toast';
import { FormikFieldType } from '@/types/common';
import { ILoginValues } from '@/types/user';
import { api } from '@/utils/fetch';
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// TODO: adicionar validação dos campos
export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useCustomToast();
  const router = useRouter();
  const initialValues: ILoginValues = {
    city: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (values: ILoginValues) => {
    setLoading(true);

    try {
      await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      router.push('/');
    } catch (error: any) {
      if (error?.cause?.errorBody?.statusCode?.toString().startsWith('4')) {
        toast({
          title: 'Erro no login',
          description: 'Verifique suas credenciais e tente novamente.',
          status: 'error',
        });
      } else {
        toast({
          title: 'Erro no login',
          description:
            'Algo deu errado no servidor, tente novamente mais tarde',
          status: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
    >
      <Card width="400px" boxShadow="md">
        <CardBody>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="city">
                    {({
                      field,
                      form,
                    }: FormikFieldType<string, ILoginValues>) => (
                      <FormControl
                        isInvalid={!!form.errors.city && form.touched.city}
                        isRequired
                      >
                        <FormLabel fontSize="small" textTransform="uppercase">
                          Cidade
                        </FormLabel>
                        <Input {...field} type="text" variant="outline" />
                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({
                      field,
                      form,
                    }: FormikFieldType<string, ILoginValues>) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.username && form.touched.username
                        }
                        isRequired
                      >
                        <FormLabel fontSize="small" textTransform="uppercase">
                          Usuário
                        </FormLabel>
                        <Input {...field} type="text" variant="outline" />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({
                      field,
                      form,
                    }: FormikFieldType<string, ILoginValues>) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.password && form.touched.password
                        }
                        isRequired
                      >
                        <FormLabel fontSize="small" textTransform="uppercase">
                          Senha
                        </FormLabel>
                        <Input {...field} type="password" variant="outline" />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    textTransform="uppercase"
                    width="full"
                    type="submit"
                    colorScheme="blue"
                    isLoading={props.isSubmitting || loading}
                  >
                    Entrar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Box>
  );
}
