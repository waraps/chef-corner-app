import { IUser } from '../res';

export interface ISession {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
