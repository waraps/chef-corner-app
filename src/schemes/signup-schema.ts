import * as yup from 'yup';

export const signupSchema = yup.object({
    name: yup
        .string()
        .label('name')
        .min(2, 'Name length must be at least 2 characters')
        .max(20, 'The length of the name must be a maximum of 20 characters.')
        .matches(/^[a-zA-Z]+$/, 'Must be only letters')
        .required('This field is required'),
    lastname: yup
        .string()
        .label('lastname')
        .min(2, 'Last name length must be at least 2 characters')
        .max(20, 'The length of the lastname must be a maximum of 20 characters.')
        .matches(/^[a-zA-Z]+$/, 'Must be only letters')
        .required('This field is required'),
    email: yup.string().label('email').email('You must enter a valid email').required('This field is required'),
    username: yup
        .string()
        .label('username')
        .min(4, 'Username length must be at least 4 characters')
        .max(15, 'The length of the username must be a maximum of 15 characters.')
        .matches(/^[a-zA-Z0-9_]+$/, 'Must be only letters, numbers and underscores')
        .required('This field is required'),
    password: yup
        .string()
        .label('password')
        .min(8, 'Password length must be at least 8 characters')
        .required('This field is required'),
    confirmPassword: yup
        .string()
        .label('comfirmPassword')
        .min(8, 'Password length must be at least 8 characters')
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('This field is required'),
});

export type signupSchemaType = yup.InferType<typeof signupSchema>;
