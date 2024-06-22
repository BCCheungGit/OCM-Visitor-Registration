"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";



function GetInfoPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!user) return null;
  return (
    <div className="h-full text-lg text-center flex flex-col gap-4">
      <div>
        Welcome, <span>{user.fullName}</span>
      </div>
      <div>
        Email: <span>{user.emailAddresses[0]?.emailAddress}</span>
      </div>
      <div>
        Phone: <span>{user.phoneNumbers[0]?.phoneNumber}</span>
      </div>
      <div>
        <Button>Take a Picture!</Button>
      </div>

      
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center mt-20">
      <SignedOut>
        <div className="h-full text-lg justify-center items-center text-center flex flex-col gap-4">
          <div>
            Welcome to OCM! Click the button below to register.
          </div>
        <SignInButton><Button className="w-fit">Register</Button></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <GetInfoPage />
      </SignedIn>
    </main>
  );
}
