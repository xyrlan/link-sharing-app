'use client'

import { Fragment } from 'react'
import { useState } from 'react';

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createUserLinksSchema = z.object({
    links: z.array(z.object({
        platform: z.string().nonempty('obrigatorio'),
        url: z.string().nonempty('obrigatorio')
    }))
})

type CreateUserLinksData = z.infer<typeof createUserLinksSchema>

export default function Dashboard() {

    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    const { data: session, status } = useSession();
    console.log(session);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<CreateUserLinksData>({
        resolver: zodResolver(createUserLinksSchema)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    })

    function addNewLink() {
        append({ platform: '', url: '' })
    }

    function removeLink(index: any) {
        remove(index);
        const newSelectedPlatforms = [...selectedPlatforms];
        newSelectedPlatforms.splice(index, 1);
        setSelectedPlatforms(newSelectedPlatforms);
    }



    const Links = [
        {
            platform: 'GitHub',
            iconUrl: 'icon-github.svg',
            color: 'bg-black'
        },
        {
            platform: 'Youtube',
            iconUrl: 'icon-youtube.svg',
            color: 'bg-red-600  '
        },
        {
            platform: 'Linkedin',
            iconUrl: 'icon-linkedin.svg',
            color: 'bg-[#0077b5]'
        },
        {
            platform: 'Twitter',
            iconUrl: 'icon-twitter.svg',
            color: 'bg-[#1DA1F2]'
        },
        {
            platform: 'Twitch',
            iconUrl: 'icon-twitch.svg',
            color: 'bg-[#6441a5]'
        },
        {
            platform: 'Facebook',
            iconUrl: 'icon-facebook.svg',
            color: 'bg-[#4267B2]'
        },

    ]

    function handlePlatformChange(index: number, platform: string) {
        const newSelectedPlatforms = [...selectedPlatforms];
        newSelectedPlatforms[index] = platform;
        setSelectedPlatforms(newSelectedPlatforms);
    }

    const selectedLinks = Links.filter((link) =>
        selectedPlatforms.includes(link.platform)
    );

    const availableOptions = Links.filter((link) => {
        // Verificar se a plataforma atual já foi selecionada
        return !selectedPlatforms.includes(link.platform);
    });

    console.log(selectedLinks)
    console.log(selectedPlatforms)

    return (
        <>
            <main className='flex max-w-7xl min-h-full mx-auto gap-x-5 py-6 sm:px-6 lg:px-8'>
                <div
                    className="hidden bg-white bg-center bg-no-repeat shadow min-w-[308px] w-1/3 py-6 sm:px-6 lg:px-8 sm:flex justify-center items-center">
                    <div
                        style={{
                            backgroundImage: "url('/images/illustration-phone-mockup.svg')",

                        }} className='relative min-w-[308px] h-[632px] bg-cover bg-center bg-no-repeat'>
                        <Image className='mx-auto mt-[68px] rounded-full shadow-xl' width={90} height={90} src={session?.user?.image ?? ''} alt="" />
                        <p className='text-center mt-5 font-bold text-xl'>{session?.user?.name}</p>
                        <p className='text-center mt-1 text-gray-400'>{session?.user?.email}</p>

                        <div className='mt-6 ml-2 overflow-hidden bg-scroll overflow-y-auto max-h-[350px]'>
                            {selectedLinks.map((item) => (
                                <button
                                    key={item.platform}
                                    className={`flex justify-between items-center ${item.color} text-white w-[80%] mt-5 h-[44px] p-2 mx-auto rounded-lg`}
                                >
                                    <div className='flex justify-between gap-2 text-sm font-light'>
                                        <img className='fill-white' src={`/images/${item.iconUrl}`} />
                                        <p>{item.platform}</p>
                                    </div>
                                    <img src='/images/icon-arrow-right.svg' alt='iconarrow' />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="py-6 px-6 lg:px-8 shadow sm:w-2/3">
                    <div>
                        <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Customize your links</h1>
                        <p className='mt-3 leading-8 text-gray-400'>Add/edit/remove links below and then share all your profiles with the world!</p>
                        <button
                            onClick={addNewLink}
                            className="flex mt-5 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-indigo-600 border border-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >+ Add new link</button>
                    </div>
                    {fields.length > 0 ? (
                        fields.map((field, index) => {
                            const selectedPlatform = selectedPlatforms[index];

                            return (

                                <div key={field.id}>
                                    <div className='flex justify-between mt-10'>
                                        <div className='flex gap-2'>
                                            <img src='/images/icon-hughug.svg' alt='' />
                                            <h1 className='font-bold'>Link #{index + 1}</h1>
                                        </div>
                                        <button className='text-sm font-semibold text-slate-300' onClick={() => removeLink(index)}>Remove</button>
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor={`links.${index}.platform`} className='block text-xs text-gray-700'>
                                            Platform
                                        </label>
                                        <div className='flex items-center'>
                                            <select
                                                {...register(`links.${index}.platform`)}
                                                value={selectedPlatform}
                                                onChange={(e) => handlePlatformChange(index, e.target.value)}
                                                style={{
                                                    backgroundImage: `url('/images-gray/${Links.find((link) => link.platform === selectedPlatform)?.iconUrl}')`,

                                                }}
                                                className='py-2 border bg-no-repeat bg-[center_left_1rem] px-10 mt-1 block w-full p-2 border-gray-200 bg-white rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm '
                                            >
                                                {selectedPlatform && (
                                                    <img
                                                        src={`/images-gray/${Links.find((link) => link.platform === selectedPlatform)?.iconUrl}`}
                                                        alt={selectedPlatform}
                                                        className='w-6 h-6 mr-2'
                                                    />
                                                )}
                                                <option value=''>Select a platform</option>
                                                {Links.map((item) => (
                                                    <option
                                                        key={item.platform} value={item.platform}>
                                                        {item.platform}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='mt-3'>
                                            <label htmlFor={`links.${index}.url`} className='block font text-xs text-gray-700'>
                                                Link
                                            </label>
                                            <input
                                                {...register(`links.${index}.url`)}
                                                type='text'
                                                style={{
                                                    backgroundImage: "url('/images/icon-link.svg')",

                                                }}
                                                className='py-2 border bg-no-repeat bg-[center_left_1rem] px-10 mt-1 block w-full p-2 border-gray-200 bg-white rounded-md shadow-sm focus:border-indigo-500 focus-within:shadow-lg sm:text-sm'
                                                placeholder='Enter your link'
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })) : (

                        <div className=''>
                            <img className='mx-auto py-12' src='/images/illustration-empty.svg' alt='Image' />
                            <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Lets get you started</h2>
                            <p className='mt-5 text-center leading-8 text-gray-400'>Use the Add new link button to get started.<br />Once you have more than one link, you can reorder and edit them.<br /> We are here to help you share your profiles with everyone!</p>
                        </div>
                    )}
                </div>

            </main>
        </>
    )
}