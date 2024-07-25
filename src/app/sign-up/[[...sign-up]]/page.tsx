import { SignUp } from "@clerk/nextjs";



export default function Page() {
    return (
        <div className="min-w-screen flex flex-col items-center justify-center">
        <SignUp />
        </div>
    )
}