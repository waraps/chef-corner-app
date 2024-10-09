import { Tabs } from 'expo-router';

import { Colors } from '@constants';
import { useColorScheme } from '@theme';
import { CircleUserRound, House } from '@icons';

export default function TabLayout() {
    const { colorScheme } = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <House color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <CircleUserRound color={color} />,
                }}
            />
        </Tabs>
    );
}
