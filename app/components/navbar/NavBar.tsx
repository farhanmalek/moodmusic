"use client"

import { useUserStore } from "../../utils/context/store"
import UserIcon from "./UserIcon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOutUser } from "@/app/utils/queries"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const NavBar = () => {
  const { user } = useUserStore()
  const router = useRouter()
  const pathName = usePathname()

  async function handleLogout() {
    useUserStore.persist.clearStorage();
    useUserStore.getState().clearUser()
    await logOutUser()
    router.push("/")
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
<div className="w-full px-6 py-4 bg-gradient-to-r from-purple-950 to-indigo-900 text-white shadow-md backdrop-blur-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between relative">
    
    {/* Logo / Title */}
    <div className="text-2xl md:text-3xl font-bold tracking-wide">
      Mood<span className="text-pink-500">Music</span>
    </div>

    {/* User Menu */}
    {mounted && user && pathName !== "/" && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all focus:outline-none">
            <UserIcon user={user} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 w-44 bg-white text-black shadow-xl rounded-md">
          <DropdownMenuItem
            className="cursor-pointer hover:bg-black/10 px-4 py-2 rounded transition-all"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
</div>


  )
}

export default NavBar
