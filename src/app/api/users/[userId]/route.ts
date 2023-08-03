import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  try {
    const urlParts = req.url.split('/');
    const userIdIndex = urlParts.findIndex((part: string) => part === 'users') + 1;
    const userId = urlParts[userIdIndex];

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });

  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}