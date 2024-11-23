import { API } from '@/api';
import { ISession, ISigninReq, ISignupReq } from '@/interfaces';
import { AxiosResponse } from 'axios';

export const perfomSignIn = async (credencials: ISigninReq): Promise<AxiosResponse<ISession>> => {
    return API.post<ISession>('/auth/login', credencials);
};

export const perfomSignUp = async (user: ISignupReq): Promise<AxiosResponse<ISession>> => {
    return API.post<ISession>('/auth/register', user);
};

export const perfomSignOut = async (): Promise<AxiosResponse<void>> => {
    return API.get<void>('/auth/logout');
};
