/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCClientError } from "@trpc/client";
import axios, { AxiosError } from "axios";
import { env } from "~/env";
import { calendar } from "~/server/config/calendar";
import { authClient } from "~/server/config/oauthClient";
import { db } from "~/server/db";

import { api } from "~/trpc/server";

export async function POST(req: Request) {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { orderId, paypalId,bookingData, }: { orderId: string, paypalId:string,bookingData: SelectionProps } = await req.json()

        const username = env.PAYPAL_CLIENT
        const password = env.PAYPAL_SECERT
        const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
        const config = {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Paypal-Partner-Attribution-Id': 'KOLIBRI_SP_PPCP'
            },
        }

        const responseType = 'grant_type=client_credentials';
        const tokenResponse = await axios.post(`${env.PAYPAL_API}/v1/oauth2/token`, responseType, config)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const accessToken: string = tokenResponse.data.access_token;
        const paypalApiUrl = `${env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Paypal-Partner-Attribution-Id': env.BN_CODE
        }
        const response = await axios.post(paypalApiUrl, {}, { headers })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const order = response.data

        await api.booking.createBooking({
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
            email: bookingData.email,
            phone: bookingData.phone,
            amount: bookingData.amount,
            men: bookingData.men,
            ladies: bookingData.ladies,
            kids: bookingData.kids,
            duration: bookingData.duration,
            startDate: bookingData.startDate ?? 'none',
            endDate: bookingData.endDate ?? 'none',
            pickup: bookingData.location ?? 0,
            guesthouse: bookingData.guesthouse ?? 'none',
            arrivalTime: bookingData.arrivalTime ?? 'none',
            additional: bookingData.additional ?? 'none',
            info: bookingData.info ?? 'none',
            paypalId:paypalId
        })

        const googleToken = await db.calendars.findFirstOrThrow({ where: { platform: 'Neddy' } })
        authClient.setCredentials({ refresh_token: googleToken?.refreshToken })

        await calendar.events.insert({
            calendarId: 'primary',
            auth: authClient,
            requestBody: {
                summary: `${bookingData.firstName} ${bookingData.lastName}`,
                description: `\nOrder Id: ${orderId}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\nGuesthouse: ${bookingData.guesthouse}\nArrivalTime: ${bookingData.arrivalTime}\nPickup: ${bookingData.location == 1 ? 'Jetty' : 'Guesthouse'}\nPrice: ${bookingData.amount} € \nMen: ${bookingData.men}\nLadies: ${bookingData.ladies}\nKids: ${bookingData.kids}\nDuration: ${bookingData.duration} days\nAdditional information: ${bookingData.additional}`,
                start: {
                    dateTime: new Date(bookingData.startDate ?? "").toISOString(),
                    timeZone: "Asia/Dubai"
                },
                end: {
                    dateTime: new Date(bookingData.endDate ?? "").toISOString(),
                    timeZone: "Asia/Dubai"
                }
            }
        });
        return Response.json(order)
    } catch (error) {

        if (error instanceof TRPCClientError) {
            console.error(error.message)
            throw new AxiosError(error.message)
        }
        else if (error instanceof AxiosError) {
            const err: string = error.response?.data.message
            console.log(err)
            throw new AxiosError(err)
        }
    }

}