import { IRole } from './IRole';

export interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    username: string;
    enabled: boolean;
    roles: IRole[];
    admin: boolean;
}
