'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ProfileNav = () => {

    const router = useRouter();

    const { data: session, status } = useSession();

    const goBack = () => {
        router.push('/dashboard')
    }

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success('The link has been copied to your clipboard!')
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (

        <div>
            {status === 'loading' && (
                <div className="flex mx-auto items-center justify-center w-full gap-2">
                    <div className="h-6 w-6 rounded-full border-4 border-t-transparent border-l-transparent animate-spin border-indigo-600" />
                    <p className='text-black text-center'>Processing...</p>
                </div>
            )}

            {status === 'authenticated' && (
                <div className="min-w-full mt-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
                        <button
                            onClick={goBack}
                            type="button"
                            className="sm:block text-sm rounded-lg border border-indigo-600 bg-white hover:bg-indigo-100 py-2 px-4 sm:px-4 text-indigo-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Back to Editor
                        </button>
                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className={`sm:block text-sm rounded-lg border border-indigo-600  ${copied ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white hover:bg-indigo-100'
                                } py-2 px-4 sm:px-4 text-indigo-600 `}
                        >
                            {copied ? 'Link Copied' : 'Share Link'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileNav