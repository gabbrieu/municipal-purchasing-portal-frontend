'use client';

import { FormikFieldType } from '@/types/common';
import { ILoginValues } from '@/types/user';
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

export default function Login() {
  const initialValues: ILoginValues = {
    city: '',
    username: '',
    password: '',
  };

  const handleSubmit = (values: ILoginValues) => {
    console.log(values);
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
                        <FormLabel size="xs" textTransform="uppercase">
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
                        <FormLabel size="xs" textTransform="uppercase">
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
                        <FormLabel size="xs" textTransform="uppercase">
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
                    isLoading={props.isSubmitting}
                  >
                    Login
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
