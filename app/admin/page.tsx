'use client'
import {intAuth, loginControl} from "@/lib/shared-utils";

let permission = 1;
export default function Page() {
    permission = intAuth();
    loginControl()
    return (
        <div className="h-screen w-full pt-32 px-4">

        </div>
    );
}