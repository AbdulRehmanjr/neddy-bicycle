/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCClientError } from "@trpc/client";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";
import axios, { AxiosError } from 'axios'




export async function POST(req: Request) {

    try {

        const { paypal, amount } = await req.json()
        console.log('========server==========')
        console.log(paypal)
        console.log('-------------')
        console.log(amount)

        const payPalInfo = await db.payPalInfo.findUniqueOrThrow({ where: { id: env.PAYPAL_SELLER_CUSTOM_ID } })

        const username = env.PAYPAL_CLIENT
        const password = env.PAYPAL_SECERT
        const BN_CODE = env.BN_CODE

        const base64Credentials: string = Buffer.from(`${username}:${password}`).toString('base64')
        const config = {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'PayPal-Partner-Attribution-Id': BN_CODE
            },
        }

        const responseType = 'grant_type=client_credentials'
        const tokenResponse = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, responseType, config)
        const accessToken: string = tokenResponse.data.access_token
        const paypalApiUrl = `${env.PAYPAL_API}/v2/checkout/orders`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'PayPal-Partner-Attribution-Id': BN_CODE
        }

        const totalPrice: number = amount
        const platformFee: number = totalPrice * 0.05
        const discount = 0
        const totalPayable: number = totalPrice - discount

        const paymentJson = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    reference_id: paypal,
                    description: "Neddy Bicycle booking",
                    amount: {
                        currency_code: 'EUR',
                        value: String(totalPayable),
                        breakdown: {
                            item_total: {
                                currency_code: "EUR",
                                value: String(totalPrice)
                            },
                            discount: {
                                currency_code: "EUR",
                                value: String(discount)
                            }
                        }
                    },
                    items: [{
                        name: 'Neddy Bike Booking',
                        unit_amount: {
                            currency_code: 'EUR',
                            value: +totalPrice.toFixed(2),
                        },
                        quantity: "1",
                        description: "Some Description related to booking.",
                        sku: "R21NM1M!",
                        category: 'PHYSICAL_GOODS',
                    }],
                    payee: {
                        merchant_id: payPalInfo.merchantId
                    },
                    payment_instruction: {
                        disbursement_mode: 'INSTANT',
                        platform_fees: [
                            {
                                amount: {
                                    currency_code: 'EUR',
                                    value: platformFee.toFixed(2),
                                },
                                payee: {
                                    merchant_id: env.PAYPAL_ID
                                },
                            },
                        ],
                    },
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
            },
        }

        const boatResponse = await axios.post(paypalApiUrl, paymentJson, { headers })
        return NextResponse.json(boatResponse.data)

    } catch (error) {
        if (error instanceof TRPCClientError) {
            console.error(error.message)
            throw new Error(error.message)
        }
        if (error instanceof AxiosError)
            console.log(error.response?.data)
        throw new Error("Something went wrong.")
    }

}