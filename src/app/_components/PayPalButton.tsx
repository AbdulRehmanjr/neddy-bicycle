/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'

import { PayPalButtons } from "@paypal/react-paypal-js"
import { useAtom, useAtomValue } from "jotai"
import { type OnApproveData, type CreateOrderData } from "@paypal/paypal-js"
import { useRouter } from "next/navigation"
import { bookingId, selectionAtom, triggerAtom } from "~/store"
import { useEffect, useState } from "react"
import { clearLocalStorage } from "~/utils"
import { api } from "~/trpc/react"

export const PayPalButton = () => {

    const router = useRouter()
    const bookingData = useAtomValue(selectionAtom)
    const paypalId = useAtomValue(bookingId)

    const [isDisabled, setDisabled] = useAtom(triggerAtom)
    const [isReady, setIsReady] = useState(false)

    const emailSender = api.email.buyerMail.useMutation()


    useEffect(() => {

        if (bookingData && paypalId) 
            setIsReady(true)

    }, [bookingData, paypalId])

    if (!isReady)
        return null


    const createOrder = async (_data: CreateOrderData) => {

        const paypal = paypalId
        const amount = bookingData.amount

        const requestBody = {
            paypal: paypal,
            amount: amount,
        }

        const response: Response = await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
        const order = await response.json()

        return order.id;
    }

    const approveOrder = async (data: OnApproveData): Promise<void> => {

        clearLocalStorage()
        setDisabled(true)

        router.push('/success')

        emailSender.mutate({
            firstName:bookingData.firstName,
            lastName:bookingData.lastName,
            email:bookingData.email,
            phone:bookingData.phone,
            men:bookingData.men,
            ladies:bookingData.ladies,
            kids:bookingData.kids,
            amount:bookingData.amount,
            duration:bookingData.duration,
            startDate:bookingData.startDate ?? '',
            endDate:bookingData.endDate??'',
            orderId:data.orderID,
        })
        
        await fetch("/api/order/capture", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: data.orderID,
                bookingData : bookingData
            })
        })
    }

    const cancelOrder = (_data:Record<string,unknown>): void => {
        return 
    }

    return (
        <PayPalButtons
            disabled={isDisabled}
            createOrder={(data, _action) => createOrder(data)}
            onApprove={(data, _actions) => approveOrder(data)}
            onCancel={(data, _action) => cancelOrder(data)}
        />
    )
}
