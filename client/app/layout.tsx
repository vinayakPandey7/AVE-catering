import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers/redux-provider";
import { LanguageProvider } from "@/lib/providers/language-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wholesale Grocery & Household Products | Your Business Partner",
  description: "Premium wholesale supplier of grocery and household products. Bulk orders, competitive prices, and reliable delivery for your business needs.",
  keywords: "wholesale grocery, bulk orders, household products, wholesale supplier, business supplies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
