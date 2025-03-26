import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export async function Profile() {
    const session = await auth()
    if (session?.user?.name != null) {
        let name = (session.user.name).split(' ')
        let initials = ""
        name.map((el) => {
            initials = initials + el.charAt(0)
        })
        return <div className="mx-2 flex flex-row items-center justify-center">
            <Avatar className="mr-2 my-2 w-10 h-10 hover:outline-1 hover:outline-smnd/50 transition-all">
                <AvatarImage src={session.user.image ?? "user.svg"} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {/*<Image
                src={session.user.image ?? "user.svg"}
                width={32}
                height={32}
                alt="Profile picture"
                className="rounded-full mr-4"
            ></Image>*/}
        </div>
    }
    return <div className="flex flex-row items-center justify-center"><div className="bg-gray-500 text-gray-500 p-8 px-11 rounded-full">.</div>
        <span className="flex flex-col"><p className="mx-2 my-1 text-md font-normal">Not logged in.</p></span></div>
}