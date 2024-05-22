
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */


import { TRPCClientError } from "@trpc/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Transporter, createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type Mail from "nodemailer/lib/mailer";
import path from "path";
import { env } from "~/env";
import { cwd } from "process";

export const EmailRouter = createTRPCRouter({
    buyerMail: publicProcedure
        .input(z.object({
            orderId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string(),
            men: z.number(),
            ladies: z.number(),
            kids: z.number(),
            amount: z.number(),
            duration: z.number(),
        }))
        .mutation(async ({  input }) => {

            try {
                const sender = env.ZOHO_MAIL
                const password = env.ZOHO_PASSWORD
                const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
                    host: "smtp.zoho.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: sender,
                        pass: password,
                    },
                })
                const pdfFilePath = path.join(cwd(), 'public', 'Cancellation.pdf');
                const attachments: Mail.Attachment[] = [{
                    filename: 'Cancellation_Policy.pdf',
                    path: pdfFilePath
                }]

                const email: Mail.Options = {
                    from: `${sender}`,
                    to: `${input.email}`,
                    subject: "Hotel Mountain View Booking Confirmation",
                    html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1716368218/logo_e4lgrd.png"
                                alt="Neddy's Bicycle" style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear ${input.firstName.trim()},</p>
                            <p>Thank you for your booking. We are happy to host you for your stay on stay on La Digue:</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input.orderId}</span>
                            </p>
                            <p style="font-size:18px;">Your order details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full name: </span>
                                <span>${input.firstName} ${input.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Conatct no.: </span>
                                <span>${input.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Start date: </span>
                                <span>${input.startDate}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">End date: </span>
                                <span>${input.endDate}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Duration: </span>
                                <span>${input.duration}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Men bikes: </span>
                                <span>${input.men}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Women bikes: </span>
                                <span>${input.ladies}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Kids bikes: </span>
                                <span>${input.kids}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input.amount} €</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Team of Hotel Mountain View</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1716368218/logo_e4lgrd.png"
                                alt="Mountain View" style="width: 100px;">
                            <p>Hotel Mountain View</p>
                            <p>Grand Anse, La Digue</p>
                            <p>Seychelles</p>
                            <p>hotelmountainview7@gmail.com</p>
                            <p>+248 2 59 00 73</p>
                        </td>
                    </tr>
                </table>`,
                    attachments: attachments
                }
                await transporter.sendMail(email)
            } catch (error) {

                console.log(error)
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new Error(error.message)
                }
                throw new Error("Error")
            }
        }),
    testMail: publicProcedure
        .mutation(async () => {

            try {
                const sender = env.ZOHO_MAIL
                const password = env.ZOHO_PASSWORD
                const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
                    host: "smtp.zoho.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: sender,
                        pass: password,
                    },
                })
                const pdfFilePath = path.join(cwd(), 'public', 'Cancellation.pdf');
                const attachments: Mail.Attachment[] = [{
                    filename: 'Cancellation_Policy.pdf',
                    path: pdfFilePath
                }]

                const email: Mail.Options = {
                    from: `${sender}`,
                    to: `abdulrehman2020white@gmail.com`,
                    subject: "Hotel Mountain View Booking Confirmation",
                    html: `
                    Testing email send by sender ${sender}
                    `,
                    attachments: attachments
                }
                await transporter.sendMail(email)
            } catch (error) {

                console.log(error)
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new Error(error.message)
                }
                throw new Error("Error")
            }
        }),

})