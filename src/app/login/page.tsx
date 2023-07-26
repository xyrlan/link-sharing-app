"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "react-toastify"


export default function Login() {

    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();



    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await signIn("credentials", {
            ...data,
            redirect: false,
        })

        if (response?.url === null) {
            console.log(response?.error);
            toast.error("Credentials do not match!");
        } else {
            toast.success(`Authenticated user: ${session?.user?.email}`, {
                icon: '🚀',
            });
            router.push("/dashboard");
        }
        setLoading(false);
    };


    async function loginWithGoogle(e: any) {
        e.preventDefault();
        signIn('google', {
            redirect: true,
            callbackUrl: '/dashboard'
        })
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center sm:items-center px-6 py-10 ">

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
                            Login
                        </h2>
                        <h3 className="text-start mt-2">
                            Add your details below to get back into the app
                        </h3>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" action="#" method="POST" onSubmit={loginUser}>
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
                                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                        required
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
                                        Password
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
                                        placeholder="Enter your password"
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
                                    {loading ? (
                                        <p>loading</p>
                                    ) :
                                        <p>
                                            Login</p>}
                                </button>
                            </div>
                        </form>
                        <div className="mt-10">
                            <a className="flex items-center justify-center bg-white border border-gray-700 text-gray-700 rounded-md px-4 py-2 shadow-sm hover:bg-slate-100" onClick={loginWithGoogle} role="button">
                                <img className="w-5 h-5 mr-2" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                <span className="text-sm text-center font-semibold">Login with Google</span>
                            </a>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Dont have an account?{' '}
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Create account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}