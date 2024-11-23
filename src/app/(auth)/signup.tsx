import { Href, Link, router } from 'expo-router';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ChevronLeft, Eye, EyeOff } from '@icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signupSchema, signupSchemaType } from '@/schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from '@/contexts';
import { ISignupReq } from '@/interfaces';

export default function SignUpScreen() {
    const auth = useSession();
    const [hidePassword, setHidePassword] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<signupSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(signupSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    const goBack = () => router.back();

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const onSubmit = (schema: signupSchemaType): void => {
        if (auth?.signUp) {
            const user: ISignupReq = {
                name: schema.name,
                lastname: schema.lastname,
                email: schema.email,
                username: schema.username,
                password: schema.password,
            };

            auth?.signUp(user);
            router.replace('/' as Href);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-orange-100 justify-between">
            <StatusBar style={'dark'} />
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={goBack} className="self-start py-2">
                        <ChevronLeft color={'#374151'} />
                    </TouchableOpacity>
                    <View className="px-6">
                        <Image
                            source={require('../../assets/images/chef-corner-icon.png')}
                            resizeMode="contain"
                            className="self-center mb-4 rounded-full w-14 h-14"
                        />
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Name *</Text>
                            <Controller
                                name={'name'}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="bg-white border border-orange-600 rounded-xl px-3 py-4 mt-1"
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="John"
                                        cursorColor={'#ea580c'}
                                        placeholderTextColor={'#9ca3af'}
                                        maxLength={40}
                                    />
                                )}
                            />
                            {errors?.name ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.name?.message}</Text>
                            ) : undefined}
                        </View>
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Last Name *</Text>
                            <Controller
                                name={'lastname'}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="bg-white border border-orange-600 rounded-xl px-3 py-4 mt-1"
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Doe"
                                        cursorColor={'#ea580c'}
                                        placeholderTextColor={'#9ca3af'}
                                        maxLength={40}
                                    />
                                )}
                            />
                            {errors?.lastname ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.lastname?.message}</Text>
                            ) : undefined}
                        </View>
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Email *</Text>
                            <Controller
                                name={'email'}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="bg-white border border-orange-600 rounded-xl px-3 py-4 mt-1"
                                        onChangeText={(text) => {
                                            onChange(text.toLowerCase());
                                        }}
                                        value={value}
                                        placeholder="john@example.com"
                                        keyboardType="email-address"
                                        cursorColor={'#ea580c'}
                                        placeholderTextColor={'#9ca3af'}
                                        maxLength={40}
                                    />
                                )}
                            />
                            {errors?.email ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.email?.message}</Text>
                            ) : undefined}
                        </View>
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Username *</Text>
                            <Controller
                                name={'username'}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="bg-white border border-orange-600 rounded-xl px-3 py-4 mt-1"
                                        onChangeText={(text) => {
                                            onChange(text.toLowerCase());
                                        }}
                                        value={value}
                                        placeholder="johndoe1"
                                        cursorColor={'#ea580c'}
                                        placeholderTextColor={'#9ca3af'}
                                    />
                                )}
                            />
                            {errors?.username ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.username?.message}</Text>
                            ) : undefined}
                        </View>
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Password *</Text>
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
                                            <TouchableOpacity
                                                onPress={togglePasswordVisibility}
                                                disabled={!value.length}
                                            >
                                                {hidePassword ? (
                                                    <EyeOff color={'#ea580c'} />
                                                ) : (
                                                    <Eye color={'#ea580c'} />
                                                )}
                                            </TouchableOpacity>
                                        ) : undefined}
                                    </View>
                                )}
                            />
                            {errors?.password ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.password?.message}</Text>
                            ) : undefined}
                        </View>
                        <View className="mb-3">
                            <Text className="text-orange-600 font-bold">Confirm password *</Text>
                            <Controller
                                name={'confirmPassword'}
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
                                            <TouchableOpacity
                                                onPress={togglePasswordVisibility}
                                                disabled={!value.length}
                                            >
                                                {hidePassword ? (
                                                    <EyeOff color={'#ea580c'} />
                                                ) : (
                                                    <Eye color={'#ea580c'} />
                                                )}
                                            </TouchableOpacity>
                                        ) : undefined}
                                    </View>
                                )}
                            />
                            {errors?.confirmPassword ? (
                                <Text className="text-orange-800 mt-0.5 ml-2">{errors.confirmPassword?.message}</Text>
                            ) : undefined}
                        </View>
                        <TouchableOpacity
                            className="bg-orange-500 p-4 rounded-2xl mt-8 mb-3"
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text className="text-white font-semibold text-center">Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row items-center justify-center py-4">
                    <Text className="font-normal text-orange-600">Already have an account? </Text>
                    <Link href="/signin" asChild>
                        <TouchableOpacity>
                            <Text className="font-semibold underline text-orange-600">Sign in</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
