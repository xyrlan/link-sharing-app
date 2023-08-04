'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from './page'
import { useSession } from 'next-auth/react'


import { useState, useEffect } from 'react'

export default function DashLayout() {

    const { data: session, status } = useSession();

    return (

        <div>
            <Navbar  session={session} status={status} />
            <Dashboard session={session} status={status} />
        </div>
    )
}
