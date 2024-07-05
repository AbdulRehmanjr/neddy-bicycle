'use client'

import { Minus, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useBookingStore } from "~/store"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const BikeOptions = () => {

    const router = useRouter()

    const {selection,setSelection} = useBookingStore()

    return (
        <div className="flex flex-col gap-12 font-ibm mx-10 md:mx-40">
            <div className="flex flex-col md:flex-row justify-center items-center gap-14">
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[18rem] h-[13rem] md:w-[25rem] md:h-[20rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/man.jpeg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl md:text-4xl">Gentlemen bikes</h2>
                            <h3 className="text-lg md:text-2xl">10 €</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.men <= 0}
                            onClick={() => setSelection({men: selection.men - 1 })}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.men}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection({men: selection.men + 1 })}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[18rem] h-[13rem] md:w-[25rem] md:h-[20rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/lady.jpeg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl md:text-4xl">Ladies bikes</h2>
                            <h3 className="text-lg md:text-2xl">10 €</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.ladies <= 0}
                            onClick={() => setSelection({ladies: selection.ladies - 1 })}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.ladies}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection({ladies: selection.ladies + 1 })}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[18rem] h-[13rem] md:w-[25rem] md:h-[20rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/kids_1.jpg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl md:text-4xl">Kids bikes</h2>
                            <h3 className="text-lg md:text-2xl">10 €</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.kids <= 0}
                            onClick={() => setSelection({kids: selection.kids - 1 })}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.kids}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection({kids: selection.kids + 1 })}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mb-40">
                <Button
                    className="bg-yellow hover:bg-yellow-hover p-6"
                    disabled={selection.kids == 0 && selection.ladies == 0 && selection.men == 0}
                    onClick={() => router.push('/calendar')}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
