import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export interface ISlideProps {
    id: number;
    image: React.ReactNode;
}

export const Slide = memo((props: ISlideProps) => {
    return <View style={{ width: windowWidth, height: windowHeight }}>{props.image}</View>;
});

Slide.displayName = 'Slide';
