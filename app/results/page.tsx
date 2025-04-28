'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { fetchSearchResults } from '../utils/queries'
import { useQuery } from '@tanstack/react-query'

const page = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    useEffect(() => {
      console.log("xxx")
    },[])


    const {data, isPending, isError, error, isSuccess} = useQuery({
      queryKey: ['searchResult', query],
      queryFn: () => fetchSearchResults(query as string),
      enabled: !!query, // Ensure the query runs only if `query` is not null
    })

    if (isPending) {
      return <p>Pending</p>
    }

    if (isError) {
      return <p>Error: {error.message}</p>
    }

    if(isSuccess) {
      console.log(data)
    }
    

   
  return (
    <div className='"min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4 py-8 flex flex-col items-center'
    >This is the search results page!</div>
  )
}

export default page