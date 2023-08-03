
import React from 'react'
import { User } from '@prisma/client'
import ProfileCard from '@/app/components/ProfileCard';
import ProfileNav from '@/app/components/ProfileNav';



const UserProfilePage = async ({ params }: any) => {
  console.log(params)
  const user = await fetch(`http://localhost:3000/api/users/${params.userId}`).then((res) => res.json());
  return (

    <div className=' h-screen w-screen'>
      <ProfileNav />
      <ProfileCard  user={user}/>
    </div>
  );
};

export default UserProfilePage;

export async function getStaticPaths() {
  // Generate paths for all user IDs
  const users = await fetch('http://localhost:3000/api/users').then((res) => res.json());
  const paths = users.map((user: User) => ({
    params: { userId: user.id },
  }));

  return { paths, fallback: true };
}

