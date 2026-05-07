"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useSiteSettings, type NavItem } from '@/lib/site-settings-context';

const locales = [
  { code: 'en', label: 'EN', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'id', label: 'ID', flag: 'https://flagcdn.com/w20/id.png' },
];

export default function Header({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const siteSettings = useSiteSettings();
  const headerSettings = siteSettings.header;
  const navMenus = headerSettings?.nav_items || [];
  const brandLine1 = headerSettings?.brand_line1 || 'Biodiversity';
  const brandLine2 = headerSettings?.brand_line2 || 'Science Forum';

  const hasSubmenu = (items?: { label: string; href: string }[] | null) =>
    Boolean(items?.length);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const switchLanguage = async (langCode: string) => {
    setLangOpen(false);
    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: langCode }),
    });
    router.refresh();
  };

  const handleMenuClick = (
    menu: NavItem,
    idx: number,
    isMobile = false
  ) => {
    if (!hasSubmenu(menu.sub_items)) {
      setOpenMenu(null);
      if (isMobile) {
        setMobileNavOpen(false);
      }
      router.push(menu.href);
      return;
    }

    setOpenMenu(openMenu === idx ? null : idx);
  };
  return (
    <header className={`${!isHome ? 'bg-background-base-dark' : ''} absolute top-0 z-20 mx-auto flex w-full items-center justify-between px-[20px] md:px-[40px] py-[11px]`}>
      <div className="flex gap-2 items-center min-w-[48px] md:min-w-[56px] lg:min-w-[73px]">
        <Image
          src="/bsf_logo.png"
          alt="BSF logo"
          width={73}
          height={73}
          style={{ width: "auto", height: "auto" }}
          priority
          className="w-12 h-12 md:w-[56px] md:h-[56px] lg:w-[73px] lg:h-[73px]"
        />
        <div className={`flex flex-col font-semibold text-xl leading-tight ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}>
          <p>{brandLine1}</p>
          <p>{brandLine2}</p>
        </div>
      </div>
      <nav className="font-['inter'] hidden min-[940px]:flex items-center gap-20 text-base font-medium ml-auto mr-10">
        <div className="relative">
          <Link className={isHome ? 'text-text-green' : 'text-text-white-broken'} href="/">
            Home
          </Link>
        </div>
        {navMenus.map((menu: NavItem, idx: number) => (
          <div key={menu.label} className="relative">
            <button
              className={`flex items-center gap-2 focus:outline-none cursor-pointer ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}
              onClick={() => handleMenuClick(menu, idx)}
              aria-expanded={hasSubmenu(menu.sub_items) ? openMenu === idx : undefined}
              aria-controls={hasSubmenu(menu.sub_items) ? `submenu-${idx}` : undefined}
            >
              {menu.label}
              {(menu.label === 'Events') &&               
                <Image
                  src="/dropdown.svg"
                  alt="Dropdown"
                  width={10}
                  height={10}
                  className={isHome ? "" : "brightness-0 invert"}
                />
              }

            </button>
            {hasSubmenu(menu.sub_items) && openMenu === idx && (
              <div
                id={`submenu-${idx}`}
                className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg z-50"
              >
                { menu.sub_items && 
                  <div className="py-2 bg-[#E6E9D4] rounded-lg">
                    {menu.sub_items?.map((item: { label: string; href: string }) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 bg-[#E6E9D4] text-sm text-[#325B53] hover:bg-[#C3C6AD] hover:font-bold"
                        onClick={() => setOpenMenu(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                }
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex min-[940px]:hidden items-center ml-auto mr-2">
        <button
          className="flex flex-col justify-center items-center w-10 h-10 rounded-md border border-[#C3D2C3] bg-white"
          aria-label="Open navigation menu"
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          <span className={`block w-6 h-0.5 bg-text-green mb-1 transition-all ${mobileNavOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-text-green mb-1 transition-all ${mobileNavOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-text-green transition-all ${mobileNavOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 min-[940px]:hidden" onClick={() => setMobileNavOpen(false)} />
      )}
      <nav className={`fixed top-0 left-0 z-50 h-full w-[80vw] max-w-xs bg-white shadow-xl p-6 flex flex-col gap-6 min-[940px]:hidden transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{transitionProperty:'transform'}}>
        <div className="flex items-center justify-between mb-8">
          <Image src="/bsf_logo.png" alt="BSF logo" width={48} height={48} style={{ width: '48px', height: '48px' }} />
          <button onClick={() => setMobileNavOpen(false)} aria-label="Close navigation menu" className="text-2xl font-bold">×</button>
        </div>
        <Link href="/" className="py-2 px-2 rounded text-[#265F44] font-semibold hover:bg-[#e4ebd8]" onClick={()=>setMobileNavOpen(false)}>Home</Link>
        {navMenus.map((menu: NavItem, idx: number) => (
          <div key={menu.label} className="flex flex-col">
            <button
              className="flex items-center justify-between py-2 px-2 rounded text-[#265F44] font-semibold hover:bg-[#e4ebd8] focus:outline-none"
              onClick={() => handleMenuClick(menu, idx, true)}
              aria-expanded={hasSubmenu(menu.sub_items) ? openMenu === idx : undefined}
              aria-controls={hasSubmenu(menu.sub_items) ? `mobile-submenu-${idx}` : undefined}
            >
              <span>{menu.label}</span>
              {hasSubmenu(menu.sub_items) ? <span className="text-xs">▼</span> : null}
            </button>
            {hasSubmenu(menu.sub_items) && openMenu === idx && (
              <div id={`mobile-submenu-${idx}`} className="flex flex-col ml-4 border-l border-[#E3E7D7] pl-3 mt-1">
                {menu.sub_items?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1 px-2 text-text-green hover:bg-[#E3E7D7] rounded"
                    onClick={()=>{setMobileNavOpen(false); setOpenMenu(null);}}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="relative flex items-center gap-3 flex-shrink-0 flex-grow-0">
        <button
          className="flex items-center gap-1 rounded-full border border-[#b7c5b3] bg-white px-3 py-1 text-xs font-semibold text-[#1f3b2c] min-w-0 max-w-[80px] md:max-w-[110px] overflow-x-auto truncate whitespace-nowrap"
          style={{ maxWidth: "110px" }}
          onClick={() => setLangOpen(!langOpen)}
        >
          <Image
            src={currentLocale.flag}
            alt={currentLocale.label}
            className="w-4 h-auto sm:w-5 flex-shrink-0"
            width={20}
            height={20}
            priority
          />
          <span className="xs:inline truncate">{currentLocale.label}</span>
          <span className="text-[10px] text-text-green sm:text-xs flex-shrink-0">▼</span>
        </button>

        {langOpen && (
          <div className="absolute right-0 top-full mt-2 w-32 rounded-md bg-white shadow-lg z-50">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-[#E6E9D4] ${locale === loc.code ? 'font-bold text-[#265F44]' : 'text-[#325B53]'}`}
                  onClick={() => switchLanguage(loc.code)}
                >
                  <Image
                    src={loc.flag}
                    alt={loc.label}
                    width={20}
                    height={20}
                    className="w-5 h-auto"
                  />
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
