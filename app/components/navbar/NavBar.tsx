"use client"
import { useUserStore } from "../../utils/context/store"
import UserIcon from "./UserIcon"

const NavBar = () => {
  const { user } = useUserStore()

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex-1 flex justify-center">
        <h1 className="text-3xl font-bold">MoodMusic</h1>
      </div>
      {user && (
        <div className="absolute right-6">
          <UserIcon user={user} />
        </div>
      )}
    </div>
  )
}

export default NavBar
