import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "~/components/ui/button";



export function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between p-4 sm:text-xl text-base font-semibold border-b">
            <div className="flex flex-row items-center justify-center">
            <Image src='https://avatars.planningcenteronline.com/uploads/organization/217202-1482195203/avatar.1.png' alt="Main Church" className="sm:w-[120px] sm:h-[120px]" width={80} height={80} />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <span className="sm:inline hidden">Oversea Chinese Mission 中華海外宣道會</span>
                <span className="sm:inline hidden">Visitor Registration 訪客登記</span>
                <span className="sm:hidden inline">OCM 中宣會</span>
                <span className="sm:hidden inline">Visitor Registration 訪客登記</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <SignedIn>
                    <SignOutButton><Button className="sm:inline hidden" >Sign Out</Button></SignOutButton>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}