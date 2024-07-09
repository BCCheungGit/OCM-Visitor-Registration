"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { IDCard } from "../_components/idcard";
import { useUser } from "@clerk/nextjs";
import { getVisitor } from "~/server/queries";
import ReactToPrint from 'react-to-print';

interface VisitorComponentProps {
    id: string;
    idCardContainerRef: React.RefObject<HTMLDivElement>; 
}

const VisitorComponent: React.FC<VisitorComponentProps> = ({ id, idCardContainerRef }) => {
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

    useEffect(() => {
        async function fetchVisitor() {
            try {
                await getVisitor(id)
                .then((visitor) => {
                  setVisitorData({
                    name: visitor.name,
                    phone: visitor.phone,
                    email: visitor.email ?? undefined,
                    photo: visitor.photo
                });
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
        <div className="flex h-full flex-col gap-4 min-h-screen items-center text-center text-lg mt-20">
            <ReactToPrint 
                trigger={() => <Button>Print ID Card</Button>}
                content={() => idCardRef.current}
            />
            <VisitorComponent id={user.id} idCardContainerRef={idCardRef} />
        </div>
    );
}

