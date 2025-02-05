import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    const navigateToCreateNewRecipe = () => router.navigate('/recipe/new');

    return (
        <SafeAreaView className="flex-1">
            <StatusBar style={'dark'} />

            <Text>Infinite scroll recipes</Text>

            <TouchableOpacity
                className="absolute bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full justify-center items-center"
                onPress={navigateToCreateNewRecipe}
            >
                <Text className="text-white text-3xl font-bold">+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
