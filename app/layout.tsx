import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import { AuthProvider } from "@/src/components/auth/AuthProvider";
import { ReCaptchaProvider } from "@/src/components/auth/ReCaptchaProvider";
import {Toaster} from 'react-hot-toast'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Irvans | Full Stack Developer Portfolio",
  description: "Professional portfolio of Irvans - Experienced Full Stack Developer specializing in web development, React, TypeScript, and modern tech stacks. View my projects and skills.",
  metadataBase: new URL('https://irvans.my.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Irvans | Full Stack Developer Portfolio',
    description: 'Professional portfolio of Irvans - Experienced Full Stack Developer specializing in web development, React, TypeScript, and modern tech stacks.',
    url: 'https://irvans.my.id',
    siteName: 'Irvans Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irvans | Full Stack Developer Portfolio',
    description: 'Professional portfolio of Irvans - Experienced Full Stack Developer specializing in web development, React, TypeScript, and modern tech stacks.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_ID',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://irvans.my.id" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ReCaptchaProvider>
            <GoogleTagManager gtmId="G-QWFK1HLP35" />
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
