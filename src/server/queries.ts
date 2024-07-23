"use server"
import { db } from "./db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { visitors } from "./db/schema";
import { redirect } from "next/navigation";
import { eq, ne } from "drizzle-orm";
import { checkRole } from "~/utils/roles";
import { revalidatePath } from "next/cache";




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


export async function deleteVisitor(id: string) {
    const user = auth();
    if (!user || !checkRole("admin")) {
        throw new Error("Unauthorized");
    }

    try {
        await db.delete(visitors).where(eq(visitors.userId, id));
        await clerkClient.users.deleteUser(id);
        
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting visitor");
    }
}


export async function deleteOldVisitors() {
    const user = auth();
    if (!user || !checkRole("admin")) {
        throw new Error("Unauthorized");    
    }
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate the date one week ago

        const oldVisitors = await db.query.visitors.findMany({
            where: (model, { lt }) => lt(model.createdAt, oneWeekAgo),
        });


        for (const visitor of oldVisitors) {
            if ((await clerkClient.users.getUser(visitor.userId)).publicMetadata.role === "admin") {
                continue;
            }
            await db.delete(visitors).where(eq(visitors.userId, visitor.userId));
            await clerkClient.users.deleteUser(visitor.userId);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting all visitors");
        
    }
}