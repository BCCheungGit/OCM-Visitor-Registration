"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { IDCard } from "../_components/idcard";
import { useUser } from "@clerk/nextjs";
import { getVisitor } from "~/server/queries";


interface Visitor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
  image: string;
  createdAt: Date;
  userId: string;
  updatedAt: Date | null;
}

export default function PrintPage() {
  const { user } = useUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const [visitor, setVisitor] = useState<Visitor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitors = await getVisitor(user.id);
        setVisitor(visitors);
      } catch (error) {
        console.error("Error fetching visitor:", error);
      }
    };

    fetchData();
  }, [user.id]);

  if (!visitor.length) {
    return <div>Loading visitor data...</div>;
  }

  return (
    <div className="flex h-full flex-col gap-4 min-h-screen items-center text-center text-lg mt-20">
      <Button>Click Here to Print ID Card</Button>
      <IDCard
        name={visitor[0]?.firstName + " " + visitor[0]?.lastName}
        phone={visitor[0]?.phoneNumber}
        photo={visitor[0]?.image}   
      />
    </div>
  );
}
