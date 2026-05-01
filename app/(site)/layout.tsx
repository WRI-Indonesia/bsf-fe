import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";
import { cookies } from 'next/headers';

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ASEAN Biodiversity Science Forum",
  description: "ASEAN Biodiversity Science Forum",
  icons: {
    icon: "/bsf_logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  return (
    <html
      lang={locale}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}