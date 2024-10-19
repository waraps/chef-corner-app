import React, { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { timeout } from '../utils';
import { IAuthContext, ISession, ISessionState, IUser } from '@/interfaces';

const initialSession: ISessionState = {
    session: undefined,
    loading: false,
    error: undefined,
};

const AuthContext = createContext<IAuthContext>({ session: initialSession });

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
    const [session, setSession] = useState<ISessionState>(initialSession);

    useEffect(() => {
        if (!session) {
            checkSession();
        }
    }, []);

    const checkSession = async () => {
        setSession({ ...session, loading: true });
        await SecureStore.getItemAsync('session').then((value) => {
            if (value) {
                const userSession: ISession = JSON.parse(value);
                if (userSession?.user && userSession?.token) {
                    setSession({ ...session, session: userSession });
                }
            }
        });
    };

    const signIn = async () => {
        try {
            setSession({ ...session, loading: true });
            await timeout(1000);
            const user: IUser = { name: 'John Doe' };
            const token: string = 'super-secret-token';
            const userSession: ISession = { user, token };
            await SecureStore.setItemAsync('session', JSON.stringify(userSession));
            setSession({ ...session, session: userSession, loading: false });
        } catch (error) {
            if (error) {
                setSession({ ...session, loading: false, error: true });
            }
        }
    };

    const signOut = async () => {
        try {
            setSession({ ...session, loading: true });
            await timeout(1000);
            await SecureStore.deleteItemAsync('session');
            setSession({ loading: false });
        } catch (error) {
            await SecureStore.deleteItemAsync('session');
            if (error) {
                setSession({ loading: false, error: true });
            }
        }
    };

    return <AuthContext.Provider value={{ session, signIn, signOut }}>{children}</AuthContext.Provider>;
}
