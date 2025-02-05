import { recipeSchema, recipeSchemaType } from '@/schemes/recipe-schema';
import { publishRecipe } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewRecipeScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<recipeSchemaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(recipeSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            title: '',
            content: '',
            categoryId: 0,
            published: true,
            draft: false,
        },
    });

    const onSubmit = async (schema: recipeSchemaType): Promise<void> => {
        try {
            const response = await publishRecipe(schema);
            console.log(JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <StatusBar style={'dark'} />
            <View className="p-6">
                <View className="mb-3">
                    <Text className="text-black font-bold">Title</Text>
                    <Controller
                        name={'title'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-white border border-black rounded-xl px-3 py-4 mt-1"
                                onChangeText={onChange}
                                value={value}
                                placeholder="Atun salad"
                                cursorColor={'#ea580c'}
                                placeholderTextColor={'#9ca3af'}
                                autoCapitalize="none"
                            />
                        )}
                    />
                    {errors?.title ? (
                        <Text className="text-orange-800 mt-0.5 ml-2">{errors.title?.message}</Text>
                    ) : undefined}
                </View>
                <View className="mb-3">
                    <Text className="text-black font-bold">Content</Text>
                    <Controller
                        name={'content'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-white border border-black rounded-xl px-3 py-4 mt-1"
                                onChangeText={onChange}
                                value={value}
                                placeholder="Type recipe content ..."
                                cursorColor={'#ea580c'}
                                placeholderTextColor={'#9ca3af'}
                                autoCapitalize="none"
                                multiline={true}
                                style={{ height: 200 }}
                            />
                        )}
                    />
                    {errors?.content ? (
                        <Text className="text-orange-800 mt-0.5 ml-2">{errors.content?.message}</Text>
                    ) : undefined}
                </View>
                <TouchableOpacity className="bg-orange-500 p-4 rounded-2xl mb-3" onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white font-semibold text-center">Publish</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
