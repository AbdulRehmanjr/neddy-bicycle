import "~/styles/globals.css";

import { Header } from "~/app/_components/Header";
import { Libre_Franklin, IBM_Plex_Mono } from 'next/font/google'
import { Providers } from "./provider";
import { Footer } from "~/app/_components/Footer";

const libre = Libre_Franklin({
  subsets: ["latin"],
  weight: '600',
  variable: "--font-libre",
})

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: '400',
  variable: "--font-ibm",
})

export const metadata = {
  title: "Bicycle",
  description: "Nedy's bike rental for your tour to La Digue",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibm.variable} ${libre.variable} min-h-screen`}>
      <body className="grid grid-cols-12">
        <Providers>
            <Header />
            {children}
            <Footer/>
          </Providers>
      </body>
    </html>
  );
}
