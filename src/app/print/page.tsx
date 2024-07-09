"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { IDCard } from "../_components/idcard";
import { useUser } from "@clerk/nextjs";
import { getVisitor } from "~/server/queries";


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
        <div>
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

    if (!isSignedIn || !user) {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="flex h-full flex-col gap-4 min-h-screen items-center text-center text-lg mt-20">
            <Button>Click Here to Print ID Card</Button>
            <VisitorComponent id={user.id} />
        </div>
    );
}

