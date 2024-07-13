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
    try {
        const visitor = await db.query.visitors.findFirst({
            where: (model, { eq }) => eq(model.userId, id)
        })
        return {
            name: visitor?.firstName + " " + visitor?.lastName ?? '',
            phone: visitor?.phoneNumber ?? '',
            email: visitor?.email ?? '',
            photo: visitor?.image ?? '',
            date: visitor?.createdAt ?? new Date(),
        }
    } catch (error) {
        throw new Error("Error fetching visitor data");
    }
}



export async function searchVisitors(query: string | undefined) {
    const user = auth();
    if (!user) {
        throw new Error("Unauthorized");
    }
    if (!query) {
        return await db.query.visitors.findMany();
    }
    return await db.query.visitors.findMany({
        where: (model, { ilike }) => ilike(model.firstName, query)
    });
}
