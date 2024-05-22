'use client'

import { TRPCReactProvider } from "~/trpc/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from 'jotai';
import { env } from '~/env';

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <TRPCReactProvider>
            <PayPalScriptProvider options={{ currency: "EUR", clientId: env.NEXT_PUBLIC_PAYPAL, disableFunding: ['paylater'] }} >
                <Provider>
                    {children}
                </Provider>
            </PayPalScriptProvider>
        </TRPCReactProvider>
    )
}