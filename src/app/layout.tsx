import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutHeader } from "./(components)/layout-header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Xanflis Template",
  description: "build on top of 3T",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-row">
              <aside className="w-48 bg-secondary">
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/"
                        className="block rounded px-4 py-2 hover:bg-primary/10"
                      >
                        Home
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>
              <div className="flex-1">
                <LayoutHeader />
                {children}
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
