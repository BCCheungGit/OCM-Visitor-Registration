
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { SearchUsers } from "./_search-users";
import { getVisitors, searchVisitors } from "~/server/queries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";


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
                <TableHead className="font-bold text-base">Full Name 姓名</TableHead>
                <TableHead className="font-bold text-base">Phone Number 電話號碼</TableHead>
                <TableHead className="font-bold text-base">Created At 創建時間</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.createdAt.toLocaleDateString() + " " + user.createdAt.toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
    </div>
  )
}