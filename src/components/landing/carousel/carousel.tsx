import { createRef, useCallback, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
    VirtualizedListWithoutRenderItemProps,
} from 'react-native';

// components
import { ISlideProps, Slide } from './slide';
import { Captions } from './captions';
import { Pagination } from './pagination';

// hooks
import { useInterval } from '@/hooks';

// data
import { carouselCaptions, carouselImages } from './carousel-info';

interface ILandingCarouselProps {
    autoplay?: boolean; // make the carousel images automatically change
    playTimer?: number; // time to hold until move slides (in seconds)
    onChange?: (index: number) => void;
}

const { width: windowWidth } = Dimensions.get('window');

export const LandingCarousel = (props: ILandingCarouselProps): JSX.Element => {
    const { autoplay, playTimer = 8, onChange } = props;
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const imageRef = createRef<FlatList>();
    const indexRef = useRef(index);
    const scrollX = useRef(new Animated.Value(0)).current;
    indexRef.current = index;

    useInterval(() => doAutplay(), autoplay ? 500 : null);

    const doAutplay = (): void => {
        if (timer < playTimer) {
            // while the timer don't reaches the time for change, it should incremented
            setTimer(timer + 1);
        }
        if (timer >= playTimer) {
            // moving the slides when the timer reaches the time for change
            if (index < carouselImages.length - 1) {
                imageRef?.current?.scrollToIndex({ index: index + 1 });
            } else {
                imageRef?.current?.scrollToIndex({ index: 0 });
            }
        }
    };

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const scrollIndex = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(scrollIndex);

        const distance = Math.abs(roundIndex - scrollIndex);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = distance > 0.4;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
            if (autoplay) {
                // reset the autoplay loop
                setTimer(0);
            }
            if (onChange) {
                onChange(roundIndex);
            }
        }

        scrollX.setValue(event.nativeEvent.contentOffset.x);
    }, []);

    const renderItem = useCallback(({ item }: ListRenderItemInfo<ISlideProps>) => {
        return (
            <View>
                <Slide {...item} />
            </View>
        );
    }, []);

    const flatListOptimizationProps: VirtualizedListWithoutRenderItemProps<ISlideProps> = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 2,
        scrollEventThrottle: 16,
        windowSize: 2,
        removeClippedSubviews: true,
        pagingEnabled: true,
        horizontal: true,
        bounces: false,
        keyExtractor: useCallback((s: ISlideProps) => String(s.id), []),
        getItemLayout: useCallback(
            (_data: unknown, i: number) => ({
                index: i,
                length: windowWidth,
                offset: i * windowWidth,
            }),
            []
        ),
    };

    return (
        <View style={{ backgroundColor: '#000' }}>
            <FlatList
                data={carouselImages}
                ref={imageRef}
                renderItem={renderItem}
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                {...flatListOptimizationProps}
            />
            <View className="absolute top-20">
                <Captions data={carouselCaptions[index]} />
            </View>
            <View className="absolute bottom-16 right-5">
                <Pagination data={carouselImages} scrollX={scrollX} />
            </View>
        </View>
    );
};
