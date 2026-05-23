import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Promptops AI Dashboard",
  description: "AI-powered workflow operations and automation dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AppShell>{children}</AppShell>
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "rounded-xl border border-border bg-card text-foreground shadow-lg",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
