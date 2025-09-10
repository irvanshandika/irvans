import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import { AuthProvider } from "@/src/components/auth/AuthProvider";
import { ReCaptchaProvider } from "@/src/components/auth/ReCaptchaProvider";
import {Toaster} from 'react-hot-toast'

export const metadata: Metadata = {
  title: "Portfolio with Auth",
  description: "Portfolio with authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          <ReCaptchaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-right" />
              {children}
            </ThemeProvider>
          </ReCaptchaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
