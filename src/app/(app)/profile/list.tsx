import { Text, View } from 'react-native';
import { useSession } from '@/contexts';

const ListsScreen = () => {
    const { signOut } = useSession();
    const doSignOut = () => {
        if (signOut) {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={doSignOut}>Sign Out</Text>
        </View>
    );
};

export default ListsScreen;
