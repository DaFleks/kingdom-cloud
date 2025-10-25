import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Toaster } from "sonner";

import Wallpaper from "@/components/Wallpaper";
import Container from "@/components/aetherium/Container";
import Navbar from "@/components/Navbar";

import Loading from "@/components/kingdom-cloud/Loading";

import { LoadingProvider } from "@/context/LoadingContext";

import "./globals.css";
import ModalProvider from "@/context/ModalContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export const metadata: Metadata = {
  title: "KINGDOM CLOUD - Game Manager",
  description: "Game management app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-black text-white relative !overflow-y-hidden flex flex-col`}>
        <Wallpaper />
        <LoadingProvider>
          <ModalProvider>
            <Navbar />
            <Container as="main" className="grow xl:ml-4 !overflow-y-auto flex flex-col p-4">
              {children}
            </Container>
          </ModalProvider>
          <Loading />
        </LoadingProvider>
      </body>
    </html>
  );
}
