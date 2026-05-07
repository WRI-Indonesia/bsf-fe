'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type NavItem = {
  id?: string | null;
  label: string;
  href: string;
  sub_items?:
    | {
        id?: string | null;
        label: string;
        href: string;
      }[]
    | null;
};

export type FooterNavItem = {
  id?: string | null;
  label: string;
  href: string;
  is_heading?: boolean | null;
};

export type FooterColumn = {
  id?: string | null;
  items?:
    | FooterNavItem[]
    | null;
};

export type LegalLink = {
  id?: string | null;
  label: string;
  href: string;
};

export type SiteSettings = {
  header?: {
    brand_line1?: string | null;
    brand_line2?: string | null;
    nav_items?: NavItem[] | null;
  };
  footer?: {
    brand_line1?: string | null;
    brand_line2?: string | null;
    brand_line3?: string | null;
    description?: string | null;
    nav_columns?: FooterColumn[] | null;
    copyright_text?: string | null;
    legal_links?: LegalLink[] | null;
  };
};

function buildSettings(cmsData: Record<string, unknown> | null): SiteSettings {
  const header = cmsData?.header as Record<string, unknown> | undefined;
  const footer = cmsData?.footer as Record<string, unknown> | undefined;

  return {
    header: {
      brand_line1: 'Biodiversity',
      brand_line2: 'Science Forum',
      nav_items: [
        { label: (header?.about_label as string) || 'About', href: '/about' },
        {
          label: (header?.events_label as string) || 'Events',
          href: '/events',
          sub_items: [
            { label: (header?.events_upcoming_label as string) || 'Upcoming forum', href: '/events#upcoming_forum' },
            { label: (header?.events_past_label as string) || 'Past Events', href: '/events/past_events' },
          ],
        },
        { label: (header?.publications_label as string) || 'Publications', href: '/publications' },
        { label: (header?.media_label as string) || 'Media', href: '/media' },
      ],
    },
    footer: {
      brand_line1: 'Biodiversity',
      brand_line2: 'Science',
      brand_line3: 'Forum',
      description:
        (footer?.description as string) || 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region',
      nav_columns: [
        {
          items: [
            { label: (footer?.home_label as string) || 'Home', href: '/', is_heading: true },
            { label: (footer?.about_label as string) || 'About', href: '/about', is_heading: true },
          ],
        },
        {
          items: [
            { label: (footer?.events_label as string) || 'Events', href: '/events', is_heading: true },
            { label: (footer?.upcoming_label as string) || 'Upcoming Forum', href: '/events#upcoming_forum', is_heading: false },
            { label: (footer?.past_label as string) || 'Past Events', href: '/events#past_events', is_heading: false },
          ],
        },
        {
          items: [
            { label: (footer?.publications_label as string) || 'Publications', href: '/publications', is_heading: true },
          ],
        },
        {
          items: [
            { label: (footer?.media_label as string) || 'Media', href: '/media', is_heading: true },
            { label: (footer?.press_label as string) || 'Press Release', href: '/media/press', is_heading: false },
            { label: (footer?.media_kit_label as string) || 'Media Kit', href: '/media/kit', is_heading: false },
          ],
        },
      ],
      copyright_text: (footer?.copyright_text as string) || '© 2026 Biodiversity Science Forum. All rights reserved.',
      legal_links: [
        { label: (footer?.privacy_label as string) || 'Privacy Policy', href: '/privacy' },
        { label: (footer?.terms_label as string) || 'Terms of Use', href: '/terms' },
      ],
    },
  };
}

const defaultSettings: SiteSettings = buildSettings(null);

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: Record<string, unknown> | null;
  children: ReactNode;
}) {
  const built = buildSettings(settings);
  return (
    <SiteSettingsContext.Provider value={built}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
