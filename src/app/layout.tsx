import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { type Metadata } from "next";
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Xanflis Template",
  description: "build on top of 3T",
  icons: [{ rel: "icon", url: "/savepoint.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${nunito.variable}`}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            nunito.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
