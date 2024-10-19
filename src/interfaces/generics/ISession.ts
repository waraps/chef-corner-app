import { IUser } from '../res';

export interface ISession {
    user?: IUser;
    token?: string;
}
