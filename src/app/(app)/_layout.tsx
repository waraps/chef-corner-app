import { Text, View } from 'react-native';
import { Href, Redirect, Stack } from 'expo-router';

import { useSession } from '@/contexts';

export default function AppLayout() {
    const { session } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (session?.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session.session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href={'/signin' as Href} />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Stack screenOptions={{ headerShown: false }} />;
}
