import { ISession } from '../res';

export interface ISessionState {
    session?: ISession;
    loading: boolean;
    error?: boolean;
}
