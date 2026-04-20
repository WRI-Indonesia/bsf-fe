"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navMenus = [
  {
    label: "About",
    href: "/about",
    submenu: [
      { label: "About the forum", href: "/about" },
      { label: "Mission & Objectives", href: "/about#mission" },
      { label: "Scientific Committee", href: "/about#committee" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    submenu: [
      { label: "Upcoming forum", href: "/events" },
      { label: "Participate", href: "/events#participate" },
      { label: "Past Events", href: "/events#past" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    submenu: [
      { label: "Featured Publications", href: "/publications" },
      { label: "Proceedings", href: "/publications#proceedings" },
      { label: "Policy Briefs", href: "/publications#policy-briefs" },
      { label: "Reports", href: "/publications#reports" },
      { label: "Scientific Articles", href: "/publications#articles" },
      { label: "Presentations & Slides", href: "/publications#presentations" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    submenu: [
      { label: "Featured Media", href: "/media" },
      { label: "News & Announcements", href: "/media#news" },
      { label: "Press Releases", href: "/media#press" },
      { label: "Photos & Videos", href: "/media#photos" },
      { label: "Media Kit", href: "/media#kit" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const handleMenuClick = (idx: number) => {
    setOpenMenu(openMenu === idx ? null : idx);
  };
  return (
    <header className={`${!isHome ? 'bg-background-base-dark' : ''} absolute top-0 z-20 mx-auto flex w-full items-center justify-between px-[40px] py-[11px]`}>
      <div className="flex items-center">
        <Image
          src="/bsf_logo.png"
          alt="BSF logo"
          width={73}
          height={73}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      <nav className="font-['inter']hidden items-center gap-20 text-base font-medium ml-auto mr-10 md:flex">
        <div className="relative">
          <Link className={`${isHome ? 'text-text-green' : 'text-text-white-broken'}`} href="/">
            Home
          </Link>
        </div>
        {navMenus.map((menu, idx) => (
          <div key={menu.label} className="relative">
            {menu.label === "Media" ? (
              <div className={`flex items-center gap-1 ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}>
                <Link href={menu.href}>{menu.label}</Link>
                <button
                  className="focus:outline-none"
                  onClick={() => handleMenuClick(idx)}
                  aria-label="Toggle Media submenu"
                  aria-expanded={openMenu === idx}
                  aria-controls={`submenu-${idx}`}
                >
                  <span className="text-[10px]">▼</span>
                </button>
              </div>
            ) : (
              <button
                className={`flex items-center gap-1 focus:outline-none ${isHome ? 'text-text-green' : 'text-text-white-broken'}`}
                onClick={() => handleMenuClick(idx)}
                aria-expanded={openMenu === idx}
                aria-controls={`submenu-${idx}`}
              >
                {menu.label}
                <span className="text-[10px]">▼</span>
              </button>
            )}
            {openMenu === idx && (
              <div
                id={`submenu-${idx}`}
                className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg z-50"
              >
                <div className="py-2">
                  {menu.submenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-text-green"
                      onClick={() => setOpenMenu(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-3 flex-shrink-0 flex-grow-0">
        <button
          className="flex items-center gap-2 rounded-full border border-[#b7c5b3] bg-white px-5 py-1 text-xs font-semibold text-[#1f3b2c] w-fit min-w-0 max-w-[140px]"
          style={{ maxWidth: "140px" }}
        >
          <Image
            src="https://flagcdn.com/w20/us.png"
            alt="US Flag"
            className="w-4 h-auto sm:w-5"
            width={20}
            height={20}
            priority
          />
          <span className="xs:inline">EN</span>
          <span className="text-[10px] text-[#6a7c6f] sm:text-xs">▼</span>
        </button>
      </div>
    </header>
  );
}
