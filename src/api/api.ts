import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { IError, ISession } from '@/interfaces';
import { getSession, removeSession, storeSession } from '@/lib';

let _retry = false;

const API: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const session: ISession | null = await getSession();
        const token = session?.accessToken;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return await Promise.resolve(config);
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError<IError>) => {
        // save original request
        const originalRequest = error.config;

        let apiError: IError = {
            message: 'Ooops! Something went wrong',
        };

        // UnauthorizedError
        if (error.response?.status === 401 && !_retry) {
            _retry = true;
            const storedSession = await getSession();
            if (storedSession && originalRequest && originalRequest?.headers) {
                try {
                    const { refreshToken } = storedSession;
                    if (refreshToken) {
                        const response = await axios.post<ISession>(
                            `${process.env.EXPO_PUBLIC_API_URL}/auth/token/refresh`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken}`,
                                },
                            }
                        );
                        const { accessToken: access, refreshToken: refresh } = response.data;
                        await storeSession({ ...storedSession, accessToken: access, refreshToken: refresh });

                        originalRequest.headers.Authorization = `Bearer ${access}`;
                        return API(originalRequest);
                    }
                } catch (_error) {
                    await removeSession();
                    return Promise.reject(_error);
                }
            }
        }

        if (error.response && error.response.data && error.response.data.message) {
            if (error.response?.status === 403) {
                apiError = {
                    message: 'missing permission',
                };
            } else {
                apiError = {
                    message: error.response.data.message,
                };
            }
        }

        if (error.response && error.response.data && error.response.data?.password) {
            apiError = {
                message: error.response.data.password,
            };
        }

        return await Promise.reject(apiError);
    }
);

export { API };
