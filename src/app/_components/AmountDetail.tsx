'use client'

import { useAtomValue } from "jotai/react"
import { selectionAtom } from "~/store"
import { PayPalButton } from "./PayPalButton"

export const AmountDetail = () => {

    const data = useAtomValue(selectionAtom)

    return (
        <div className="flex flex-col gap-4 text-yellow">
            <h1 className="text-4xl font-ibm">Rental overview</h1>
            <div className="flex flex-col gap-2 text-gray-500">
                <p className="flex gap-2">
                    <span>Start date:</span>
                    <span>{data.startDate}</span>
                </p>
                <p className="flex gap-2">
                    <span>End date:</span>
                    <span>{data.endDate}</span>
                </p>
                <p className="flex gap-2">
                    <span>Duration:</span>
                    <span>{data.duration} days</span>
                </p>
                <p className="flex gap-2">
                    <span>Pickup location:</span>
                    <span>{data.location == 1 ? 'Jetty' : 'Guesthouse'}</span>
                </p>
                <p className="flex gap-2">
                    <span>Gentlemen bikes:</span>
                    <span>{data.men}</span>
                </p>
                <p className="flex gap-2">
                    <span>Ladies bikes:</span>
                    <span>{data.ladies}</span>
                </p>
                <p className="flex gap-2">
                    <span>Kids bikes:</span>
                    <span>{data.kids}</span>
                </p>
                <p className="flex font-extrabold gap-2 border-y-2 py-3">
                    <span>Price:</span>
                    <span>{data.amount} €</span>
                </p>
                <PayPalButton />
            </div>
        </div>
    )
}