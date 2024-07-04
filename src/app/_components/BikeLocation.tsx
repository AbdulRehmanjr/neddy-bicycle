'use client'


import { useRouter } from "next/navigation"
import { useBookingStore } from "~/store"


export const BikeLocation = () => {

    const router = useRouter()
    const {selection,setSelection} = useBookingStore()

    const clicked = (location: 1 | 2) => {
        setSelection({ location: location })
        router.push('/guesthouse')
    }
    return (
        <>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm ${selection.location === 1 ? 'bg-yellow text-white' : 'bg-white text-yellow'} hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[18rem] h-[13rem] md:w-[25rem] md:h-[25rem]`}
                onClick={() => { clicked(1) }}>
                <h1 className="text-4xl">Jetty</h1>
            </div>
            <div className={`flex flex-col justify-center items-center gap-4 font-ibm ${selection.location === 2 ? 'bg-yellow text-white' : 'bg-white text-yellow'} hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[18rem] h-[13rem] md:w-[25rem] md:h-[25rem]`}
                onClick={() => { clicked(2) }}>
                <h1 className="text-4xl">Guesthouse</h1>
            </div>
        </>
    )
}
