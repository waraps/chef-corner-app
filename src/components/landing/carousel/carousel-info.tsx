import { Image } from 'react-native';

import { ISlideProps } from './slide';

export const carouselCaptions = [
    {
        id: 0,
        title: 'Welcome to\nChef Corner',
        heading: 'Join the community of chefs, share your recipes, and learn from others',
    },
    {
        id: 1,
        title: 'Welcome to\nChef Corner',
        heading: 'Join the community of chefs, share your recipes, and learn from others',
    },
    {
        id: 2,
        title: 'Welcome to\nChef Corner',
        heading: 'Join the community of chefs, share your recipes, and learn from others',
    },
];

export const carouselImages: ISlideProps[] = [
    {
        id: 0,
        image: (
            <Image
                source={require('../../../assets/images/landing/landing_1.jpg')}
                resizeMode="cover"
                className="w-full h-full self-center opacity-40"
            />
        ),
    },
    {
        id: 1,
        image: (
            <Image
                source={require('../../../assets/images/landing/landing_2.jpg')}
                resizeMode="cover"
                className="w-full h-full self-center opacity-40"
            />
        ),
    },
    {
        id: 2,
        image: (
            <Image
                source={require('../../../assets/images/landing/landing_3.jpg')}
                resizeMode="cover"
                className="w-full h-full self-center opacity-40"
            />
        ),
    },
];
