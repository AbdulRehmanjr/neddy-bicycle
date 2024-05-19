'use client'

import { useAtom } from "jotai/react"
import { Minus, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { selectionAtom } from "~/store"

export const BikeOptions = () => {

    const [selection, setSelection] = useAtom(selectionAtom)

    return (
        <div className="flex flex-col gap-12">
            <div className="flex justify-center items-center gap-14">
                <div className="flex flex-col gap-6">
                    <div className={`flex flex-col justify-center items-center gap-4 font-ibm bg-[url('/men.jpeg')] bg-cover text-yellow  hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => setSelection((prev) => ({ ...prev, option: 1 }))}>
                        <h2 className="font-extrabold text-4xl">Gentlemen bikes</h2>
                        <h3 className="font-extrabold text-2xl">150 €</h3>

                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button className="bg-yellow hover:bg-yellow" disabled={selection.men == 0} onClick={() => setSelection((prev) => ({ ...prev, mem: prev.men - 1 }))}>
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.men}</p>
                        <Button className="bg-yellow hover:bg-yellow" onClick={() => setSelection((prev) => ({
                            ...prev, men: prev.men + 1
                        }))}>
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className={`flex flex-col justify-center items-center gap-4 font-ibm bg-[url('/ladies.jpeg')] bg-cover text-yellow hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => {
                        setSelection((prev) => ({ ...prev, option: 2 }))
                    }}>
                        <h2 className="font-extrabold text-4xl">Ladies bikes</h2>
                        <h3 className="font-extrabold text-2xl">150 €</h3>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button className="bg-yellow hover:bg-yellow" disabled={selection.ladies == 0} onClick={() => setSelection((prev) => ({ ...prev, ladies: prev.ladies - 1 }))}>
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.ladies}</p>
                        <Button className="bg-yellow hover:bg-yellow" onClick={() => setSelection((prev) => ({
                            ...prev, ladies: prev.ladies + 1
                        }))}>
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className={`flex flex-col justify-center items-center gap-4 font-ibm  hover:bg-yellow hover:text-white hover:shadow-2xl cursor-pointer border-2 border-yellow rounded-lg w-[25rem] h-[25rem]`} onClick={() => {
                        setSelection((prev) => ({ ...prev, option: 3 }))
                    }}>
                        <h2 className="font-extrabold text-4xl">Kids bikes</h2>
                        <h3 className="font-extrabold text-2xl">150 €</h3>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <Button className="bg-yellow hover:bg-yellow" disabled={selection.kids == 0} onClick={() => setSelection((prev) => ({ ...prev, kids: prev.kids - 1 }))}>
                            <Minus />
                        </Button>
                        <p className="text-xl">{selection.kids}</p>
                        <Button className="bg-yellow hover:bg-yellow" onClick={() => setSelection((prev) => ({
                            ...prev, kids: prev.kids + 1
                        }))}>
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center ">
                <Button className="bg-yellow hover:bg-yellow">
                    Continue
                </Button>
            </div>
        </div>
    )
}
