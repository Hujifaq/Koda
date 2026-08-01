import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "devicon/devicon.min.css";
import { TransitionProvider } from "./providers/TransitionProvider";
import { LenisProvider } from "./providers/LenisProvider";
import { AuthProvider } from "./providers/SessionProvider";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koda",
  description:
    "Coding courses designed to empower individuals with the knowledge and skills needed to make informed decisions.",
  icons: {
    icon: "/singlelogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <AuthProvider>
            <TransitionProvider>{children}</TransitionProvider>
          </AuthProvider>
        </LenisProvider>
        
      </body>
    </html>
  );
}
