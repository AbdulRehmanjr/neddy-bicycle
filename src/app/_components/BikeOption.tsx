'use client'

import { useAtom } from "jotai/react"
import { useRouter } from "next/navigation"
import { selectionAtom } from "~/store"

export const BikeOptions = () => {

    const router = useRouter()
    const [selection, setSelection] = useAtom(selectionAtom)

    return (
        <>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm bg-[url('/men.jpeg')] bg-cover text-yellow hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => {
                setSelection((prev) => ({ ...prev, option: 1 }))
                router.push('/calendar')
            }}>
                <h1 className="font-extrabold text-4xl">Gentlemen bikes</h1>
                <h2 className="font-extrabold text-2xl">150 €</h2>
            </div>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm bg-[url('/ladies.jpeg')] bg-cover text-yellow hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => {
                setSelection((prev) => ({ ...prev, option: 2 }))
                router.push('/calendar')
            }}>
                <h1 className="font-extrabold text-4xl">Ladies bikes</h1>
                <h2 className="font-extrabold text-2xl">150 €</h2>
            </div>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm ${selection.option === 3 ? 'bg-yellow text-white' : 'bg-white text-yellow'} hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => {
                setSelection((prev) => ({ ...prev, option: 3 }))
                router.push('/calendar')
            }}>
                <h1 className="font-extrabold text-4xl">Kids bikes</h1>
                <h2 className="font-extrabold text-2xl">150 €</h2>
            </div>
        </>
    )
}
