import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LandingCarousel } from '@/components/landing';

export default function LandingScreen() {
    return (
        <View className="flex-1">
            <StatusBar style={'light'} />
            <LandingCarousel autoplay />
            <View className="absolute top-1/2 w-full px-5 pt-10">
                <Link href="/signup" asChild>
                    <TouchableOpacity className="bg-orange-600 p-4 rounded-2xl my-3">
                        <Text className="text-slate-200 font-semibold text-center">Create Account</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/signin" asChild>
                    <TouchableOpacity className="bg-orange-400 p-4 rounded-2xl my-3">
                        <Text className="text-slate-200 font-semibold text-center">Sign In</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="absolute bottom-5 w-full">
                <Text
                    className="text-center text text-slate-200 font-semibold"
                    style={{
                        textShadowColor: 'rgba(0, 0, 0, 0.70)',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                    }}
                >
                    &#169; {new Date().getFullYear()} Chef Corner. All rights reserved.
                </Text>
            </View>
        </View>
    );
}
