

import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client'
import ProfileCard from '@/app/components/ProfileCard';
import ProfileNav from '@/app/components/ProfileNav';



const UserProfilePage = async ({ params }: any) => {

  async function getData({ params }: any) {
    const res = await fetch(`https://link-sharing-app-ten.vercel.app/api/users/${params.userId}`, { cache: 'no-store' })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  const user = await getData({ params })

  return (

    <div className=' h-screen w-screen'>
      <ProfileNav />
      <ProfileCard user={user} />
    </div>
  );
};

export default UserProfilePage;


