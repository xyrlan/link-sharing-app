

import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client'
import ProfileCard from '@/app/components/ProfileCard';
import ProfileNav from '@/app/components/ProfileNav';




// export const getStaticPaths: any = async () => {
//   // Generate paths for all user IDs
//   const users = await fetch('http://localhost:3000/api/users').then((res) => res.json());
//   const paths = users.map((user: User) => ({
//     params: { userId: user.id },
//   }));

//   return { paths, fallback: false };
// }



const UserProfilePage = async ({ params }: any) => {

  async function getData({ params }: any) {
    const res = await fetch(`http://localhost:3000/api/users/${params.userId}`, { cache: 'no-store' })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }
  // const user = await fetch(`http://localhost:3000/api/users/${params.userId}`).then((res) => res.json());
  const user = await getData({ params })
  return (

    <div className=' h-screen w-screen'>
      <ProfileNav />
      <ProfileCard user={user} />
    </div>
  );
};

export default UserProfilePage;


