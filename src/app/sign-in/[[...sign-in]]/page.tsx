import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col min-w-screen justify-center items-center">
        <SignIn />
        </div>
    )
}