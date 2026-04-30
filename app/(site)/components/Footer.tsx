import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
              Biodiversity
              <br />
              Science
              <br />
              Forum
            </p>
          </div>
          <p className="mt-6 max-w-[340px] font-['inter'] text-sm leading-[1.35] text-[#5f6f66] sm:mt-8 sm:text-base sm:leading-[1.2]">
            The Biodiversity Science Forum brings together researches,
            practitioners, institutions, and decision-makers to strengthen
            dialogue, biodiversity conservation across the ASEAN region
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:grid-cols-4 xl:flex xl:flex-row xl:gap-20">
          <div className="flex min-w-0 flex-col gap-4 sm:gap-11">
            <Link href="/" className="font-['inter'] text-lg font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f] sm:text-xl">
              Home
            </Link>
            <Link href="/about" className="font-['inter'] block text-lg font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f] sm:text-xl">
              About
            </Link>
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <Link href="/events" className="font-['inter'] text-lg font-semibold uppercase text-[#9ca000] hover:text-[#b7be2f] sm:text-xl">
              Events
            </Link>
            <div className="flex flex-col gap-4 font-['inter'] text-sm text-[#d8ddd4] sm:gap-5 sm:text-base lg:text-xl">
              <Link href="/events#upcoming_forum" className="block hover:text-white">
                Upcoming Forum
              </Link>
              <Link href="/events#past_events" className="block hover:text-white">
                Past Events
              </Link>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-11">
            <Link href="/publications" className="font-['inter'] text-lg font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f] sm:text-xl">
              Publications
            </Link>

            <div className="flex flex-col gap-4 sm:gap-5">
              <Link href="/media" className="font-['inter'] text-lg font-semibold uppercase tracking-[0.02em] text-[#9ca000] hover:text-[#b7be2f] sm:text-xl">
                Media
              </Link>
              <div className="flex flex-col gap-4 font-['inter'] text-sm leading-[1.15] text-[#d8ddd4] sm:gap-5 sm:text-base lg:text-xl">
                <Link href="/media/press" className="block hover:text-white">
                  Press Release
                </Link>
                <Link href="/media/kit" className="block hover:text-white">
                  Media Kit
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-12 border-t border-white/15 pt-6 text-xs text-[#5f6f66] sm:mt-16 sm:pt-8 sm:text-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Biodiversity Science Forum. All rights reserved.</p>
          <div className="flex gap-6 md:justify-end sm:gap-8">
            <Link href="/privacy" className="hover:text-[#7f8f86]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#7f8f86]">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
