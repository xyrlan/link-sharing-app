import React from 'react'
import Navbar from '../components/Navbar'


import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

export default function DashLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (

        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
