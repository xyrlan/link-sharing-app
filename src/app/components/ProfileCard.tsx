"use client"
import React from 'react'
import Image from 'next/image'
import { Links } from '@/lib/Links'
import { useEffect, useState } from 'react'

type Link = {
    platform: string;
    url: string;
};

type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    hashedPassword: string;
    image: string;
    links: any;
};

type Props = {
    user: User;
};

const ProfileCard: React.FC<Props> = ({ user }) => {


     const Links = [
        {
          platform: 'GitHub',
          iconUrl: 'icon-github.svg',
          color: 'bg-black',
          placeholder: 'e.g. https://www.github.com/johnappleseed'
        },
        {
          platform: 'Youtube',
          iconUrl: 'icon-youtube.svg',
          color: 'bg-red-600',
          placeholder: 'e.g. https://www.youtube.com/benwright'
        },
        {
          platform: 'Linkedin',
          iconUrl: 'icon-linkedin.svg',
          color: 'bg-[#0077b5]',
          placeholder: 'e.g. https://www.linkedin.com/peterparker'
        },
        {
          platform: 'Twitter',
          iconUrl: 'icon-twitter.svg',
          color: 'bg-[#1DA1F2]',
          placeholder: 'e.g. https://www.twitter.com/peterparker'
        },
        {
          platform: 'Twitch',
          iconUrl: 'icon-twitch.svg',
          color: 'bg-[#6441a5]',
          placeholder: 'e.g. https://www.twitch.tv/jamilejson'
    
        },
        {
          platform: 'Facebook',
          iconUrl: 'icon-facebook.svg',
          color: 'bg-[#4267B2]',
          placeholder: 'e.g. https://www.facebook.com/loveerica'
        },
    
      ]

    const [selectedLinks, setSelectedLinks] = useState<Link[]>([]);
    useEffect(() => {
        if (user.links) {
            const userLinks = user.links;

            const extractedLinks = userLinks.map((link: any) => ({
                platform: link.platform,
                url: link.url.startsWith("https://") ? link.url : `https://${link.url}`,
              }));


            setSelectedLinks(extractedLinks);
        }
    }, [user.links]);


    const LinksMap: Record<string, any> = {};
    Links.forEach((link) => {
      LinksMap[link.platform] = link;
    });

    return (
        <div className="h-full w-full flex justify-center">

            <div
                className='relative mt-28 min-w-[308px] max-h-[632px] rounded-xl shadow-2xl bg-cover bg-center bg-no-repeat'
            >
                <img
                    className="h-10 mx-auto"
                    src="/images/logo-devlinks-large.svg"
                    alt="Your Company"
                />
                <Image className='mx-auto mt-[68px] rounded-full shadow-xl border-2 border-indigo-500 min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] object-cover' width={90} height={90} src={user.image} loading="lazy" alt="profile photo" />
                <div className="h-[56px] w-[308px]">
                    <p className='text-center mt-5 font-bold text-xl'>{user.name}</p>
                    <p className='text-center mt-1 text-gray-400'>{user.email}</p>
                </div>

                <div className='mt-6 ml-2 overflow-hidden overflow-y-auto max-h-[350px]'>
                    {selectedLinks.map((link: any) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex justify-between items-center text-white w-[80%] mt-5 h-[44px] p-2 mx-auto rounded-lg ${LinksMap[link.platform]?.color}`}
                        >
                            <div className='flex justify-between gap-2 text-sm font-light'>
                                <img className='fill-white' src={`/images/${Links.find(
                                    (item) => item.platform === link.platform
                                )?.iconUrl}`} />
                                <p className='font-semibold tracking-wide'>{link.platform}</p>
                            </div>
                            <img src='/images/icon-arrow-right.svg' alt='iconarrow' />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard