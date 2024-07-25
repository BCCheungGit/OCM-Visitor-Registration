import { revalidatePath } from "next/cache";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteVisitor } from "~/server/queries";


interface DeleteModalProps {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: string;
}

interface ImageModalProps {
    image: string;
}



export const ImageModal: React.FC<ImageModalProps> = ({image}) => {

    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <img className="rounded-md w-[80px] h-[106.4px]" src={image} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-row items-center justify-center">
            <AlertDialogTitle>Image</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex flex-row items-center justify-center">
            <img className="rounded-md w-[300px] h-[400px]" src={image} />
          </AlertDialogDescription>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );
  }


export const DeleteModal: React.FC<DeleteModalProps> = ({firstName, lastName, userId}) => {
return (

    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this user: ({firstName} {lastName})?</AlertDialogTitle>
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
    await deleteVisitor(userId);
    revalidatePath("/admin");
  }}> 
    <button type="submit" >Delete</button>
  </form>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
);
};

// export const DeleteAllModal: React.FC = () => {
//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Button variant="destructive">Run Deletion Script</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you sure you want to delete all visitors from last week?</AlertDialogTitle>
//                 </AlertDialogHeader>
//                 <AlertDialogDescription>
//                     This action cannot be undone. All visitors who visited in the last 7 days will be deleted.
//                 </AlertDialogDescription>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>
//                         Cancel
//                     </AlertDialogCancel>
//                     <AlertDialogAction asChild>
//                         <form action={async () => {
//                             "use server";
//                             await deleteOldVisitors();
//                             revalidatePath("/admin");
//                         }}>
//                             <button type="submit">Delete</button>
//                         </form>
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
      
//     )
// }

