
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
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";



export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
    return null;
  }


  
  const query = params.searchParams.search;

  const users = await searchVisitors(query);

  const current = await currentUser();

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
                  <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger>
                    <img className="rounded-md w-[80px] h-[106.4px]" src={user.image} alt="User Image" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="flex flex-row items-center justify-center">
                        <AlertDialogTitle>User Image</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription className="flex flex-row items-center justify-center">
                        <img className="rounded-md w-[300px] h-[400px]" src={user.image} alt="User Image" />
                      </AlertDialogDescription>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.createdAt.toLocaleDateString() + " " + user.createdAt.toLocaleTimeString()}</TableCell>

                  <TableCell>
                  {current?.id !== user.userId ? (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete this user: ({user.firstName} {user.lastName})?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction asChild>
                          <form action={async () => {
                        "use server";
                        await deleteVisitor(user.userId);
                        revalidatePath("/admin");
                      }}> 
                        <button type="submit" >Delete</button>
                      </form>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                      </AlertDialog>
                  )
                  :
                  (
                    <><p className="font-semibold opacity-40">Cannot Delete Self</p></>
                  )
                  }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
    </div>
  )
}