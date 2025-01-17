import { ThemeProvider } from "@/components/theme-provider"
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader';

import Script from "next/script"

import {cn} from "@/lib/utils"

const fontSans = FontSans(
  { subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
  title: "NITH HOSTEL OUTPASS SYSTEM",
  description: "NITH HOSTEL OUTPASS SYSTEM",
};


export default function RootLayout({children,}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={cn("min-h-screen font-sans antialiased overflow-x-hidden",fontSans.variable)}>
          <NextTopLoader showSpinner={false} color="#7d8faa" />
          <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem 
          >
              {children}
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}

