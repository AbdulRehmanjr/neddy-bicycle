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

export const ArrivalInfoInput = () => {

    const router = useRouter()
    const setSelection = useSetAtom(selectionAtom)

    const debouncedInputHandler = debounce((value) => {
        setSelection((prev) => ({ ...prev, arrivalTime: value }))
    }, 500)

    return (
        <div className="flex flex-col items-center gap-4">
            <Input type="time" className="block text-xl p-6"  onChange={(e) => debouncedInputHandler(e.target.value)} />
            <Button className="bg-yellow hover:bg-yellow-hover w-fit" onClick={()=>router.push('booking')}>
                Continue
            </Button>
        </div>
    )
}