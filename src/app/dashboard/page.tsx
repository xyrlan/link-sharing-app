'use client'

import exempleCard from './components/PreviewCard';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import axios from 'axios';
import PreviewCard from './components/PreviewCard';
import LinksMenu from './components/LinksMenu';
import ProfileDetails from './components/ProfileDetails';


const createUserLinksSchema = z.object({
  links: z.array(z.object({
    platform: z.string().nonempty('obrigatorio'),
    url: z.string().nonempty('obrigatorio')
  }))
})

type CreateUserLinksData = z.infer<typeof createUserLinksSchema>

interface NavbarProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function Dashboard({ isEditing, setIsEditing }: NavbarProps) {

  const router = useRouter();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sessionLinks, setSessionLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [image, setImage] = useState<{
    fileUrl: string
    fileKey: string
  }[]>([])



  const initialSelectedPlatformsRef = useRef<string[]>([]);

  const { data: session, status } = useSession();


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


  const onSubmit = async (data: CreateUserLinksData) => {
    try {
      setIsLoading(true);

      const formattedData = data.links.reduce((acc: any, link: any) => {
        acc[link.platform] = { url: link.url };
        return acc;
      }, {});

      const response = await axios.post('/api/dashboard', {
        data: {
          id: session?.user?.email,
          links: formattedData,
        },
      });

      toast.success('Links successfully saved!');
      setIsEditing(true);
    } catch (error) {
      console.error('Erro ao salvar os links:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (session?.user?.links) {
      const linksFromSession = session.user.links;
      const extractedLinks = Object.keys(linksFromSession).map((platform) => ({
        platform,
        url: linksFromSession[platform].url,
      }));

      setSessionLinks(extractedLinks);

      if (fields.length === 0) {
        extractedLinks.forEach((link) => {
          append({ platform: link.platform, url: link.url });
        });
      }

      const initialSelectedPlatforms = extractedLinks.map((link) => link.platform);
      initialSelectedPlatformsRef.current = initialSelectedPlatforms; // Store initialSelectedPlatforms in the ref

      // Set selectedPlatforms only if it hasn't been changed yet
      if (selectedPlatforms.length === 0) {
        setSelectedPlatforms(initialSelectedPlatforms);
      }
    }
  }, [session?.user?.links, fields.length, append, selectedPlatforms]);

  function handlePlatformChange(index: number, platform: string) {
    const newSelectedPlatforms = [...selectedPlatforms];
    newSelectedPlatforms[index] = platform;
    setSelectedPlatforms(newSelectedPlatforms);
  }

  const selectedLinks = Links.filter((link) =>
    selectedPlatforms.includes(link.platform)
  );


  return (
    <>
      <main className='flex max-w-7xl min-h-full mx-auto gap-x-5 py-6 sm:px-6 lg:px-8'>
        {status === 'loading' ? (
          <div className='w-full h-full flex justify-center items-center'><p>Processing...</p></div>
        ) : (
          <>
            <PreviewCard selectedLinks={selectedLinks} session={session} firstName={firstName} lastName={lastName} previewImage={previewImage} image={image}  />
            {isEditing ? (
              <ProfileDetails session={session} firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} setPreviewImage={setPreviewImage} previewImage={previewImage} image={image} setImage={setImage} />
            ) : (
              <LinksMenu addNewLink={addNewLink} fields={fields} selectedPlatforms={selectedPlatforms} handlePlatformChange={handlePlatformChange} handleSubmit={handleSubmit} onSubmit={onSubmit} Links={Links} register={register} removeLink={removeLink} />
            )}
          </>
        )}
      </main>
    </>
  );

}