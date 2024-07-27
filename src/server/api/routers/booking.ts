/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { randomUUID } from "crypto";
import { TRPCClientError } from "@trpc/client";


export const BookingRouter = createTRPCRouter({

    createBooking: publicProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string(),
            guesthouse: z.string(),
            arrivalTime: z.string(),
            amount: z.number(),
            startDate: z.string(),
            endDate: z.string(),
            duration: z.number(),
            men: z.number(),
            ladies: z.number(),
            kids: z.number(),
            pickup: z.number(),
            additional: z.string(),
            info: z.string(),
            paypalId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.bikeBookings.create({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                        email: input.email,
                        phone: input.phone,
                        guesthouse: input.guesthouse,
                        arrivalTime: input.arrivalTime,
                        amount: input.amount,
                        startDate: input.startDate,
                        endDate: input.endDate,
                        duration: input.duration,
                        men: input.men,
                        ladies: input.ladies,
                        kids: input.kids,
                        pickup: input.pickup,
                        addtional: input.additional,
                        info: input.info,
                        payPalId: input.paypalId
                    }
                })
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new Error(error.message)
                }
                console.error(error)
                throw new Error('Something went wrong ')
            }
        }),

    createPayPalBooking: publicProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const uuid = randomUUID().toString()
                const payPal = await ctx.db.payPalBoookingInfo.create({
                    data: {
                        captureId: uuid,
                        contactEmail: input.email,
                    }
                })
                return payPal.paypalBoookingId
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new Error(error.message)
                }
                console.log(error)
                throw new Error('Something went wrong')
            }
        }),

    deleteBooking: publicProcedure.input(z.object({ paypalId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.payPalBoookingInfo.delete({
                    where: {
                        paypalBoookingId: input.paypalId
                    }
                })
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new Error(error.message)
                }
                console.error(error)
                throw new Error('Something went wrong')
            }
        })
})