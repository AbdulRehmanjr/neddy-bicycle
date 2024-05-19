'use client'

import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"

export const GoBack = () => {

    const router = useRouter()
    return (
        <Button className="w-fit bg-yellow hover:bg-yellow font-ibm" onClick={(_e) => router.back()}>
            Go back
        </Button>
    )
}