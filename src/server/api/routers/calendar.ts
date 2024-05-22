/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createTRPCRouter, publicProcedure } from "../trpc";
import z from 'zod'
import { GaxiosError } from "gaxios";
import { cookies } from "next/headers";
import { authClient } from "~/server/config/oauthClient";
import { TRPCClientError } from "@trpc/client";

export const CalendarRouter = createTRPCRouter({

    googleOAuth: publicProcedure
        .query(() => {
            const scope = ['https://www.googleapis.com/auth/calendar']
            const url = authClient.generateAuthUrl({
                access_type: "offline",
                scope: scope
            })
            return url
        }),
    getUserInfo: publicProcedure
        .input(z.object({ cookie: z.string() }))
        .query(async ({ ctx, input }): Promise<GoogleTokenProps | null> => {
            try {
                const response = await authClient.getToken(input.cookie)
                authClient.setCredentials(response.tokens)

                const googleTokens: GoogleTokenProps = {
                    cg_access_token: response.tokens.access_token ?? "",
                    cg_refresh_token: response.tokens.refresh_token ?? "",
                    cg_scope: response.tokens.scope ?? "",
                    cg_token_type: response.tokens.token_type ?? "",
                    cg_expiry_date: response.tokens.expiry_date ?? 0,
                }

                await ctx.db.calendars.create({
                    data: {
                        refreshToken: googleTokens.cg_refresh_token,
                        platform: "Neddy"
                    }
                })
                return googleTokens
            } catch (error) {
                if (error instanceof GaxiosError) {
                    console.log(error.message)
                    throw new Error(error.message)
                }
                else if (error instanceof TRPCClientError) {
                    console.log(error.message)
                    throw new Error(error.message)
                }
                console.log(error)
                throw new Error('Something went wrong.')
            }
        }),
    getInfoFromRefreshToken: publicProcedure
        .query(async () => {
            try {

                const refreshToken = cookies().get('cg_refresh_token')?.value
                if (!refreshToken) return
                authClient.setCredentials({
                    refresh_token: refreshToken
                })
                const response = await authClient.getAccessToken()

                const googleTokens: GoogleTokenProps = {
                    cg_access_token: response.res?.data.access_token ?? "",
                    cg_refresh_token: response.res?.data.refresh_token ?? "",
                    cg_scope: response.res?.data.scope ?? "",
                    cg_token_type: response.res?.data.token_type ?? "",
                    cg_expiry_date: response.res?.data.expiry_date ?? 0,
                }
                const entries = Object.entries(googleTokens)
                for (const [key, value] of entries) {
                    if (key != 'cg_expiry_date') {
                        cookies().set(key, value.toString(), {
                            secure: true,
                            httpOnly: true,
                            domain: 'localhost',
                            path: '/',
                            priority: 'medium',
                            expires: key != 'cg_refresh_token' ? +googleTokens.cg_expiry_date : new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
                        })
                    }

                }
            } catch (error) {
                if (error instanceof GaxiosError) {
                    console.log(error.message)
                    throw new Error(error.message)
                }
                else if (error instanceof TRPCClientError) {
                    console.log(error.message)
                    throw new Error(error.message)
                }
                console.log(error)
                throw new Error('Something went wrong.')
            }
        })
})