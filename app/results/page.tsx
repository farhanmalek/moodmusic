'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    useEffect(() => {
        console.log(query)
    },[])

  return (
    <div className='"min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4 py-8 flex flex-col items-center'
    >This is the search results page!</div>
  )
}

export default page