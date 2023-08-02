'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from './page'


import { useState, useEffect } from 'react'

export default function DashLayout() {


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

    console.log(isEditing)

    return (

        <div>
            <Navbar isEditing={isEditing} setIsEditing={setIsEditing} />
            <Dashboard isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
    )
}
