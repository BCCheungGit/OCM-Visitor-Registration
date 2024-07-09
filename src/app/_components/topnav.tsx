import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";



export function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">

            <div className="flex flex-row items-center justify-center">
                <img src='https://avatars.planningcenteronline.com/uploads/organization/217202-1482195203/avatar.1.png' alt="Main Church" />
                OCM Visitor Registration
            </div>
            <div className="flex flex-row gap-4 items-center">
                <SignedIn>
                    <SignOutButton><Button>Sign Out</Button></SignOutButton>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}