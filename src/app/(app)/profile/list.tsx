import { Text, TouchableOpacity, View } from 'react-native';
import { useSession } from '@/contexts';
import { useEffect } from 'react';
import { getRecipes } from '@/services';
import { ChevronLeft } from '@icons';
import { router } from 'expo-router';

const ListsScreen = () => {
    const auth = useSession();

    useEffect(() => {
        doGetRecipes();
    }, []);

    const goBack = () => router.back();

    const doGetRecipes = async () => {
        try {
            console.log('first');
            const response = await getRecipes();
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const doSignOut = () => {
        if (auth?.signOut) {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            auth.signOut();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={goBack} className="self-start py-2">
                <ChevronLeft color={'#374151'} />
            </TouchableOpacity>
            <Text onPress={doSignOut}>Sign Out</Text>
        </View>
    );
};

export default ListsScreen;
