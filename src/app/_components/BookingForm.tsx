'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { api } from "~/trpc/react"
import { useAtom, useSetAtom } from "jotai/react"
import { bookingId, selectionAtom, triggerAtom } from "~/store"
import { Textarea } from "~/components/ui/textarea"

const formSchema = z.object({
    firstName: z.string({ required_error: 'Field is required.' }),
    lastName: z.string({ required_error: 'Field is required.' }),
    email: z.string({ required_error: 'Field is required.' }).email({ message: "Invalid email address" }),
    phone: z.string({ required_error: 'Field is required.' }),
    additional :z.string({ required_error: 'Field is required.' }),
    info:z.string({ required_error: 'Field is required.' })
})

export const BookingForm = () => {

    const [bookingData, setBookingData] = useAtom(selectionAtom)
    const setTrigger = useSetAtom(triggerAtom)
    const setBookingId = useSetAtom(bookingId)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const createOrder = api.booking.create.useMutation({
        onSuccess: (data: string) => {
            setTrigger(false)
            form.reset()
            setBookingId(() => data)
        }
    })


    const formSubmitted = (data: z.infer<typeof formSchema>) => {
        setBookingData((prev) => (
            {
                ...prev,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            }
        ))
        createOrder.mutate({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            amount: bookingData.amount,
            men: bookingData.men,
            ladies: bookingData.ladies,
            kids: bookingData.kids,
            duration: bookingData.duration,
            startDate: bookingData.startDate ?? '',
            endDate: bookingData.endDate ?? '',
            pickup: bookingData.location ?? 0,
            guesthouse: bookingData.guesthouse ?? '',
            arrivalTime: bookingData.arrivalTime ?? '',
            additional:data.additional,
            info:data.info,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmitted)} className={`grid grid-cols-2 gap-3  text-mid-blue `}>
                <h1 className="col-span-2 text-4xl font-idm text-yellow">Personal Information</h1>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the first name" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the last name" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the email" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Phone no.</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the phone no." {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="info"
                    render={({ field }) => (
                        <FormItem className="col-span-2 ">
                            <FormLabel>How did you get to know us?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="how did you get to know us?" {...field} value={field.value ?? ''}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="additional"
                    render={({ field }) => (
                        <FormItem className="col-span-2 ">
                            <FormLabel>Additional information</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write additional information" {...field} value={field.value ?? ''}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-2 flex justify-center">
                    <Button type="submit" className="bg-yellow hover:bg-yellow-hover" disabled={createOrder.isPending}>
                        {createOrder.isPending ? 'Processing...' : 'Continue'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}