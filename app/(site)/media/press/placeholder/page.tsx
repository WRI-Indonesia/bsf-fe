import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const pastEvents = [
  {
    date: "24 January 2024",
    title: "A space for biodiversity science, collaboration, and knowledge exchange.",
    location: "Bangkok, Thailand",
    participants: "450 participants",
    image: "/media/business.png",
  },
  {
    date: "07 March 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Manila, Philippines",
    participants: "289 participants",
    image: "/events_2.png",
  },
  {
    date: "07 March 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Manila, Philippines",
    participants: "289 participants",
    image: "/events_2.png",
  },
  {
    date: "18 November 2023",
    title: "Science for Biodiversity Action in ASEAN and collaboration",
    location: "Virtual",
    participants: "520 participants",
    image: "/events_3.png",
  },
  {
    date: "18 November 2023",
    title: "Science for Biodiversity Action in ASEAN and collaboration",
    location: "Virtual",
    participants: "520 participants",
    image: "/events_3.png",
  },
  {
    date: "24 January 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Bangkok, Thailand",
    participants: "450 participants",
    image: "/events_1.png",
  },
    {
    date: "24 January 2024",
    title: "A space for biodiversity science, collaboration, and knowledge exchange.",
    location: "Bangkok, Thailand",
    participants: "450 participants",
    image: "/events_1.png",
  },
  {
    date: "07 March 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Manila, Philippines",
    participants: "289 participants",
    image: "/events_2.png",
  },
  {
    date: "07 March 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Manila, Philippines",
    participants: "289 participants",
    image: "/events_2.png",
  },
  {
    date: "18 November 2023",
    title: "Science for Biodiversity Action in ASEAN and collaboration",
    location: "Virtual",
    participants: "520 participants",
    image: "/events_3.png",
  },
  {
    date: "18 November 2023",
    title: "Science for Biodiversity Action in ASEAN and collaboration",
    location: "Virtual",
    participants: "520 participants",
    image: "/events_3.png",
  },
  {
    date: "24 January 2024",
    title: "Biodiversity in a Post-Pandemic World, and knowledge exchange.",
    location: "Bangkok, Thailand",
    participants: "450 participants",
    image: "/events_1.png",
  },
];

const articleText = `Surat keputusan tersebut ditandatangani Bupati Sorong Selatan, Samsudin Anggiluli, dan diserahkan pada Kamis, 6 Juni 2024, sehari setelah peringatan Hari Lingkungan Hidup Sedunia. Wilayah adat yang membentang di Distrik Saifi dan Seremuk tersebut lebih luas dari DKI Jakarta, yang luasnya 66.150 hektare.\n
“Tanah ini sejak dahulu milik kami, hak kesulungan kami, diwariskan oleh para leluhur, dan akan menjadi masa depan anak-cucu kami. Namun, pengakuan wilayah adat penting untuk memberikan kepastian hukum bagi kami masyarakat adat,” kata Ketua Dewan Persekutuan Masyarakat Adat Knasaimos, Fredrik Sagisolo, pada acara penyerahan SK di kantor Sekretariat Panitia Masyarakat Adat Sorong Selatan, Teminabuan, Sorong Selatan, Kamis, 6 Juni 2024.\n
“Kami berharap, kepastian hukum ini bisa memperkuat benteng pertahanan kami untuk menjaga hutan dan wilayah adat dari ancaman investasi yang merugikan masyarakat adat dan Tanah Papua,” ujarnya.\n
Sekretaris Daerah Sorong Selatan Dance Nauw yang memimpin prosesi tersebut mengatakan, lebih dari dokumen administratif, SK tersebut merupakan bentuk penghormatan dan pengakuan atas keberadaan dan peran penting masyarakat adat menjaga kelestarian lingkungan dan budaya lokal. Pengakuan wilayah adat ini juga disebutnya sebagai tonggak sejarah dan bukti kepedulian terhadap masyarakat.\n
“Pengakuan ini menunjukkan kepada masyarakat setempat dan pemerintah pusat, bahwa komitmen untuk melindungi lingkungan serta memastikan martabat dan kesejahteraan masyarakat adat berjalan beriringan,” kata Dance.\n
“Kami berharap pengakuan ini dapat memperkuat semangat gotong royong dan kebersamaan dalam mengelola wilayah adat demi kesejahteraan bersama,” ujarnya.`;

export default function PlaceholderPressRelease() {
  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] p-20 pt-30 gap-10 max-w-[1280px] overflow-hidden">
          <nav aria-label="Breadcrumb" className="mt-4 mb-6 flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Events</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/events/past_events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Past Events</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-medium text-text-green leading-[22px]">Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livehoods</span>
          </nav>
          <div className="flex flex-col gap-5 lg:max-h-[800px]">
            <p className="font-semibold text-text-black lg:text-[3.625rem] md:text-2xl">Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livehoods</p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px] bg-white rounded-xl px-9 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <main className="lg:col-span-2">
                <div className="flex flex-col gap-6 bg-white rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm text-text-grey-dark">
                      <div className="flex items-center gap-2">
                        <span className="font-[inter] font-semibold text-text-grey-mid">24 Jan - 2024</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/location.png" alt="Location" width={16} height={16} />
                        <span className="font-[inter] font-semibold text-text-grey-mid">Bangkok, Thailand</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/participants.svg" alt="Participants" width={16} height={16} />
                        <span className="font-[inter] font-semibold text-text-grey-mid">450 participants</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                    <Image src={pastEvents[0].image} alt={pastEvents[0].title} fill className="object-cover" />
                  </div>

                  <div className="text-text-grey-dark whitespace-pre-line font-[inter] text-text-grey-mid text-justify">
                    {articleText.replace(/\\n/g, '\n')}
                  </div>
                </div>
              </main>

              <aside className="lg:col-span-1">
                <div className="flex flex-col bg-white rounded-2xl p-6 gap-2 border">
                  <h3 className="font-[inter] font-semibold text-lg text-text-main">Related Press Release</h3>
                  <div className="flex flex-col gap-4">
                    {pastEvents.slice(0,3).map((event, i) => (
                      <div key={i} className="flex flex-col gap-4">
                      <Link href="#" key={i} className="flex items-stretch gap-4">
                        <div className="flex w-[160px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={event.image} alt={event.title} width={160} height={110} className="object-cover" />
                        </div>
                        <div className="flex flex-col text-sm gap-2 justify-around">
                          <div className="flex flex-col text-sm">
                            <p className="font-[inter] font-semibold text-[#325B53] leading-[100%]">{event.title}</p>
                          </div>
                          <div className="flex flex-col text-sm">
                            <p className="font-[inter] text-text-grey-mid text-sm">{event.date}</p>
                            <p className="font-[inter] text-text-grey-mid text-sm">{event.location}</p>
                          </div>
                        </div>
                      </Link>
                      {i < 2 && (
                        <div className="h-[1px] w-full bg-outline-grey-light" />
                      )}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}