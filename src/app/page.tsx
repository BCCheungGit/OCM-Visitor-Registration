"use client";


import { SignedIn, SignedOut, SignUpButton, useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

import * as rdd from 'react-device-detect';
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "~/components/ui/button";
import { addVisitor, getVisitor } from "~/server/queries";
import PrintPage from "./print/page";
import Link from "next/link";


const VisitorComponent: React.FC<{ id: string }> = ({ id }) => {
  const [visitorData, setVisitorData] = useState<{
    name: string | undefined;
    phone: string | undefined;
    email?: string;
    photo: string | undefined;
}>({
    name: undefined,
    phone: undefined, 
    email: undefined,
    photo: undefined
});

const isMobile = rdd.isMobile;
const width = isMobile ? 400 : 300;
const height = isMobile ? 300: 400;


const videoConstraints = {
  width: width,
  height: height,
  facingMode: "user",
};



const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
const webcamRef = useRef<Webcam>(null);
const [url, setUrl] = useState<string | null>(null);

const clerkClient = useClerk();


const { user } = useUser();
if (!user) return null;

const capture = useCallback(() => {
  const imageSrc = webcamRef.current?.getScreenshot({width: isMobile ? height : width, height: isMobile ? width : height});
  if (imageSrc) {
    setUrl(imageSrc);
    console.log(imageSrc);

    setCaptureEnable(false);
    console.log(imageSrc);
  }
}, [webcamRef, setUrl])





useEffect(() => {
  async function fetchVisitor() {
      try {
          await getVisitor(id)
          .then((visitor) => {
            setVisitorData({
              name: visitor.name,
              phone: visitor.phone,
              email: visitor.email ?? undefined,
              photo: visitor.photo ?? undefined
            });
          })
          .catch((error) => console.error("Error fetching visitor:", error));
      } catch (error) {
          console.error("Error fetching visitor:", error);
      }
  }

  fetchVisitor();
  }, [id]);

  if (user.publicMetadata?.role === "admin") {
    redirect("/admin");
  }
  

  if (!visitorData.photo) return (
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
            mirrored={true}
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
            <Button onClick={async () => {
                await addVisitor(
                  user.firstName ?? "",
                  user.lastName ?? "",
                  user.phoneNumbers[0]?.phoneNumber ?? "",
                  user.emailAddresses[0]?.emailAddress ?? "",
                  url,
                  user.id
                )
                clerkClient.user?.setProfileImage({file: url});
                setUrl(null);
                alert("Uploaded successfully!");

            }}>
              Confirm Upload
            </Button>
          </div>
        </>
      )}
    </div>
  );
  else {
    return (
      <PrintPage/>
    )
  }
  
};


function GetInfoPage() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <>
    <VisitorComponent id={user.id} />
    </>
  );
}



export default function HomePage() {

  return (
    <main className="flex flex-col min-h-screen items-center">
      <SignedOut>
        <div className="h-full text-lg justify-center items-center text-center flex flex-col gap-4">
          <div>
            Welcome to OCM! Click the button below to register.
          </div>
          <SignUpButton>
            <Button className="w-fit">Register or Sign In</Button>
            </SignUpButton>
           </div>
      </SignedOut>
      <SignedIn>
        <GetInfoPage />
      </SignedIn>
    </main>
  );
}
