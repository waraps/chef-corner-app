import { API } from '@/api';
import { IRecipe, IRecipeReq } from '@/interfaces';
import { AxiosResponse } from 'axios';

export const getRecipes = async (): Promise<AxiosResponse<IRecipe[]>> => {
    return API.get<IRecipe[]>('/posts');
};

export const publishRecipe = async (recipe: IRecipeReq): Promise<AxiosResponse<IRecipe>> => {
    return API.post<IRecipe>('/posts', recipe);
};
