"use server"
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { visitors } from "./db/schema";
import { redirect } from "next/navigation";




export async function addVisitor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    image: string,
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
    })

    redirect("/print");
}