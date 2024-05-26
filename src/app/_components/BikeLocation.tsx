'use client'

import { useAtom } from "jotai/react"
import { useRouter } from "next/navigation"
import { selectionAtom } from "~/store"

export const BikeLocation = () => {

    const router = useRouter()
    const [selection, setSelection] = useAtom(selectionAtom)

    return (
        <>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm ${selection.location === 1 ? 'bg-yellow text-white' : 'bg-white text-yellow'} hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`}
                onClick={() => {
                    setSelection((prev) => ({ ...prev, location: 1 }))
                    router.push('/booking')
                }}>
                <h1 className="text-4xl">Jetty</h1>
            </div>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm ${selection.location === 2 ? 'bg-yellow text-white' : 'bg-white text-yellow'} hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`}
                onClick={() => {
                    setSelection((prev) => ({ ...prev, location: 2 }))
                    router.push('/guesthouse')
                }}>
                <h1 className="text-4xl">Guesthouse</h1>
            </div>
        </>
    )
}
