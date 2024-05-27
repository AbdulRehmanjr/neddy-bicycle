/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'

import { useSetAtom } from "jotai"
import { Input } from "~/components/ui/input"
import { selectionAtom } from "~/store"
import { debounce } from 'lodash';
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export const GuesthouseInput = () => {

    const router = useRouter()
    const setSelection = useSetAtom(selectionAtom)

    const debouncedInputHandler = debounce((value) => {
        setSelection((prev) => ({ ...prev, guesthouse: value }))
    }, 500)

    return (
        <div className="flex flex-col items-center gap-4">
            <Input className="text-xl p-6 w-[20rem]" placeholder="Enter your guesthouse name" onChange={(e) => debouncedInputHandler(e.target.value)} />
            <Button className="bg-yellow hover:bg-yellow-hover w-fit" onClick={()=>router.push('arrivalInfo')}>
                Continue
            </Button>
        </div>
    )
}