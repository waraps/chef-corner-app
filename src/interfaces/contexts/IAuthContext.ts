import { ISessionState } from './ISessionState';

export interface IAuthContext {
    session: ISessionState;
    signIn?: () => void;
    signOut?: () => void;
}
