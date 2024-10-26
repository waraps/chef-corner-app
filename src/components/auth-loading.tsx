import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, SafeAreaView, Text } from 'react-native';

export const AuthLoading = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-between bg-orange-100">
            <StatusBar hidden />
            <Image
                source={require('../assets/images/chef-corner-icon.png')}
                resizeMode="contain"
                className="self-center mt-20 rounded-full w-32 h-32"
            />
            <ActivityIndicator size="large" color="#f97316" />
            <Text className="text-lg font-normal text-center text-neutral-600 mb-10">Loading ...</Text>
        </SafeAreaView>
    );
};
