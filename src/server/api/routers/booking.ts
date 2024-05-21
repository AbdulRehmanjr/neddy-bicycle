/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { randomUUID } from "crypto";
import { TRPCClientError } from "@trpc/client";






export const BookingRouter = createTRPCRouter({

    create: publicProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string(),
            address: z.string(),
            amount: z.number(),
            startDate: z.string(),
            endDate: z.string(),
            duration: z.number(),
            men: z.number(),
            ladies: z.number(),
            kids: z.number(),
            pickup: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const uuid = randomUUID().toString()
                const payPalBoookingInfo = await ctx.db.payPalBoookingInfo.create({
                    data: {
                        captureId: uuid,
                        contactEmail: input.email,
                    }
                })

            await ctx.db.bikeBookings.create({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                        email: input.email,
                        phone: input.phone,
                        address: input.address,
                        amount: input.amount,
                        startDate: input.startDate,
                        endDate: input.endDate,
                        duration: input.duration,
                        men: input.men,
                        ladies: input.ladies,
                        kids: input.kids,
                        pickup: input.pickup,
                        payPalId:payPalBoookingInfo.paypalBoookingId
                    }
                })
            } catch (error) {

                if(error instanceof TRPCClientError){
                    console.error(error.message)
                    throw new Error(error.message)
                }
                console.error(error)
                throw new Error('Something went wrong ')
            }
        })
})