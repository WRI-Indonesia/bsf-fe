import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

const galleryItems = [
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 1,
    image: "/media/gallery.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 2,
    image: "/media/gallery.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 3,
    image: "/media/gallery_2.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 4,
    image: "/media/gallery_2.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 5,
    image: "/media/gallery_3.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 6,
    image: "/media/gallery_3.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 7,
    image: "/media/gallery.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 8,
    image: "/media/gallery_2.png"
  },
  {
    title: "BSF 2024 Opening Ceremony",
    count: "24 Photos",
    id: 9,
    image: "/media/gallery_3.png"
  },
];

const pressReleases = [
  {
    date: "24 January 2024",
    title:
      "Harnessing ecosystems for climate adaptation, disaster risk reduction, and sustainable livelihoods",
    image: "/media/business.png",
    source: "/media/cnn_logo.png",
  },
  {
    date: "07 March 2024",
    title:
      "Science for Biodiversity Action in ASEAN and collaboration",
    image: "/media/business.png",
    source: "/media/cnn_logo.png",
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
        <section id="photos" className="bg-text-white-broken px-20 py-30 mt-[98px]">
          <div className="flex flex-col gap-15 mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-12">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Gallery
              </p>
              <h1 className="text-[3.125rem] leading-[1] font-semibold text-text-grey-dark md:text-8xl">
                Photos &amp; Videos
              </h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-[16px] overflow-hidden"
                >
                  <div className="grid gap-3 p-4">
                    <div className="col-span-2">
                      <div className="relative w-full h-[180px] md:h-[220px] rounded-[12px] overflow-hidden">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-6 text-center">
                    <p className="mt-2 font-['inter'] text-[16px] font-semibold text-text-black">{item.title}</p>
                    <p className="mt-1 font-['inter'] text-[13px] text-text-grey-light">{item.count}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="bg-background-base-green-light px-20 py-30">
          <div className="flex max-w-[1280px] gap-20">
            <div id="press" className="flex flex-col gap-6 max-w-[600px]">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Press
              </p>
              <h2 className="text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
                Press Releases
              </h2>

              <div className="mt-8 space-y-6">
                {pressReleases.map((release, index) => (
                  <article
                    key={index}
                    className="flex gap-6 items-center bg-white rounded-[20px] p-3 shadow-sm"
                  >
                    <div className="w-[220px] h-[140px] rounded-[12px] overflow-hidden relative flex-shrink-0">
                      <Image src={release.image} alt={release.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Image src={release.source} alt="source" width={28} height={28} />
                        <span className="text-sm text-text-grey-dark">CNN Indonesia</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-text-grey-dark leading-[100%]">
                        {release.title}
                      </h3>
                      <p className="text-text-green font-semibold">{release.date}</p>
                    </div>
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
              <h2 className="text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
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
