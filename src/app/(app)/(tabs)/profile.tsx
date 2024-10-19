import { Link, Stack } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScrollView>
                <View style={{ paddingTop: insets.top + 60 }}>
                    <Text>Profile</Text>
                    <Link href="/profile/list">go to list</Link>
                </View>
            </ScrollView>
        </>
    );
}
