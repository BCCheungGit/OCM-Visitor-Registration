"use server"
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { visitors } from "./db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";




export async function addVisitor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    image: string,
    userId: string,
) {
    const user = auth();
    if (!user) {
        throw new Error("Unauthorized");
    }
    await db.insert(visitors).values({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        image: image,
        userId: userId,
    })

    redirect("/print");
}

export async function getVisitors() {
    const user = auth();
    if (!user) {
        throw new Error("Unauthorized");
    }
    return await db.query.visitors.findMany();
}


export async function getVisitor(id: string) {
    const user = auth();
    if (!user) {
        throw new Error("Unauthorized");
    }

    const visitor = await db.query.visitors.findFirst({
        where: (model, { eq}) => eq(model.userId, id)
    })

    console.log("Visitor data:", visitor);
    return {
        name: visitor?.firstName ?? '',
        phone: visitor?.phoneNumber ?? '',
        email: visitor?.email ?? '',
        photo: visitor?.image ?? ''
    }

}
