import { SafeAreaView } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/contexts';

import { AuthLoading } from '@/components';

export default function AppLayout() {
    const userSession = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (userSession?.session?.loading) {
        return <AuthLoading />;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!userSession?.session?.session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href={'/landing'} />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <SafeAreaView className="flex-1">
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
    );
}
