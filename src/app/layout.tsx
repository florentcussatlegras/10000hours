import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/app/providers';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ten Thousands Hours App',
  description: 'Handle you studies perfectly'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter} antialiased`}
      >
        <Providers>
          <Header />
          <div className="container mx-auto p-12">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
