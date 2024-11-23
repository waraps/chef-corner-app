import { ISessionState } from './ISessionState';
import { ISigninReq, ISignupReq } from '../req';

export interface IAuthContext {
    session: ISessionState;
    signIn: (auth: ISigninReq) => void;
    signUp: (user: ISignupReq) => void;
    signOut: () => void;
}
