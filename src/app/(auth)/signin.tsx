import { Href, Link, router } from 'expo-router';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSession } from '@/contexts';

import { ChevronLeft, Eye, EyeOff } from '@icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { signinSchema, signinSchemaType } from '@/schemes';

export default function SignInScreen() {
    const auth = useSession();
    const [hidePassword, setHidePassword] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<signinSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(signinSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const goBack = () => router.back();

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const onSubmit = (schema: signinSchemaType): void => {
        if (auth?.signIn) {
            auth?.signIn(schema);
            router.replace('/' as Href);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-orange-100 justify-between">
            <StatusBar style={'dark'} />
            <View>
                <TouchableOpacity onPress={goBack} className="self-start py-2">
                    <ChevronLeft color={'#374151'} />
                </TouchableOpacity>
                <View className="px-6 mt-2">
                    <Image
                        source={require('../../assets/images/chef-corner-icon.png')}
                        resizeMode="contain"
                        className="self-center mb-4 rounded-full w-32 h-32"
                    />
                    <Text className="text-3xl font-bold text-center text-neutral-800">Chef&apos;s Corner</Text>
                    <Text className="text-lg font-normal text-center text-neutral-600 mb-10">
                        Gets access to tasty recipes!
                    </Text>
                    <View className="mb-3">
                        <Text className="text-orange-600 font-bold">Username</Text>
                        <Controller
                            name={'username'}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="bg-white border border-orange-600 rounded-xl px-3 py-4 mt-1"
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="johndoe1"
                                    cursorColor={'#ea580c'}
                                    placeholderTextColor={'#9ca3af'}
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        {errors?.username ? (
                            <Text className="text-orange-800 mt-0.5 ml-2">{errors.username?.message}</Text>
                        ) : undefined}
                    </View>
                    <View>
                        <Text className="text-orange-600 font-bold">Password</Text>
                        <Controller
                            name={'password'}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View className="w-full px-3 mt-1 flex-row items-center justify-between bg-white border border-orange-600 rounded-xl">
                                    <TextInput
                                        className="w-10/12 py-4"
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="********"
                                        placeholderTextColor={'#9ca3af'}
                                        secureTextEntry={hidePassword}
                                    />
                                    {value?.length ? (
                                        <TouchableOpacity onPress={togglePasswordVisibility} disabled={!value.length}>
                                            {hidePassword ? <EyeOff color={'#ea580c'} /> : <Eye color={'#ea580c'} />}
                                        </TouchableOpacity>
                                    ) : undefined}
                                </View>
                            )}
                        />
                        {errors?.password ? (
                            <Text className="text-orange-800 mt-0.5 ml-2">{errors.password?.message}</Text>
                        ) : undefined}
                    </View>
                    <TouchableOpacity
                        className="bg-orange-500 p-4 rounded-2xl mt-16 mb-3"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-white font-semibold text-center">Sign In</Text>
                    </TouchableOpacity>
                    <Link href="/landing" asChild>
                        <TouchableOpacity>
                            <Text className="text-orange-600 font-semibold text-center">Forgot password?</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <View className="flex-row items-center justify-center py-4">
                <Text className="font-normal text-orange-600">Don&apos;t have an account? </Text>
                <Link href="/signup" asChild>
                    <TouchableOpacity>
                        <Text className="font-semibold underline text-orange-600">Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
}
