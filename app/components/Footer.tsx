import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background-base-dark px-10 lg:px-20 py-16 lg:py-30 text-text-lime-light">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-[5rem]">
            <div className="flex w-full xl:max-w-[285px] flex-col items-start">
              <div className="flex flex-row items-center gap-4">
                <div className="relative h-[80px] w-[80px] shrink-0 min-[1440px]:h-[120px] min-[1440px]:w-[120px]">
                  <Image
                    src="/bsf_logo.png"
                    alt="BSF logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-[2rem] font-semibold leading-[1.1] text-[#f2f4ef]">
                  Biodiversity Science Forum
                </div>
              </div>
              <p className="font-['inter'] font-normal mt-4 text-base leading-[100%] tracking-[0%] text-text-grey-mid">
                The Biodiversity Science Forum brings together researchers,
                institutions, and policy makers to strengthen dialogue for
                biodiversity conservation across the ASEAN region.
              </p>
            </div>
            <div className="mt-8 xl:mt-0 flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-20">
              <div className="text-base flex flex-col gap-[1.75rem]">
                <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">About</p>
                <div className="font-['inter'] font-base space-y-2 text-text-lime-light grid gap-[1.75rem]">
                  <p>About the forum</p>
                  <p>Mission & Objectives</p>
                  <p>Scientific Committee</p>
                </div>
              </div>
              <div className="text-base flex flex-col gap-[1.75rem]">
                <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">Events</p>
                <div className="font-['inter'] font-base space-y-2 text-text-lime-light grid gap-[1.75rem]">
                  <p>Upcoming forum</p>
                  <p>Participate</p>
                  <p>Past Events</p>
                </div>
              </div>
              <div className="text-base flex flex-col gap-[1.75rem]">
                <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">Publications</p>
                <div className="font-['inter'] font-base space-y-2 text-text-lime-light grid gap-[1.75rem]">
                  <p>Featured Publications</p>
                  <p>Proceedings</p>
                  <p>Policy Briefs</p>
                  <p>Reports</p>
                  <p>Scientific Articles</p>
                  <p>Presentations & Slides</p>
                </div>
              </div>
              <div className="text-base flex flex-col gap-[1.75rem]">
                <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">Media</p>
                <div className="font-['inter'] font-base space-y-2 text-text-lime-light grid gap-[1.75rem]">
                  <p>Featured Media</p>
                  <p>News & Announcements</p>
                  <p>Press Releases</p>
                  <p>Photos & Videos</p>
                  <p>Media Kit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-4 border-t border-white/10 px-6 pt-6 text-[11px] text-[#94a397]">
            <p>© 2026 Biodiversity Science Forum. All rights reserved.</p>
            <div className="flex justify-end gap-4">
              <p>Privacy Policy</p>
              <p>Terms of Use</p>
            </div>
          </div>
        </footer>
  );
}
