import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ISlideProps } from './slide';

export interface PaginationProps {
    data: ISlideProps[];
    scrollX: Animated.Value;
}

export const Pagination = (props: PaginationProps) => {
    const { scrollX, data } = props;
    const { width } = useWindowDimensions();

    const defaultProps = {
        dotWidth: 25,
        expandingDotWidth: 75,
        inActiveDotOpacity: 0.3,
        activeDotColor: '#f8fafc',
        inActiveDotColor: '#f1f5f9',
    };

    return (
        <View className="flex-row self-center" pointerEvents={'none'}>
            {data.map((_, index) => {
                // width is the device with and is substracting the spacing both sides
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                const color = scrollX.interpolate({
                    inputRange,
                    outputRange: [
                        defaultProps.inActiveDotColor,
                        defaultProps.activeDotColor,
                        defaultProps.inActiveDotColor,
                    ],
                    extrapolate: 'clamp',
                });

                const expand = scrollX.interpolate({
                    inputRange,
                    outputRange: [defaultProps.dotWidth, defaultProps.expandingDotWidth, defaultProps.dotWidth],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={index}
                        style={[styles.dotStyle, { width: expand }, { backgroundColor: color }]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dotStyle: {
        borderRadius: 5,
        height: 10,
        marginHorizontal: 2,
        width: 10,
    },
});
