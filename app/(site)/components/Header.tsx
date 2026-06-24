"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useSiteSettings, type NavItem } from '@/lib/site-settings-context';
import { usePublicUser } from '@/lib/public-user-context';

const locales = [
  { code: 'en', label: 'EN', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'id', label: 'ID', flag: 'https://flagcdn.com/w20/id.png' },
];

function getInitials(name?: string | null, email?: string) {
  const trimmedName = name?.trim();

  if (trimmedName) {
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '');
    const initials = letters.join('');

    if (initials) {
      return initials;
    }
  }

  const fallback = email?.trim()?.[0]?.toUpperCase();
  return fallback || 'U';
}

export default function Header({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const { email, isLoggedIn, name } = usePublicUser();

  const siteSettings = useSiteSettings();
  const headerSettings = siteSettings.header;
  const navMenus = headerSettings?.nav_items || [];
  const brandLine1 = headerSettings?.brand_line1 || 'Biodiversity';
  const brandLine2 = headerSettings?.brand_line2 || 'Science Forum';
  const userInitials = getInitials(name, email);

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

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangOpen(false);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/public/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setProfileOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Public logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
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
        <div className="relative" ref={langMenuRef}>
          <button
            type="button"
            className="flex items-center gap-[12px] rounded-full border border-[#265F44] bg-[rgba(255,255,255,0.75)] px-3 py-1.5 text-[15px] font-medium leading-[22px] text-text-green backdrop-blur-[12.5px]"
            onClick={() => {
              setProfileOpen(false);
              setLangOpen((current) => !current);
            }}
            aria-expanded={langOpen}
            aria-haspopup="menu"
          >
            <Image
              src={currentLocale.flag}
              alt={currentLocale.label}
              className="h-auto w-4.5 flex-shrink-0 rounded-[10px] sm:w-[22px]"
              width={22}
              height={17}
              priority
            />
            <span className="truncate">{currentLocale.label}</span>
            <span className="text-xs text-text-green">▼</span>
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-32 rounded-xl border border-[#D9DCE0] bg-white py-1 shadow-lg">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-[#E6E9D4] ${locale === loc.code ? 'font-bold text-[#265F44]' : 'text-[#325B53]'}`}
                  onClick={() => switchLanguage(loc.code)}
                >
                  <Image
                    src={loc.flag}
                    alt={loc.label}
                    width={20}
                    height={20}
                    className="h-auto w-5 rounded-[10px]"
                  />
                  {loc.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3E7D7] font-['inter'] text-sm font-semibold text-text-green transition-colors hover:bg-[#d5dbc8]"
              onClick={() => {
                setLangOpen(false);
                setProfileOpen((current) => !current);
              }}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label="Open profile menu"
            >
              {userInitials}
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-xl border border-[#D9DCE0] bg-white p-1 shadow-lg">
                <button
                  type="button"
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left font-['inter'] text-sm font-medium text-[#325B53] transition-colors hover:bg-[#E6E9D4] disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className={`flex items-center gap-2 font-['inter'] text-base font-medium ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}
          >
            <span>Login</span>
            <svg
              aria-hidden="true"
              className={isHome ? 'text-text-green' : 'text-text-white-broken'}
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.667 5L16.667 10M16.667 10L11.667 15M16.667 10H6.66699M6.66699 3.33333H5.33366C4.59604 3.33333 4.00033 3.92905 4.00033 4.66667V15.3333C4.00033 16.071 4.59604 16.6667 5.33366 16.6667H6.66699"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
