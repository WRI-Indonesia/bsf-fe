"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

const navMenus = [
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Events",
    href: "/events",
    submenu: [
      { label: "Upcoming forum", href: "/events#upcoming_forum" },
      { label: "Past Events", href: "/events/past_events" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
  },
  {
    label: "Media",
    href: "/media",
    submenu: [
      { label: "Press Releases", href: "/media#press" },
      { label: "Media Kit", href: "/media/kit" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hasSubmenu = (submenu?: { label: string; href: string }[]) => Boolean(submenu?.length);
  const handleMenuClick = (
    menu: { href: string; submenu?: { label: string; href: string }[] },
    idx: number,
    isMobile = false
  ) => {
    if (!hasSubmenu(menu.submenu)) {
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
          <p>Biodiversity</p>
          <p>Science Forum</p>
        </div>
      </div>
      <nav className="font-['inter'] hidden min-[940px]:flex items-center gap-20 text-base font-medium ml-auto mr-10">
        <div className="relative">
          <Link className={isHome ? 'text-text-green' : 'text-text-white-broken'} href="/">
            Home
          </Link>
        </div>
        {navMenus.map((menu, idx) => (
          <div key={menu.label} className="relative">
            <button
              className={`flex items-center gap-2 focus:outline-none cursor-pointer ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}
              onClick={() => handleMenuClick(menu, idx)}
              aria-expanded={hasSubmenu(menu.submenu) ? openMenu === idx : undefined}
              aria-controls={hasSubmenu(menu.submenu) ? `submenu-${idx}` : undefined}
            >
              {menu.label}
              {(menu.label === 'Events' || menu.label === 'Media') &&               
                <Image
                  src="/dropdown.svg"
                  alt="Dropdown"
                  width={10}
                  height={10}
                  className={isHome ? "" : "brightness-0 invert"}
                />
              }

            </button>
            {hasSubmenu(menu.submenu) && openMenu === idx && (
              <div
                id={`submenu-${idx}`}
                className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg z-50"
              >
                { menu.submenu && 
                  <div className="py-2 bg-[#E6E9D4] rounded-lg">
                    {menu.submenu?.map((item) => (
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
        {navMenus.map((menu, idx) => (
          <div key={menu.label} className="flex flex-col">
            <button
              className="flex items-center justify-between py-2 px-2 rounded text-[#265F44] font-semibold hover:bg-[#e4ebd8] focus:outline-none"
              onClick={() => handleMenuClick(menu, idx, true)}
              aria-expanded={hasSubmenu(menu.submenu) ? openMenu === idx : undefined}
              aria-controls={hasSubmenu(menu.submenu) ? `mobile-submenu-${idx}` : undefined}
            >
              <span>{menu.label}</span>
              {hasSubmenu(menu.submenu) ? <span className="text-xs">▼</span> : null}
            </button>
            {hasSubmenu(menu.submenu) && openMenu === idx && (
              <div id={`mobile-submenu-${idx}`} className="flex flex-col ml-4 border-l border-[#E3E7D7] pl-3 mt-1">
                {menu.submenu?.map((item) => (
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

      <div className="flex items-center gap-3 flex-shrink-0 flex-grow-0">
        <button
          className="flex items-center gap-1 rounded-full border border-[#b7c5b3] bg-white px-3 py-1 text-xs font-semibold text-[#1f3b2c] min-w-0 max-w-[80px] md:max-w-[110px] overflow-x-auto truncate whitespace-nowrap"
          style={{ maxWidth: "110px" }}
        >
          <Image
            src="https://flagcdn.com/w20/us.png"
            alt="US Flag"
            className="w-4 h-auto sm:w-5 flex-shrink-0"
            width={20}
            height={20}
            priority
          />
          <span className="xs:inline truncate">EN</span>
          <span className="text-[10px] text-text-green sm:text-xs flex-shrink-0">▼</span>
        </button>
      </div>
    </header>
  );
}
