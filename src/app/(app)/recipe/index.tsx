import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

export default function RecipeScreen() {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar style={'dark'} />
            <View>
                <Text>Recipe screen</Text>
            </View>
        </SafeAreaView>
    );
}
