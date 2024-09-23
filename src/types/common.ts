import { FieldInputProps, FormikProps } from 'formik';

export type FormikFieldType<X, Y> = {
    field: FieldInputProps<X>;
    form: FormikProps<Y>;
};
