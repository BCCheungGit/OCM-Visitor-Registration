"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { IDCard } from "../_components/idcard";
import { useUser } from "@clerk/nextjs";
import { getVisitor } from "~/server/queries";
import ReactToPrint from 'react-to-print';
import { redirect } from "next/navigation";

interface VisitorComponentProps {
    id: string;
    idCardContainerRef: React.RefObject<HTMLDivElement>; 
}


const convertDateToString = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        year: "numeric",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}


const VisitorComponent: React.FC<VisitorComponentProps> = ({ id, idCardContainerRef }) => {
    const [visitorData, setVisitorData] = useState<{
        name: string | undefined;
        phone: string | undefined;
        email?: string;
        photo: string | undefined;
        date: string | undefined;
    }>({
        name: undefined,
        phone: undefined, 
        email: undefined,
        photo: undefined,
        date: undefined,
    });

    useEffect(() => {
        async function fetchVisitor() {
            try {
                await getVisitor(id)
                .then((visitor) => {
                  setVisitorData({
                    name: visitor.name,
                    phone: visitor.phone,
                    email: visitor.email ?? undefined,
                    photo: visitor.photo,
                    date: convertDateToString(visitor.date),
                }); 
                if (visitorData.photo === "" || visitorData.photo === undefined) {
                    redirect("/");
                }
                })
                .catch((error) => console.error("Error fetching visitor:", error));

            } catch (error) {
                console.error("Error fetching visitor:", error);
                }
        }

        fetchVisitor();
    }, [id]);

    return (
        <div ref={idCardContainerRef}>
            {visitorData.name && (
                <IDCard
                    name={visitorData.name}
                    phone={visitorData.phone}
                    email={visitorData.email}
                    photo={visitorData.photo}
                    date={visitorData.date}
                />
            )}
        </div>
    );
};


export default function PrintPage() {
    const { isSignedIn, user } = useUser();

    const idCardRef = useRef<HTMLDivElement>(null);

    if (!isSignedIn || !user) {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="flex h-full flex-col gap-4 min-h-screen items-center text-center text-lg ">
            <div className="sm:inline hidden">
            <ReactToPrint 
                
                trigger={() => <Button>Print ID Card</Button>}
                content={() => idCardRef.current}
            />
            </div>
            <div className="sm:hidden flex flex-col">
                <div>ID Card:</div>
            </div>
            <VisitorComponent id={user.id} idCardContainerRef={idCardRef} />
        </div>
    );
}

