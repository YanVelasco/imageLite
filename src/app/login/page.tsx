'use client'

import { RenderIf, TemplateDefault } from "@/components/templateDefault/Template";
import { useNotificationMessage } from "@/components/notificationMessage/NotificationMessage";
import { useState } from "react";
import { Input } from "@/components/input/Input";
import { validationScheme, LoginFormData, initialValues } from "@/app/login/formScheme";
import { useFormik } from "formik";
import { AccessToken } from "@/resources/users/users.resources";
import { useRouter } from "next/navigation";
import { authService } from "@/resources/users/authentication.resource.service";
import {toast} from "react-toastify";
import success = toast.success;

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {error: notifyError } = useNotificationMessage();

    const router = useRouter();

    const { values, handleChange, handleSubmit, errors } = useFormik<LoginFormData>({
        initialValues: initialValues,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginFormData) {
        setIsLoading(true);
        if (!newUser) {
            const credentials = {
                email: values.email,
                password: values.password
            };
            try {
                const accessToken: AccessToken = await authService.authenticate(credentials);
                router.push('/gallery');
                setError(null);
            } catch (err: any) {
                setError(err.message);
                notifyError('Email or password is incorrect.');
            } finally {
                setIsLoading(false);
            }
        } else {
            const user = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            try {
                await authService.saveUser(user);
                setNewUser(false);
                setError(null);
                success('User created successfully!');
            } catch (err: any) {
                setError(err.message);
                notifyError(`User already exists with email ${values.email}. Please try again`);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <TemplateDefault loading={isLoading}>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-12 w-auto"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {newUser ? 'Create an account' : 'Sign in to your account'}
                    </h2>
                </div>
                <RenderIf condition={newUser}>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </RenderIf>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Email address"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <RenderIf condition={newUser}>
                            <div>
                                <label htmlFor="passwordMatcher" className="block text-sm font-medium text-gray-700">
                                    Repeat Password
                                </label>
                                <Input
                                    id="passwordMatcher"
                                    type="password"
                                    placeholder="Repeat Password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-600"
                                    value={values.passwordMatcher}
                                    onChange={handleChange}
                                />
                            </div>
                        </RenderIf>
                        <div>
                            <RenderIf condition={newUser}>
                                <button
                                    type="button"
                                    className="w-full flex justify-center p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                                    onClick={() => handleSubmit()}
                                >
                                    Sign up
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex justify-center p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setNewUser(false)}
                                >
                                    Cancel
                                </button>
                            </RenderIf>
                            <RenderIf condition={!newUser}>
                                <button
                                    type="button"
                                    className="w-full flex justify-center p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                                    onClick={() => handleSubmit()}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex justify-center p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                                    onClick={() => setNewUser(true)}
                                >
                                    Sign up
                                </button>
                            </RenderIf>
                        </div>
                    </form>
                </div>
            </div>
        </TemplateDefault>
    );
}
