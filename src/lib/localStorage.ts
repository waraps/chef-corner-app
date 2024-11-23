import { ISession } from '../interfaces';
import * as SecureStore from 'expo-secure-store';

export const storeSession = async (userSession: ISession): Promise<void> => {
    await SecureStore.setItemAsync('session', JSON.stringify(userSession));
};

export const getSession = async (): Promise<ISession | null> => {
    const value = await SecureStore.getItemAsync('session');
    return value ? JSON.parse(value) : null;
};

export const removeSession = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('session');
};
