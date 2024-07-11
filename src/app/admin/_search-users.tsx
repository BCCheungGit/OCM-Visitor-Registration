"use client";


import { usePathname, useRouter } from "next/navigation"
import { Button } from "~/components/ui/button";

export const SearchUsers = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const queryTerm = formData.get("search") as string;
                    router.push(pathname + "?search=" + queryTerm);
                }}
            >
                <label htmlFor="search">Search Users</label>    
                <input type="text" name="search" id="search" />
                <Button type="submit">Search</Button>
            </form>
        </div>
    );

};