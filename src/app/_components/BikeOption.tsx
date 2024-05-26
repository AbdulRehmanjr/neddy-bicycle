'use client'

import { useAtom } from "jotai/react"
import { Minus, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { selectionAtom } from "~/store"
import Image from "next/image"

export const BikeOptions = () => {

    const [selection, setSelection] = useAtom(selectionAtom)

    return (
        <div className="flex flex-col gap-12 font-ibm ">
            <div className="flex justify-center items-center gap-14">
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[30rem] h-[25rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/men.jpeg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-4xl">Gentlemen bikes</h2>
                            <h3 className="text-2xl">150 SCR</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.men == 0}
                            onClick={() => setSelection((prev) => ({ ...prev, men: prev.men - 1 }))}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.men}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection((prev) => ({ ...prev, men: prev.men + 1 }))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[30rem] h-[25rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/ladies.jpeg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-4xl">Ladies bikes</h2>
                            <h3 className="text-2xl">150 SCR</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.ladies == 0}
                            onClick={() => setSelection((prev) => ({ ...prev, ladies: prev.ladies - 1 }))}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.ladies}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection((prev) => ({ ...prev, ladies: prev.ladies + 1 }))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 hover:cursor-pointer">
                    <div className="relative bg-white text-white rounded-md w-[30rem] h-[25rem] " >
                        <Image width={1080} height={810} className="w-full h-full rounded-md brightness-75" src="/ladies.jpeg" alt="bike image" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-4xl">Kids bikes</h2>
                            <h3 className="text-2xl">150 SCR</h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            disabled={selection.kids == 0}
                            onClick={() => setSelection((prev) => ({ ...prev, kids: prev.kids - 1 }))}
                        >
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.kids}</p>
                        <Button
                            className="bg-yellow hover:bg-yellow-hover"
                            onClick={() => setSelection((prev) => ({ ...prev, kids: prev.kids + 1 }))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mb-40">
                <Button
                    className="bg-yellow hover:bg-yellow-hover-hover p-6"
                    disabled={selection.kids == 0 && selection.ladies == 0 && selection.men == 0}
                    asChild>
                    <Link href={'/calendar'}>Continue</Link>
                </Button>
            </div>
        </div>
    )
}
