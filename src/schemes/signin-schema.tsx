import * as yup from 'yup';

export const signinSchema = yup.object({
    username: yup
        .string()
        .label('username')
        .min(2, 'Username length must be at least 2 characters')
        .max(40, 'The length of the username must be a maximum of 40 characters.')
        .required('This field is required'),
    password: yup
        .string()
        .label('password')
        .min(6, 'Password length must be at least 6 characters')
        .required('This field is required'),
});

export type signinSchemaType = yup.InferType<typeof signinSchema>;
