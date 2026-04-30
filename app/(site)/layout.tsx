import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ASEAN Biodiversity Science Forum",
  description: "ASEAN Biodiversity Science Forum",
  icons: {
    icon: "/bsf_logo.png",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
