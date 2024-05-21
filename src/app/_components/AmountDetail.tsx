'use client'

import { useAtomValue } from "jotai/react"
import { selectionAtom } from "~/store"

export const AmountDetail = () => {

    const data = useAtomValue(selectionAtom)

    return (
        <div className="flex flex-col gap-4 text-yellow">
            <h1 className="text-4xl font-extrabold font-libre">Rental overview</h1>
            <div className="flex flex-col gap-2 text-mid-blue">
                <p className="flex gap-2">
                    <span className="font-extrabold">Start date:</span>
                    <span>{data.startDate}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">End date:</span>
                    <span>{data.endDate}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Duration:</span>
                    <span>{data.duration}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Pickup location:</span>
                    <span>{data.location == 1 ? 'Jetty':'Guesthouse'}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Gentlemen bikes:</span>
                    <span>{data.men}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Ladies bikes:</span>
                    <span>{data.ladies}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Kids bikes:</span>
                    <span>{data.kids}</span>
                </p>
                <p className="flex gap-2">
                    <span className="font-extrabold">Price:</span>
                    <span>{data.amount} €</span>
                </p>
            </div>
        </div>
    )
}