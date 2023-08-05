'use client'

import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

import { signOut } from 'next-auth/react'

interface NavbarProps {
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    session: any;
    status: any;

}

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
    { name: 'Log in', href: '/login' }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ isEditing, setIsEditing, session, status }: NavbarProps) {


    const handleSave = () => {
        setIsEditing(true)

    }

    const handleCancel = () => {
        setIsEditing(false)

    };

    const [Navigation, setNavigation] = useState([
        {
            name: 'Links', function: handleCancel,
            icon: <svg className={'fill-indigo-500'} xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="" viewBox="0 0 21 20"><path fill="" d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z" /></svg>,
            current: false
        },
        {
            name: 'Profile Details', function: handleSave,
            icon: <svg className='fill-indigo-500 group-hover:fill-indigo-500' xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="" viewBox="0 0 21 20"><path fill="" d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z" /></svg>,
            current: false
        },
    ])


    const router = useRouter()

    const handlePreviewClick = () => {
        if (session?.user?.id) {
            router.push(`/users/${session?.user?.id}`);
        }
    };

    return (
        <>
            <div className="min-h-full mt-10">
                <Disclosure as="nav" className="bg-white">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">

                                    <div className="flex-shrink-0 ">
                                        <img
                                            className="h-6 max-sm:hidden"
                                            src="/images/logo-devlinks-large.svg"
                                            alt="Your Company"
                                        />
                                        <img
                                            className=" sm:hidden"
                                            src="/images/logo-devlinks-small.svg"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {Navigation.map((item, index) => (
                                                <>
                                                    <div
                                                        onClick={item.function}
                                                        key={item.name}
                                                        className={classNames(isEditing && item.name === 'Profile Details' ? 'bg-indigo-100 text-indigo-500' : '', isEditing === false && item.name !== 'Profile Details' ? 'bg-indigo-100' : '', 'group flex items-center cursor-pointer px-4 gap-2 py-2 rounded-lg hover:text-indigo-500 text-sm font-medium hover:fill-indigo-500')}>
                                                        {item.icon}
                                                        <button

                                                            className='max-md:hidden'
                                                            aria-selected={isEditing}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="ml-4 flex items-center md:ml-6 ">
                                            <button
                                                onClick={handlePreviewClick}
                                                type="button"
                                                disabled={!session?.user?.image}
                                                className={`sm:hidden rounded-lg border ${session?.user?.image ? 'border-indigo-600 bg-white hover:bg-indigo-100 py-1 px-2 sm:px-4 text-indigo-600' : 'border-gray-300 bg-gray-100 py-1 px-2 sm:px-4 text-gray-400 cursor-not-allowed'
                                                    }`}>
                                                Preview
                                            </button>
                                            <button
                                                onClick={handlePreviewClick}
                                                type='button'
                                                disabled={!session?.user?.image}
                                                className={`sm:hidden rounded-lg border ${session?.user?.image ? 'border-indigo-600 bg-white hover:bg-indigo-100 py-1 px-2 sm:px-4 text-indigo-600' : 'border-gray-300 bg-gray-100 py-1 px-2 sm:px-4 text-gray-400 cursor-not-allowed'
                                                    }`}>
                                                <img
                                                    className="sm:hidden"
                                                    src="/images/icon-preview-header.svg"
                                                    alt="Your Company"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={session?.user?.image ?? '/images/user-no-photo.jpg'} alt="profile photo" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <a
                                                                        href={item.href}
                                                                        onClick={item.name === 'Sign out' ? () => signOut() : undefined}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            ` px-4 py-2 text-sm text-gray-700 ${status === 'authenticated' && item.name === 'Log in' ? 'hidden' : 'block'} ${status === 'unauthenticated' && item.name === 'Sign out' ? 'hidden' : 'block'} `,
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {Navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={item.function}
                                            className={classNames(isEditing && item.name === 'Profile Details' ? 'bg-indigo-100 text-indigo-500' : '', !isEditing && item.name !== 'Profile Details' ? 'bg-indigo-100' : '', 'group flex items-center cursor-pointer px-4 gap-2 py-2 rounded-lg hover:text-indigo-500 text-sm font-medium hover:fill-indigo-500')}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">

                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"

                                                onClick={item.name === 'Sign out' ? () => signOut() : undefined}
                                                className={`block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white ${status === 'authenticated' && item.name === 'Log in' ? 'hidden' : 'block'} ${status === 'unauthenticated' && item.name === 'Sign out' ? 'hidden' : 'block'}`}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

            </div>


        </>
    )
}
