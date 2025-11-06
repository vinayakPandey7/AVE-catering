'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers/redux-provider";
import { LanguageProvider } from "@/lib/providers/language-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import AuthInitializer from "@/lib/components/AuthInitializer";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Don't show Header/Footer for admin routes or auth pages
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname?.startsWith('/auth');
  const shouldShowLayout = !isAdminRoute && !isAuthRoute;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <LanguageProvider>
            <AuthInitializer />
            {shouldShowLayout && <Header />}
            {children}
            {shouldShowLayout && <Footer />}
            <Toaster position="top-right" richColors />
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
