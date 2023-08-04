'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from './page'
import { useSession } from 'next-auth/react'


import { useState, useEffect } from 'react'

export default function DashLayout() {

    const { data: session, status } = useSession();




    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Armazena o valor de isEditing no localStorage sempre que ele for alterado


    return (

        <div>
            <Navbar isEditing={isEditing} setIsEditing={setIsEditing} session={session} status={status} />
            <Dashboard isEditing={isEditing} setIsEditing={setIsEditing} session={session} status={status} />
        </div>
    )
}
