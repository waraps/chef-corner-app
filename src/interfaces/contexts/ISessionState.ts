import { ISession } from '../generics';

export interface ISessionState {
    session?: ISession;
    loading: boolean;
    error?: boolean;
}
