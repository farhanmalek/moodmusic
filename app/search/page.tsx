"use client"

import React from 'react'
import { useUserStore, fetchUser } from '../utils/context/store'
import { useRouter } from 'next/navigation'

const page = () => {

  const { setUser } = useUserStore()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()


  return (
    <div>You are logged in.</div>
  )
}

export default page