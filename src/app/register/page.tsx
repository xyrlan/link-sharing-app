"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';


export default function Register() {
    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })


    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loading, setLoading] = useState(false);


    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before the API call

        // Check if passwords match

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });

            if (response.status === 401) {
                toast.warn('User already exists');
                setLoading(false); // Set loading to false since the API call is completed
                return;
            }

            if (response.status === 400) {
                toast.warn('Password must be at least 8 characters');
                return;
            }

            if (response.status === 402) {
                toast.warn('Passwords do not match');
                return
            }

            toast.success('Account created successfully', {
                icon: '🚀',
            });
            // Redirect to login page on successful registration
            router.push('/login');
        } catch (error) {
            if (data.password !== confirmPassword) {
                toast.warn('Passwords do not match');
                setLoading(false)
            }
        } finally {
            setLoading(false); // Set loading to false whether the API call succeeds or fails
        }

    }

    async function loginWithGoogle(e: any) {
        e.preventDefault();
        signIn('google', {
            redirect: true,
            callbackUrl: '/dashboard'
        })
    };

    return (
        <>
            <div className="flex min-h-full w-full flex-1 flex-col justify-center sm:items-center px-6 py-10 ">

                <div className="flex justify-center items-center w-fit gap-2 mb-10">
                    <img
                        className="h-10"
                        src="/images/logo-devlinks-large.svg"
                        alt="Your Company"
                    />
                </div>
                <div className="flex flex-1 flex-col w-full max-w-md justify-center sm:px-6 sm:py-8 sm:border rounded-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">

                        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create account
                        </h2>
                        <h3 className="text-start mt-2">
                            Lets get you started sharing your links!
                        </h3>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" action="#" method="POST" onSubmit={registerUser}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={data.email}
                                        required
                                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}

                                        placeholder="e.g. alex@email.com"
                                        style={{
                                            backgroundImage: "url('/images/icon-email.svg')",

                                        }}
                                        className="block w-full bg-no-repeat bg-[center_left_1rem] px-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Create password
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                        required
                                        placeholder="At least 8 characters"
                                        style={{
                                            backgroundImage: "url('/images/icon-password.svg')",

                                        }}
                                        className="block w-full bg-no-repeat bg-[center_left_1rem] px-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.confirmPassword}
                                        onChange={(e) => {setData({...data, confirmPassword: e.target.value}) }} 
                                        required
                                        placeholder="At least 8 characters"
                                        style={{
                                            backgroundImage: "url('/images/icon-password.svg')",

                                        }}
                                        className="block w-full bg-no-repeat bg-[center_left_1rem] px-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {loading && (
                                        <p>Processing...</p>
                                    )}
                                    Create new account
                                </button>
                            </div>
                        </form>

                        <div className="mt-10">
                            <a className="flex items-center justify-center bg-white border border-gray-700 text-gray-700 rounded-md px-4 py-2 shadow-sm hover:bg-slate-100" onClick={loginWithGoogle} role="button">
                                <img className="w-5 h-5 mr-2" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                <span className="text-sm text-center font-semibold">Signin with Google</span>
                            </a>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}