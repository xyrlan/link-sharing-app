import React from 'react'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';



export async function GET() {

const users = await prisma.user.findMany({
    include: {
        links: true,
      },
});


return new NextResponse(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });

}

