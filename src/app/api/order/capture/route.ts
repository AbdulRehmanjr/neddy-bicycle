/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCClientError } from "@trpc/client";
import axios from "axios";
import { env } from "~/env";

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const orderId = body.orderId

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
        };
        const responseType = 'grant_type=client_credentials';
        const tokenResponse = await axios.post(`${env.PAYPAL_API}/v1/oauth2/token`, responseType, config)
        const accessToken: string = tokenResponse.data.access_token;
        const paypalApiUrl = `${env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Paypal-Partner-Attribution-Id': env.BN_CODE
        }
        const response = await axios.post(paypalApiUrl, {}, { headers })
        const order = response.data
        return Response.json(order)
    } catch (error) {

        if (error instanceof TRPCClientError) {
            console.error(error.message)
            throw new Error(error.message)
        }
        throw new Error("Something went wrong")
    }

}