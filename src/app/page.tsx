"use client";


import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "~/components/ui/button";




function GetInfoPage() {
    


  const isMobile = window.innerWidth < 768;
  const width = isMobile ? window.innerWidth : 800;
  const height = isMobile ? 250 : 400;
  const videoConstraints = {
    width,
    height,
    facingMode: "user",
  };
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      setCaptureEnable(false);
    }
  }, [webcamRef, setUrl])



  const { isLoaded, isSignedIn, user } = useUser();
  if (!user) return null;
  return (
    <div className="flex h-full flex-col gap-4 text-center text-lg">
      <div>
        Welcome, <span>{user.fullName}</span>
      </div>
      {user.emailAddresses[0]?.emailAddress && (
        <div>
          Email: <span>{user.emailAddresses[0]?.emailAddress}</span>
        </div>
      )}
      {user.phoneNumbers[0]?.phoneNumber && (
        <div>
          Phone: <span>{user.phoneNumbers[0]?.phoneNumber}</span>
        </div>
      )}

      <div>
        <Button
          onClick={() => {
            setCaptureEnable(true);
          }}
        >
          Take a Picture!
        </Button>
      </div>

      {isCaptureEnable && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div className="flex flex-row justify-center gap-4">
            <Button onClick={capture}>Capture photo</Button>
            <Button
              onClick={() => {
                setCaptureEnable(false);
                setUrl(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      {url && (
        <>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
          <div className="flex flex-row justify-center gap-4">
            <Button
              onClick={() => {
                setUrl(null);
              }}
            >
              Delete
            </Button>
            <Button>Confirm Upload</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center mt-20">
      <SignedOut>
        <div className="h-full text-lg justify-center items-center text-center flex flex-col gap-4">
          <div>
            Welcome to OCM! Click the button below to register.
          </div>
        <SignUpButton><Button className="w-fit">Register</Button></SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <GetInfoPage />
      </SignedIn>
    </main>
  );
}
