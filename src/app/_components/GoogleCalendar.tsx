/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


import { useEffect } from "react"
import Link from "next/link";
import { api } from "~/trpc/react";



export const SessionSet = ({ token }: { token: string }) => {

    const { data } = api.calendar.getUserInfo.useQuery({ cookie: token })

        useEffect(() => {
            if (data) 
                localStorage.setItem('NeddyGoogleToken', JSON.stringify(data))
        }, [data])

    return (
        <>
            <h1>Hello</h1>
            <Link href={"/testing"}>Testing</Link>
        </>
    )
}
