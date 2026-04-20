import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

const galleryItems = Array.from({ length: 6 }).map((_, index) => ({
  title: "BSF 2024 Opening Ceremony",
  count: "24 Photos",
  id: index + 1,
}));

const pressReleases = [
  {
    date: "28 February 2025",
    title:
      "Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods",
  },
  {
    date: "03 February 2025",
    title:
      "Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods",
  },
];

const mediaResources = [
  { title: "BSF Logo Pack", type: "ZIP", size: "2.4 MB" },
  { title: "Brand Guidelines", type: "PDF", size: "2.4 MB" },
  { title: "Press Kit 2026", type: "PDF", size: "2.4 MB" },
  { title: "Fact Sheet", type: "PDF", size: "2.4 MB" },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <section id="photos" className="bg-[#f5f5f5] px-[40px] pb-16 pt-[145px] md:px-[80px] md:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
              Gallery
            </p>
            <h1 className="mt-4 text-[3.125rem] leading-[1] font-semibold text-text-grey-dark md:text-8xl">
              Photos &amp; Videos
            </h1>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <article
                  key={item.id}
                  className="flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-outline-grey-light bg-[#f7f7f7] px-6 text-center"
                >
                  <Image
                        src="/book.svg"
                        alt="Address"
                        width={22}
                        height={22}
                        style={{ width: "22px", height: "22px" }}
                        className="brightness-0 invert"
                      />
                  <p className="mt-2 font-['inter'] text-[19px] font-semibold text-text-black">
                    {item.title}
                  </p>
                  <p className="mt-1 font-['inter'] text-[16px] text-text-grey-light">{item.count}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="bg-background-base-green-light px-20 py-30">
          <div className="flex max-w-[1280px] gap-20">
            <div id="press" className="max-w-[600px]">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Press
              </p>
              <h2 className="mt-3 text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
                Press Releases
              </h2>

              <div className="mt-8 space-y-3">
                {pressReleases.map((release, index) => (
                  <article
                    key={index}
                    className="rounded-[16px] bg-white p-[24px] shadow-[0_0_0_1px_rgba(17,26,19,0.04)]"
                  >
                    <p className="font-['inter'] text-base text-text-grey-dark">{release.date}</p>
                    <p className="mt-2 font-['inter'] text-text-lg font-semibold leading-[1] tracking-[0] text-text-black">
                      {release.title}
                    </p>
                  </article>
                ))}
              </div>

              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-text-green hover:underline"
              >
                All Press Release
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div id="kit">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Resources
              </p>
              <h2 className="mt-3 text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
                Media Kit
              </h2>
              <p className="mt-4 font-['inter'] text-base leading-[1.5] text-text-grey-dark">
                Download official logos, brand guidelines, and press materials for media
                coverage.
              </p>

              <div className="mt-7 space-y-3">
                {mediaResources.map((resource) => (
                  <button
                    key={resource.title}
                    type="button"
                    className="flex w-full items-center gap-4 rounded-[14px] bg-white px-6 py-6 text-left shadow-[0_0_0_1px_rgba(17,26,19,0.04)]"
                  >
                    <Image
                          src="/book.svg"
                          alt="Address"
                          width={22}
                          height={22}
                          style={{ width: "22px", height: "22px" }}
                          className="brightness-0 invert"
                        />
                    <div className="min-w-0 flex flex-col flex-1 gap-1">
                      <p className="font-['inter'] text-lg font-semibold leading-[1] text-text-black">
                        {resource.title}
                      </p>
                      <p className="font-['inter'] text-base uppercase tracking-wide text-text-grey-dark">
                        {resource.type} {resource.size}
                      </p>
                    </div>
                    <span className="text-[20px] text-text-green" aria-hidden="true">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
