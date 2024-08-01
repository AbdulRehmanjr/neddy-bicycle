
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Transporter, createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type Mail from "nodemailer/lib/mailer";
import path from "path";
import { env } from "~/env";
import { cwd } from "process";
import dayjs from "dayjs";

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
            guesthouse: z.string(),
            pickup: z.string(),
            arrivalTime: z.string(),
            paymentId: z.string(),
            additional: z.string(),
            info: z.string()
        }))
        .mutation(async ({ input }) => {

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
                    filename: `Cancellation Policy Nedy's Bicycle.pdf`,
                    path: pdfFilePath
                }]

                const email: Mail.Options = {
                    from: `${sender}`,
                    to: `${input.email}`,
                    subject: `${input.firstName} ${input.lastName} - booking received`,
                    html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style=" padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1716368218/logo_e4lgrd.png"
                                alt="Neddy's Bicycle" style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear ${input.firstName.trim()},</p>
                            <p>Thank you for your booking. We are happy to provide you bicycles for your stay on La Digue</p>
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
                                <span style="font-weight:bold;">Phone no.: </span>
                                <span>${input.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Start date: </span>
                                <span>${dayjs(input.startDate).format('DD-MM-YYYY')}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">End date: </span>
                                <span>${dayjs(input.endDate).format('DD-MM-YYYY')}</span>
                            </p>
                            <p>
                            <span style="font-weight:bold;">Pickup: </span>
                            <span>${input.pickup}</span>
                        </p>
                            <p>
                            <span style="font-weight:bold;">Guesthouse: </span>
                            <span>${input.guesthouse}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Arrival time: </span>
                            <span>${input.arrivalTime}</span>
                        </p>
                            <p>
                                <span style="font-weight:bold;">Duration: </span>
                                <span>${input.duration} days</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Gentlemen bicycles: </span>
                                <span>${input.men}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Ladies bicycles: </span>
                                <span>${input.ladies}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Kids bicycles: </span>
                                <span>${input.kids}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">How did you get to know us?: </span>
                                <span>${input.info}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Additional info: </span>
                                <span>${input.additional}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input.amount} €</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Payment: </span>
                                <span>Paid online</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            
                            <p style="font-weight:900;">How will you get your bicycles? </p>
                            <p>If you have chosen Jetty as a pickup location we will meet you at the arrival time you stated in the booking form.</p>
                                <p>If you have chosen Guesthouse as a pickup location we will bring you the bicycles to the guesthouse you stated in the booking form</p>
                                <p>You do not know your guesthouse and arrival time yet? Please contact us as soon as you know so that we can arrange everything on time.</p>
                            <p style="font-weight:900;">Please do not reply to this email</p>                            
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Nedy’s Bicycle Rental</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1716368218/logo_e4lgrd.png"
                                alt="Neddy Bicycle" style="width: 100px;">
                            <p>Nedy’s Bicycle Rental</p>
                            <p>La Passe, La Digue</p>
                            <p>Seychelles</p>
                            <p>rayenradegonde@gmail.com</p>
                            <p>+248 2 54 61 93</p>
                        </td>
                    </tr>
                </table>`,
                    attachments: attachments
                }
                await transporter.sendMail(email)
            } catch (error) {
                console.error(error)
                throw new Error("Something went wrong")
            }
        }),
    sellerMail: publicProcedure
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
            pickup: z.string(),
            arrivalTime: z.string(),
            guesthouse: z.string(),
            paymentId: z.string(),
            additional: z.string(),
            info: z.string()
        }))
        .mutation(async ({ input }) => {

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
                const email: Mail.Options = {
                    from: `${sender}`,
                    to: `${env.ZOHO_SENDER}`,
                    subject: `${input.firstName} ${input.lastName} - booking received`,
                    html: `  
                <table
                style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                <tr>
                <td style="padding: 15px; text-align: center;">
                    <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1716368218/logo_e4lgrd.png"
                        alt="Neddy's Bicycle" style="width: 100px;">
                </td>
            </tr>
                <tr>
                    <td style="padding: 10px;">
                        <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                        <p>Dear Nedy,</p>
                        <p>You have received a new bicycle rental booking:</p>
                        <p>
                            <span style="font-weight:bold;">Refund Id: </span>
                            <span>${input.paymentId}</span>
                        </p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                        <p style="margin-top:10px; margin-bottom:10px;">PERSONAL DATA</p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                        <p>
                            <span style="font-weight:bold;">Full name: </span>
                            <span>${input.firstName} ${input.lastName}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Email: </span>
                            <span>${input.email}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Phone no.: </span>
                            <span>${input.phone}</span>
                        </p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                        <p style="margin-top:10px; margin-bottom:10px;">BOOKING DETAIL</p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                           <p>
                                <span style="font-weight:bold;">Start date: </span>
                                <span>${dayjs(input.startDate).format('DD-MM-YYYY')}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">End date: </span>
                                <span>${dayjs(input.endDate).format('DD-MM-YYYY')}</span>
                            </p>
                        <p>
                            <span style="font-weight:bold;">Duration: </span>
                            <span>${input.duration} days</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Pickup: </span>
                            <span>${input.pickup}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Guesthouse: </span>
                            <span>${input.guesthouse}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">ArrivalTime: </span>
                            <span>${input.arrivalTime}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Gentlemen bicycles: </span>
                            <span>${input.men}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Ladies bicycles: </span>
                            <span>${input.ladies}</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Kids bicycles: </span>
                            <span>${input.kids}</span>
                        </p>
                        <p> 
                                <span style="font-weight:bold;">How did you get to know us?: </span>
                                <span>${input.info}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Additional info: </span>
                                <span>${input.additional}</span>
                            </p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                        <p style="margin-top:10px; margin-bottom:10px;">PAYMENT DETAILS</p>
                        <span style="display: block; width: 100%; height: 1px; background-color: #ddd;"></span>
                        <p>
                            <span style="font-weight:bold;">Total amount: </span>
                            <span>${input.amount} €</span>
                        </p>
                        <p>
                            <span style="font-weight:bold;">Paid: </span>
                            <span>PayPal</span>
                        </p>
                        <a href="https://www.paypal.com/mep/dashboard" style="font-style: italic;">PayPal Dashboard</a>
                    </td>
                </tr>
                </tr>
            </table>`,
                }
                await transporter.sendMail(email)
            } catch (error) {
                console.error(error)
                throw new Error("Something went wrong")
            }
        })

})