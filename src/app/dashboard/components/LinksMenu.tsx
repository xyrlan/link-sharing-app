'use client'


export default function LinksMenu({ addNewLink, fields, selectedPlatforms, handlePlatformChange, handleSubmit, onSubmit, Links, register, removeLink, loading, errors }: any) {


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault(); 
                handleSubmit(onSubmit)();
            }}
            className="sm:py-6 px-6 lg:px-8 shadow sm:w-2/3 max-h-full max-sm:w-full relative">
            <div>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Customize your links</h1>
                <p className='mt-3 leading-8 text-xs md:text-sm text-gray-400'>Add/edit/remove links below and then share all your profiles with the world!</p>
                <button
                    type="button"
                    onClick={addNewLink}
                    className="flex mt-5 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-indigo-600 border border-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >+ Add new link</button>
            </div>

            <div className='mt-5 sm:mt-10 overflow-hidden overflow-y-auto max-h-[50vh]' >

                {fields.length > 0 ? (
                    fields.map((field: any, index: any) => {
                        const selectedPlatform = selectedPlatforms[index];
                        const platformError = errors.links?.[index]?.platform;
                        const urlError = errors.links?.[index]?.url;

                        return (

                            <div className='pr-2' key={field.id}>
                                <div className='flex justify-between mt-10'>
                                    <div className='flex gap-2'>
                                        <img src='/images/icon-hughug.svg' alt='' />
                                        <h1 className='font-bold text-slate-300'>Link #{index + 1}</h1>
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
                                            placeholder="Select a platform"
                                            style={{
                                                backgroundImage: `url('/images-gray/${Links.find((link: any) => link.platform === selectedPlatform)?.iconUrl}')`,

                                            }}
                                            className='selection:text-indigo-500 py-2 border bg-no-repeat bg-[center_left_1rem] px-10 mt-1 block w-full p-2 border-gray-200 bg-white rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm '
                                        >


                                            <option value=''>Select Platform</option>

                                            {Links.map((item: any) => (
                                                <option
                                                    key={item.platform} value={item.platform}>
                                                    {item.platform}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {platformError && (
                                        <p className="text-red-500 text-xs mt-1">{platformError.message}</p>
                                    )}
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
                                            className={`py-2 border bg-no-repeat bg-[center_left_1rem] px-10 mt-1 block w-full placeholder:justify-between p-2 border-gray-200 bg-white rounded-md shadow-sm focus:border-indigo-600 focus-within:shadow-lg sm:text-sm ${urlError && 'border-red-500'}`}
                                            placeholder={Links.find((link: any) => link.platform === selectedPlatform)?.placeholder}
                                        />
                                        {urlError && (
                                            <p className="text-red-500 text-xs mt-1">{urlError.message}</p>
                                        )}
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
            <div className='mt-8 max-sm:mb-8 w-full text-right flex justify-end'>


                <button

                    disabled={fields.length === 0}
                    type="submit"
                    // onClick={() => handleSubmit(onSubmit)()}
                    className='flex w-full sm:w-fit justify-center rounded-md bg-indigo-600 disabled:opacity-50 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
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
        </form>
    )
}