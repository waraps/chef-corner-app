import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '@/contexts';

export default function SignInScreen() {
    const { signIn } = useSession();

    const doSignIn = () => {
        if (signIn) {
            signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace('/');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={doSignIn}>Login</Text>
        </View>
    );
}
