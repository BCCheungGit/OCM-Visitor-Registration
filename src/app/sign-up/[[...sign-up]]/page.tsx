import { SignUp } from "@clerk/nextjs";



export default function Page() {
    return (
        <div className="min-w-screen mt-10 flex flex-col items-center justify-center">
        <SignUp />
        </div>
    )
}