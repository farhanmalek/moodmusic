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
    <nav className="w-full bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0">
            <a href="/search" className="flex items-center space-x-2 group">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent group-hover:from-[#1ed760] group-hover:to-[#1DB954] transition-all duration-300">
                Mood<span className="text-white">Music</span>
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/search" className="text-gray-300 hover:text-white transition-colors duration-200">
              Search
            </a>
            <a className="text-gray-300 hover:text-white transition-colors duration-200">
              Playlists (coming soon)
            </a>
          </div>

          {/* User Menu */}
          {mounted && user && pathName !== "/" && (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-gray-900">
                    <UserIcon user={user} />
                    <span className="text-sm font-medium">{user.username}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-56 bg-gray-900/95 backdrop-blur-lg border border-white/10 text-white shadow-xl rounded-lg">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/10 px-4 py-3 rounded-md transition-all duration-200"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
