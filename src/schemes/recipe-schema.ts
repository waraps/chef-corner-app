import * as yup from 'yup';

export const recipeSchema = yup.object({
    title: yup
        .string()
        .label('title')
        .min(2, 'Title length must be at least 2 characters')
        .max(30, 'length of the title must be a maximum of 30 characters.')
        .required(),
    content: yup
        .string()
        .label('title')
        .min(10, 'Title length must be at least 10 characters')
        .max(1500, 'length of the title must be a maximum of 1500 characters.')
        .required(),
    categoryId: yup.number().label('categoryId').required(),
    published: yup.boolean().label('published').required(),
    draft: yup.boolean().label('draft').required(),
});

export type recipeSchemaType = yup.InferType<typeof recipeSchema>;
