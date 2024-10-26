import { memo } from 'react';
import { Dimensions, Text, View } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
export interface CaptionsProps {
    data: {
        id: number;
        title: string;
        heading: string;
    };
}

export const Captions = memo((props: CaptionsProps) => {
    const { data } = props;

    return (
        <View style={{ width: windowWidth, paddingHorizontal: 16 }}>
            <Text
                className="text-center font-bold text-5xl text-slate-200 mb-1"
                style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.70)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                }}
            >
                {data?.title}
            </Text>
            <Text
                className="text-center font-normal text-xl text-slate-200"
                style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.70)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                }}
            >
                {data?.heading}
            </Text>
        </View>
    );
});

Captions.displayName = 'Captions';
