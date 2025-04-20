"use client"

import { useUserStore } from "../../utils/context/store"
import UserIcon from "./UserIcon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOutUser } from "@/app/utils/queries"
import { useRouter } from "next/navigation"


const NavBar = () => {
  const { user } = useUserStore()
  const router = useRouter()

  async function handleLogout() {
    useUserStore.persist.clearStorage();
    useUserStore.getState().clearUser()
    await logOutUser()
    router.push("/")
  }


  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex-1 flex justify-center">
        <h1 className="text-3xl font-bold">MoodMusic</h1>
      </div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {user && (
        <div className="absolute right-6">
          <UserIcon user={user} />
        </div>
      )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 mt-2 w-44">
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      
    </div>
  )
}

export default NavBar
