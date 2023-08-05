'use client'

import "@uploadthing/react/styles.css";
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UploadButton, UploadDropzone } from "@/utils/uploadthings";
import Image from "next/image";
import { Session } from "next-auth";

interface ProfileDetailsProps {
    session: Session | null;
    firstName: string;
    lastName: string;
    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    setPreviewImage: (previewImage: string | null) => void;
    previewImage: string | null;
    image: any;
    setImage: any;


}

export default function ProfileDetails({
    session,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setPreviewImage,
    previewImage,
    image,
    setImage,

}: ProfileDetailsProps) {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false)



    const handleUploadComplete = (res: any) => {
        if (res) {
            setImage(res);
            const json = JSON.stringify(res);
        }

        toast.success("Upload Completed");
        console.log("Files: ", res);
    };

    const handleUploadError = (error: any) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
    };


    const getFirstName = (fullName: any): string => {
        const spaceIndex = fullName?.indexOf(' ');
        return spaceIndex !== -1 ? fullName?.substring(0, spaceIndex) : fullName ?? '';
    };

    const getLastName = (fullName: any): string => {
        const spaceIndex = fullName?.indexOf(' ');
        return spaceIndex !== -1 ? fullName?.substring(spaceIndex + 1) : '';
    };

    const handleFileChange = (acceptedFiles: any) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(acceptedFiles[0]);
        } else {
            setFile(null);
            setPreviewImage(null);
        }
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {

            await axios.post('/api/dashboard', {
                data: {
                    name: firstName === '' ? session?.user?.name : firstName + ' ' + lastName,
                    id: session?.user?.id,
                    image: `${image[0]?.fileUrl}`,
                },
            });

            toast.success('Profile updated successfully!');

        }
        catch (error) {
            console.error('Error updating profile:', error);
            // Handle error message or other error handling logic
        }
        setLoading(false);
        
    };



    return (
        <div className="py-6 px-6 lg:px-8 shadow sm:w-2/3 max-h-full max-sm:w-full relative">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Profile Details</h1>
                <p className="mt-3 leading-8 text-xs md:text-sm text-gray-400">Add your details to create a personal touch to your profile</p>
            </div>

            <div className="mt-5 md:mt-10">
                <div className="flex items-center md:px-5 py-5">
                    <p className="text-slate-500 text-sm">Profile picture</p>
                    <div className=" items-center gap-4 ml-[30%]">
                        <label className="relative md:flex items-center group gap-4" htmlFor="profile_image" >
                            {/* <div className="opacity-0 z-20 flex max-md:flex-col max-w-full max-h-full absolute cursor-pointer overflow-visible">
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={handleUploadComplete}
                                    onUploadError={handleUploadError}
                                />
                            </div> */}
                            {/* Renderiza a imagem ou a área de upload */}
                            {image.length !== 0 ? (
                                <div className='relative group cursor-pointer w-40 h-40 '>
                                    <Image src={image[0]?.fileUrl} width={160} height={160} alt="PreviewImage" className="w-40 h-40 rounded-lg object-cover" />
                                    <div className='h-full w-full absolute z-10 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center bottom-0 rounded-lg transition-all duration-200'>
                                        <div className='h-full w-full absolute bg-black opacity-0 group-hover:opacity-60 flex bottom-0 rounded-lg duration-200 transition-all' />
                                        <img className='z-20' src='/images/icon-upload-image copy.svg' alt="icon" />
                                        <p className='text-sm text-white font-semibold z-20'>Change Image</p>
                                    </div>
                                </div>

                            ) : (
                                <div className="w-40 h-40 rounded-lg bg-gray-200 hover:bg-indigo-200 cursor-pointer group flex flex-col items-center justify-center">
                                    <img className="group-hover:scale-105" src="/images/icon-upload-image.svg" alt="icon" />
                                    <p className="group-hover:scale-105 text-sm text-indigo-600 font-semibold">+ Upload Image</p>
                                </div>
                            )}

                            {/* Renderiza as informações sobre a imagem */}
                            {/* <input
                        id="profile_image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    /> */}
                            <p className="text-slate-500 text-xs max-md:hidden">
                                Image must be below 1024x1024px.
                                <br />
                                Use PNG, JPG or GIF format
                            </p>
                        </label>
                        <div className="text-center mt-3">
                            <button

                                className="h-10 w-36 bg-indigo-600 rounded-lg text-sm text-white font-semibold ">


                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={handleUploadComplete}
                                    onUploadError={handleUploadError}
                                />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            {/* Other form fields */}

            <div className="flex items-center justify-between mt-5 md:px-5 py-5">
                <label className='text-slate-500 w-24 text-sm'>First Name*</label>
                <input className="w-[60%]  block rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm focus:shadow-xl sm:leading-6"
                    onChange={(e) => setFirstName(e.target.value)}
                    type='text'
                    defaultValue={getFirstName(session?.user?.name) ?? ''}
                    required />
            </div>
            <div className="flex items-center justify-between md:p-5 py-5">
                <label className='text-slate-500 w-24 text-sm'>Last Name*</label>
                <input className="w-[60%]  block rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm focus:shadow-xl sm:leading-6"
                    onChange={(e) => setLastName(e.target.value)}
                    type='text'
                    defaultValue={getLastName(session?.user?.name) ?? ''}
                    required />
            </div>
            <div className="flex items-center justify-between md:p-5 py-5">
                <label className='text-slate-500 w-24 text-sm'>Email*</label>
                <input className="w-[60%]  block rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 focus:shadow-xl sm:text-sm sm:leading-6" readOnly type='text' value={session?.user?.email ?? ''} />
            </div>
            <div className="mt-8 max-sm:mb-8 w-full text-right flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="flex w-full sm:w-fit justify-center rounded-md bg-indigo-600 disabled:opacity-50 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full border-4 border-t-transparent border-l-transparent animate-spin border-white" />
                            <p>Processing...</p>
                        </div>
                    ) : (
                        <p>Save</p>
                    )}
                </button>
            </div>
        </div >

    );
}