'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from './page'
import { useSession } from 'next-auth/react'


import { useState, useEffect } from 'react'

export default function DashLayout() {

    const { data: session, status, update } = useSession();

    const initialIsEditing = () => {
        if (typeof window !== 'undefined') {
          const initialIsEditingValue = localStorage.getItem('isEditing') === 'true';
          return initialIsEditingValue;
        }
        return false; // Valor padrão caso não esteja no lado do cliente
      };

    const [isEditing, setIsEditing] = useState<boolean>(initialIsEditing);

    // Armazena o valor de isEditing no localStorage sempre que ele for alterado
    useEffect(() => {
        localStorage.setItem('isEditing', String(isEditing));
    }, []);


    return (

        <div>
            <Navbar isEditing={isEditing} setIsEditing={setIsEditing} session={session} />
            <Dashboard isEditing={isEditing} setIsEditing={setIsEditing} session={session} status={status} update={update} />
        </div>
    )
}
