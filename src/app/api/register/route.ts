import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";



export async function POST(request: any) {


    const body = await request.json();
    const { email, password, confirmPassword } = body.data;
    console.log(body.data);
    if(!email || !password) {
        return new NextResponse("Missing email or password", { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exist) {
        return new NextResponse("User already exists", { status: 401 });
    }

    if(password.length < 8 || confirmPassword.length < 8) {
        return new NextResponse("Password must be at least 8 characters", { status: 400 })
    }

    if(password !== confirmPassword) {
        return new NextResponse("Passwords do not match", { status: 402 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            hashedPassword,
        }
    });

    return NextResponse.json(user)
    
}