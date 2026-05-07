"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from '@/lib/site-settings-context';

export default function Footer() {
  const siteSettings = useSiteSettings();
  const footer = siteSettings.footer;

  const brandLine1 = footer?.brand_line1 || 'Biodiversity';
  const brandLine2 = footer?.brand_line2 || 'Science';
  const brandLine3 = footer?.brand_line3 || 'Forum';
  const description = footer?.description || 'The Biodiversity Science Forum brings together researches, practitioners, institutions, and decision-makers to strengthen dialogue, biodiversity conservation across the ASEAN region';
  const navColumns = footer?.nav_columns || [];
  const copyrightText = footer?.copyright_text || '© 2026 Biodiversity Science Forum. All rights reserved.';
  const legalLinks = footer?.legal_links || [];

  return (
    <footer className="bg-background-base-dark px-5 py-16 sm:px-8 lg:px-20 lg:py-30 text-text-lime-light">
      <div className="flex flex-col gap-12 xl:flex-row xl:justify-between xl:gap-20">
        <div className="w-full xl:max-w-[360px]">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-[72px] w-[72px] shrink-0 sm:h-[90px] sm:w-[90px] lg:h-[108px] lg:w-[108px]">
              <Image
                src="/bsf_logo.png"
                alt="BSF logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-[160px] text-[1.5rem] leading-[0.92] text-[#f2f4ef] sm:max-w-[180px] sm:text-[2rem] lg:text-[2.7rem]">
              {brandLine1}
              <br />
              {brandLine2}
              <br />
              {brandLine3}
            </p>
          </div>
          <p className="mt-6 max-w-[340px] font-['inter'] text-sm leading-[1.35] text-[#5f6f66] sm:mt-8 sm:text-base sm:leading-[1.2]">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:grid-cols-4 xl:flex xl:flex-row xl:gap-20">
          {navColumns.map((col, colIdx) => (
            <div key={col.id || colIdx} className="flex min-w-0 flex-col gap-4 sm:gap-11">
              {col.items?.map((item, itemIdx) => {
                if (item.is_heading) {
                  return (
                    <Link
                      key={item.id || itemIdx}
                      href={item.href}
                      className="font-['inter'] text-lg font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f] sm:text-xl"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.id || itemIdx}
                    href={item.href}
                    className="block font-['inter'] text-sm text-[#d8ddd4] hover:text-white sm:text-base lg:text-xl"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-white/15 pt-6 text-xs text-[#5f6f66] sm:mt-16 sm:pt-8 sm:text-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>{copyrightText}</p>
          <div className="flex gap-6 md:justify-end sm:gap-8">
            {legalLinks.map((link, i) => (
              <Link key={link.id || i} href={link.href} className="hover:text-[#7f8f86]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
