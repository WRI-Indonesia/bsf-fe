import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 z-20 mx-auto flex w-full items-center justify-between px-[40px] py-[11px]">
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
        <nav className="hidden items-center gap-20 text-base font-medium ml-auto mr-10 md:flex">
          <Link className="text-text-green" href="/">
            Home
          </Link>
          <Link className="flex items-center gap-1 text-text-green" href="/about">
            About
            <span className="text-[10px]">▼</span>
          </Link>  
          <Link className="flex items-center gap-1 text-text-green" href="#">
            Events
            <span className="text-[10px]">▼</span>
          </Link>
          <Link className="flex items-center gap-1 text-text-green" href="#">
            Publications
            <span className="text-[10px]">▼</span>
          </Link>
          <Link className="flex items-center gap-1 text-text-green" href="#">
            Media
            <span className="text-[10px]">▼</span>
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-[#b7c5b3] bg-white px-3 py-1 text-xs font-semibold text-[#1f3b2c]">
            <img 
              src="https://flagcdn.com/w20/us.png" 
              alt="US Flag" 
              className="w-4 h-auto"
            />
            EN
            <span className="text-[10px] text-[#6a7c6f]">▼</span>
          </button>
        </div>
      </header>
  );
}
