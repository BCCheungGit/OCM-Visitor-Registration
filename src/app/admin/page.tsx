
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { SearchUsers } from "./_search-users";



export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query ? (await clerkClient.users.getUserList({ query })).data : [];


  return (  
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
      <SearchUsers />
      {users.map((user) => {
        return (  
          <div key={user.id}>
            <h2>{user.fullName}</h2>
            <p>{user.phoneNumbers[0]?.phoneNumber}</p>
          </div>
        );
      })}
    </>
  )
}