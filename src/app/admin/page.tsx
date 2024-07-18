

import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { SearchUsers } from "./_search-users";
import { deleteVisitor, getVisitors, searchVisitors } from "~/server/queries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";




async function handleDeleteUser(id: string) {
  try { 
    await deleteVisitor(id);
  } catch (error) {
    console.error("Error deleting user:", error); 
  }
}


export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }



  const query = params.searchParams.search;

  const users = await searchVisitors(query);

  // const users = query ? (await clerkClient.users.getUserList({ query })).data : [];


  return (  
    <div className="flex flex-col items-center justify-center min-w-screen min-h-full mt-20">
      <SearchUsers />
      <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-base">Image 圖片</TableHead>
                <TableHead className="font-bold text-base">Full Name 姓名</TableHead>
                <TableHead className="font-bold text-base">Phone Number 電話號碼</TableHead>
                <TableHead className="font-bold text-base">Created At 創建時間</TableHead>
                <TableHead className="font-bold text-base">Admin Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><img className="rounded-md w-[80px] h-[106.4px]" src={user.image} alt="User Image" /></TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.createdAt.toLocaleDateString() + " " + user.createdAt.toLocaleTimeString()}</TableCell>
                  <TableCell><Button onClick={async () => {await handleDeleteUser(user.userId)}}>Delete User</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
    </div>
  )
}