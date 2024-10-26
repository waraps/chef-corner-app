import { signinSchemaType } from '@/schemes';
import { ISessionState } from './ISessionState';

export interface IAuthContext {
    session: ISessionState;
    signIn?: (auth: signinSchemaType) => void;
    signOut?: () => void;
}
