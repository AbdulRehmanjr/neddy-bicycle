'use client'

import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"

export const GoBack = () => {

    const router = useRouter()
    return (
        <Button className="w-fit" onClick={(_e) => router.back()}>
            Go back
        </Button>
    )
}