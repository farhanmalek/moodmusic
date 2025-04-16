"use client"

import React, { useEffect } from 'react'
import { useUserStore, fetchUser } from '../utils/context/store'
import { useRouter } from 'next/navigation'

const page = () => {
const {user, setUser} = useUserStore()
 
useEffect(() => {
 if (!user) {
  const getUser = async () => {
  const fetchedUser = await fetchUser()
  setUser(fetchedUser)  
  }

  getUser()

 }

},[])
 
  return (
    <>
    <div>You are logged in.</div>
    </>
  )
}

export default page