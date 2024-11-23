import { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const NetworkLoggerComponent = () => {
    const [show, setShow] = useState<boolean>(false);

    const toggleNetworkLogger = () => setShow(!show);

    return (
        <SafeAreaView className="absolute z-10 right-0" edges={['top']}>
            <TouchableOpacity onPress={toggleNetworkLogger} className="self-end mr-4 mt-3.5">
                <Text className="text-lg">🌐</Text>
            </TouchableOpacity>

            {show ? (
                <View
                    style={{
                        width: windowWidth,
                        height: windowHeight,
                    }}
                >
                    <NetworkLogger theme="dark" compact={true} />
                </View>
            ) : undefined}
        </SafeAreaView>
    );
};
