import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../payload.config';
import { SiteSettingsProvider } from '../../lib/site-settings-context';

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ASEAN Biodiversity Science Forum",
  description: "ASEAN Biodiversity Science Forum",
  icons: {
    icon: "/bsf_logo.png",
  },
};

async function getSiteSettings(locale: string) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'site_settings',
      locale: locale as 'en' | 'id',
    });
    return result;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const siteSettings = await getSiteSettings(locale);

  return (
    <html
      lang={locale}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <SiteSettingsProvider settings={siteSettings as unknown as Record<string, unknown> | null}>
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}