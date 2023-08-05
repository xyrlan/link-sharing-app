
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
      where: { id: id },
      data: {
        name: name,
        image: image,
      },
    });
    if (!links) {
      const updatedUserLink = await prisma.link.deleteMany({
        where: {
          userId: id
        },
      });
    }
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      await prisma.link.create({
        data: {
          platform: link.platform,
          url: link.url,
          userId: id
        }
      })
    }


    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar os links no servidor:', error);
    return new NextResponse("Error updating links on the server", { status: 500 });
  }

}
