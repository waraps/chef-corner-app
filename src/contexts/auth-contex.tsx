import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { IAuthContext, IError, ISessionState, ISigninReq, ISignupReq } from '@/interfaces';
import { getSession, removeSession, storeSession } from '@/lib';
import { perfomSignIn, perfomSignUp /* , perfomSignOut */ } from '@/services';
import { NetworkLoggerComponent } from '@/components';

const initialSession: ISessionState = {
    session: undefined,
    loading: false,
    error: undefined,
};

const AuthContext = createContext<IAuthContext | null>(null);

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [userSession, setUserSession] = useState<ISessionState>(initialSession);

    useEffect(() => {
        if (!userSession?.session) {
            checkSession();
        }
    }, []);

    const checkSession = async () => {
        setUserSession({ ...userSession, loading: true });
        const session = await getSession();
        if (session) {
            setUserSession({ ...userSession, session, loading: false });
        } else {
            setUserSession({ ...userSession, loading: false });
        }
    };

    const signIn = async (credentials: ISigninReq) => {
        try {
            setUserSession({ ...userSession, loading: true });
            const { data: session } = await perfomSignIn(credentials);
            await storeSession(session);
            setUserSession({ ...userSession, session, loading: false });
        } catch (error) {
            const errorResponse = error as IError;
            if (errorResponse?.message === 'Invalid username or password') {
                console.log(errorResponse?.message);
            }

            setUserSession({ ...userSession, loading: false, error: true });
        }
    };

    const signUp = async (user: ISignupReq) => {
        try {
            setUserSession({ ...userSession, loading: true });
            const { data: session } = await perfomSignUp(user);
            await storeSession(session);
            setUserSession({ ...userSession, session, loading: false });
        } catch (error) {
            const errorResponse = error as IError;
            console.log(errorResponse?.message);

            setUserSession({ ...userSession, loading: false, error: true });
        }
    };

    const signOut = () => {
        try {
            setUserSession({ ...userSession, loading: true });
            // perfomSignOut();
            setUserSession({ loading: false });
        } catch (error) {
            if (error) {
                setUserSession({ loading: false, error: true });
            }
        } finally {
            removeSession();
        }
    };

    return (
        <AuthContext.Provider value={{ session: userSession, signIn, signUp, signOut }}>
            <>
                <NetworkLoggerComponent />
                {children}
            </>
        </AuthContext.Provider>
    );
}
