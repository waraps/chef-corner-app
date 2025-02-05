import { IUser } from './IUser';

export interface IRecipe {
    id: number;
    title: string;
    content: string;
    url: string;
    image: string;
    likes: number;
    comments: number;
    published: boolean;
    draft: boolean;
    createdAt: number;
    updatedAt: number;
    publishedAt: number;
    draftedAt: number;
    deletedAt: number;
    user: IUser;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
}
