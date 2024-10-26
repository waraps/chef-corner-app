import * as yup from 'yup';

export const signupSchema = yup.object({
    name: yup
        .string()
        .label('name')
        .min(2, 'Name length must be at least 2 characters')
        .max(40, 'The length of the name must be a maximum of 40 characters.')
        .required('This field is required'),
    lastname: yup
        .string()
        .label('lastname')
        .min(2, 'Last name length must be at least 2 characters')
        .max(40, 'The length of the lastname must be a maximum of 40 characters.')
        .required('This field is required'),
    email: yup.string().label('email').email('You must enter a valid email').required('This field is required'),
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

export type signupSchemaType = yup.InferType<typeof signupSchema>;
