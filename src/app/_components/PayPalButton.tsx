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
import axios, { AxiosError } from "axios"
import { useToast } from "~/components/ui/use-toast"


export const PayPalButton = () => {

    const router = useRouter()
    const bookingData = useAtomValue(selectionAtom)
    const paypalId = useAtomValue(bookingId)
    const { toast } = useToast()

    const [isDisabled, setDisabled] = useAtom(triggerAtom)
    const [isReady, setIsReady] = useState(false)

    const emailSender = api.email.buyerMail.useMutation()
    const sellerEmail = api.email.sellerMail.useMutation()

    useEffect(() => {
        if (bookingData.amount && paypalId != '')
            setIsReady(() => true)
    }, [bookingData, paypalId])

    const createOrder = async (_data: CreateOrderData) => {

        try {
            const paypal = paypalId
            const amount = bookingData.amount

            const response = await axios.post('/api/order', { paypal: paypal, amount: amount })

            return response.data.id;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message)
                toast({
                    variant: 'destructive',
                    description: error.message ?? 'Error'
                })
            }
            else{
                toast({
                    variant: 'destructive',
                    description:'Something went wrong'
                })
            }
            
        }
    }

    const approveOrder = async (data: OnApproveData): Promise<void> => {

        try {

            await axios.post('/api/order/capture', { orderId: data.orderID, bookingData: bookingData })

            const emailObject = {
                firstName: bookingData.firstName,
                lastName: bookingData.lastName,
                email: bookingData.email,
                phone: bookingData.phone,
                men: bookingData.men,
                ladies: bookingData.ladies,
                kids: bookingData.kids,
                amount: bookingData.amount,
                duration: bookingData.duration,
                startDate: bookingData.startDate ?? '',
                endDate: bookingData.endDate ?? '',
                orderId: data.orderID,
                paymentId: data.payerID ?? '',
                additional: bookingData.additional ?? '',
                info: bookingData.info ?? '',
                guesthouse: bookingData.guesthouse ?? '',
                arrivalTime: bookingData.arrivalTime ?? '',
                pickup: bookingData.location == 1 ? 'Jetty' : 'Guesthouse'
            }

            emailSender.mutate(emailObject)
            sellerEmail.mutate(emailObject)
            clearLocalStorage()
            setDisabled(true)
            router.push('/success')
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.message)
                toast({
                    variant: 'destructive',
                    description: error.message ?? 'Error'
                })
            }
            else{
                toast({
                    variant: 'destructive',
                    description:'Something went wrong'
                })
            }
        }
    }

    const cancelOrder = (_data: Record<string, unknown>): void => {
        return
    }
    return (
        <PayPalButtons
            disabled={isDisabled || !isReady}
            createOrder={(data, _action) => createOrder(data)}
            onApprove={(data, _actions) => approveOrder(data)}
            onCancel={(data, _action) => cancelOrder(data)}
        />
    )
}
