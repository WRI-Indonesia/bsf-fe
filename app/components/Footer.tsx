import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-base-dark px-20 py-30 text-text-lime-light">
      <div className="flex flex-col gap-14 xl:flex-row justify-between xl:gap-20">
        <div className="w-full xl:max-w-[360px]">
          <div className="flex items-center gap-5">
            <div className="relative h-[108px] w-[108px] shrink-0">
              <Image
                src="/bsf_logo.png"
                alt="BSF logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-[180px] text-[2rem] leading-[0.9] text-[#f2f4ef] sm:text-[2.35rem] lg:text-[2.7rem]">
              Biodiversity
              <br />
              Science
              <br />
              Forum
            </p>
          </div>
          <p className="mt-8 max-w-[340px] font-['inter'] text-base leading-[1.2] text-[#5f6f66] sm:text-lg">
            The Biodiversity Science Forum brings together researches,
            practitioners, institutions, and decision-makers to strengthen
            dialogue, biodiversity conservation across the ASEAN region
          </p>
        </div>

        <div className="flex flex-row gap-20">
          <div className="flex flex-col gap-11">
            <Link href="/" className="font-['inter'] text-xl font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f]">
              Home
            </Link>
            <Link href="/about" className="font-['inter'] block text-xl font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f]">
              About
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href="/events" className="font-['inter'] text-xl font-semibold uppercase text-[#9ca000] hover:text-[#b7be2f]">
              Events
            </Link>
            <div className="flex flex-col gap-5 font-['inter'] text-base text-[#d8ddd4] lg:text-xl">
              <Link href="/events" className="block hover:text-white">
                Upcoming Forum
              </Link>
              <Link href="/events#past" className="block hover:text-white">
                Past Events
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-11">
            <Link href="/publications" className="font-['inter'] text-xl font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f]">
              Publications
            </Link>

            <div className="flex flex-col gap-5">
              <Link href="/media" className="font-['inter'] text-xl font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f]">
                Media
              </Link>
              <div className="flex flex-col gap-5 font-['inter'] text-base leading-[1.15] text-[#d8ddd4] lg:text-xl">
                <Link href="/media#press" className="block hover:text-white">
                  Press Release
                </Link>
                <Link href="/media#kit" className="block hover:text-white">
                  Media Kit
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 border-t border-white/15 pt-8 text-xs text-[#5f6f66] sm:text-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Biodiversity Science Forum. All rights reserved.</p>
          <div className="flex gap-8 md:justify-end">
            <Link href="/privacy" className="hover:text-[#7f8f86]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#7f8f86]">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
