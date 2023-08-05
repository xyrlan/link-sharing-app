'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import axios from 'axios';
import PreviewCard from './components/PreviewCard';
import LinksMenu from './components/LinksMenu';
import ProfileDetails from './components/ProfileDetails';




export default function Dashboard({ isEditing, setIsEditing, session, status }: any) {

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

console.log(image)

  const initialSelectedPlatformsRef = useRef<string[]>([]);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login page if not authenticated
    }
  }, [status]);



  const createUserLinksSchema = z.object({
    links: z.array(
      z.object({
        platform: z.string().nonempty('Obrigatory'),
        url: z.string().nonempty('Obrigatory').refine((value) => {
          if (value) {
            return (
              value.includes('github.com') ||
              value.includes('youtube.com') ||
              value.includes('facebook.com') ||
              value.includes('linkedin.com') ||
              value.includes('twitch.tv') ||
              value.includes('twitter.com')
            );
          }
          return true;
        }, 'Invalid URL')
      })
    )
  });


  type CreateUserLinksData = z.infer<typeof createUserLinksSchema>

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

      const formattedData = data.links.map((link: any) => ({
        platform: link.platform,
        url: link.url,
      }));

      await axios.post('/api/dashboard', {
        data: {
          id: session?.user?.id,
          links: formattedData,
          name: firstName + ' ' + lastName,
          image: image.map((img) => img.fileUrl),
        },
      });

      toast.success('Links successfully saved!');
    } catch (error) {
      console.error('Erro ao salvar os links:', error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (session?.user?.links) {
      const linksFromSession = session.user.links;
      const extractedLinks = linksFromSession.map((link: any) => ({
        platform: link.platform,
        url: link.url,
      }));

      setSessionLinks(extractedLinks);

      if (fields.length === 0) {
        extractedLinks.forEach((link: any) => {
          append({ platform: link.platform, url: link.url });
        });
      }

      const initialSelectedPlatforms = extractedLinks.map((link: any) => link.platform);
      initialSelectedPlatformsRef.current = initialSelectedPlatforms;

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
            <PreviewCard selectedLinks={selectedLinks} session={session} firstName={firstName} lastName={lastName} previewImage={previewImage} image={image} />
            {isEditing ? (
              <ProfileDetails session={session} firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} setPreviewImage={setPreviewImage} previewImage={previewImage} image={image} setImage={setImage} />
            ) : (
              <LinksMenu addNewLink={addNewLink} errors={errors} fields={fields} selectedPlatforms={selectedPlatforms} handlePlatformChange={handlePlatformChange} handleSubmit={handleSubmit} loading={isLoading} onSubmit={onSubmit} Links={Links} register={register} removeLink={removeLink} />
            )}
          </>
        )}
      </main>
    </>
  );

}