import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(request: any) {
  const body = await request.json();
  const { id, links, name, image } = body.data;

  if (!id) {
    return new NextResponse("Missing id or links data", { status: 400 });
  }

  try {

    const updatedUser = await prisma.user.update({
      where: { email: id },
      data: {
        links: links,
        name: name,
        image: image,
      },
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar os links no servidor:', error);
    return new NextResponse("Error updating links on the server", { status: 500 });
  }

}
