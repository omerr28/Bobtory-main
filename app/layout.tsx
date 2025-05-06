import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./provider";
import {Nunito} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

const MyAppFont=Nunito({subsets:['latin']});

export const metadata: Metadata = {
  title: "BoBtory - Çocuklarınız için Sihirli Hikayeler Oluşturur",
  description: "BoBtory: Hikayelerin Büyülü Dünyası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={MyAppFont.className}
      >
        <Provider>
          {children}
          <MobileNav />
          <Footer />
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
