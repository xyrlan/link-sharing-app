import Image from "next/image"


interface PreviewCardProps {
    session: any;
    selectedLinks: any[];
    firstName: any;
    lastName: any;
    previewImage: any;
    image: any;
}

export default function PreviewCard({ session, selectedLinks, firstName, lastName, previewImage, image }: PreviewCardProps) {

    return (
        <div className="hidden bg-white bg-center bg-no-repeat shadow min-h-[80vh] min-w-[308px] w-1/3 py-6 sm:px-6 lg:px-8 sm:flex justify-center items-center">
            <div
                style={{
                    backgroundImage: "url('/images/illustration-phone-mockup.svg')",
                }}
                className='relative min-w-[308px] h-[632px] bg-cover bg-center bg-no-repeat'
            >
                <Image className='mx-auto mt-[68px] rounded-full shadow-xl border-2 border-indigo-500 min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] object-cover' width={90} height={90} src={image.length !== 0 ? (
                    image[0]?.fileUrl || (session?.user?.image || '/images/user-no-photo.jpg')
                ) : (
                    session?.user?.image || '/images/user-no-photo.jpg'
                )} loading="lazy" alt="profile photo" />
                <div className="h-[56px] w-[308px]">
                    <p className='text-center mt-5 font-bold text-xl'>{firstName === '' ? session?.user?.name : firstName + ' ' + lastName}</p>
                    <p className='text-center mt-1 text-gray-400'>{session?.user?.email}</p>
                </div>

                <div className='mt-6 ml-2 overflow-hidden overflow-y-auto max-h-[350px]'>
                    {selectedLinks.map((item: any) => (
                        <button
                            key={item.platform}
                            className={`flex justify-between items-center ${item.color} text-white w-[80%] mt-5 h-[44px] p-2 mx-auto rounded-lg`}
                        >
                            <div className='flex justify-between gap-2 text-sm font-light'>
                                <img className='fill-white' src={`/images/${item.iconUrl}`} />
                                <p className='font-semibold tracking-wide'>{item.platform}</p>
                            </div>
                            <img src='/images/icon-arrow-right.svg' alt='iconarrow' />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}