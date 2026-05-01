import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from 'next/headers';

const pastEvents = [
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

export default async function PressRelease() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  return (
    <div className="min-h-screen bg-text-white-broken">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] p-20 pt-30 gap-12 max-w-[1280px] overflow-hidden">
          <nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Media</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-semibold text-text-green leading-[22px]">Press Releases</span>
          </nav>
          <div className="flex flex-col lg:max-h-[800px]">
            <p className="font-semibold text-text-black lg:text-8xl md:text-4xl text-xl">Press Releases</p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px]">
            <div className="space-y-6">
              <article className="flex items-start gap-6 py-6">
                <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/media/business.png" alt="Business" width={96} height={72} className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Image src="/media/cnn_logo.png" alt="CNN Indonesia" width={18} height={18} />
                    <span className="font-[inter] text-sm text-text-grey-dark">CNN Indonesia</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                    Harnessing ecosystems for climate adapation, disaster risk reduction, and sustainable livehoods
                  </h3>
                  <p className="text-text-green text-sm font-semibold">24 January 2024</p>
                </div>
              </article>
              <hr className="border-t border-outline-grey-light" />

              <article className="flex items-start gap-6 py-6">
                <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/media/business.png" alt="Business" width={96} height={72} className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Image src="/media/cnn_logo.png" alt="CNN Indonesia" width={18} height={18} />
                    <span className="font-[inter] text-sm text-text-grey-dark">CNN Indonesia</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                    Harnessing ecosystems for climate adapation, disaster risk reduction, and sustainable livehoods
                  </h3>
                  <p className="text-text-green text-sm font-semibold">24 January 2024</p>
                </div>
              </article>
              <hr className="border-t border-outline-grey-light" />

              <article className="flex items-start gap-6 py-6">
                <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/media/business.png" alt="Business" width={96} height={72} className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Image src="/media/cnn_logo.png" alt="CNN Indonesia" width={18} height={18} />
                    <span className="font-[inter] text-sm text-text-grey-dark">CNN Indonesia</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                    Harnessing ecosystems for climate adapation, disaster risk reduction, and sustainable livehoods
                  </h3>
                  <p className="text-text-green text-sm font-semibold">24 January 2024</p>
                </div>
              </article>
              <hr className="border-t border-outline-grey-light" />

              <article className="flex items-start gap-6 py-6">
                <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/media/business.png" alt="Business" width={96} height={72} className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Image src="/media/cnn_logo.png" alt="CNN Indonesia" width={18} height={18} />
                    <span className="font-[inter] text-sm text-text-grey-dark">CNN Indonesia</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                    Harnessing ecosystems for climate adapation, disaster risk reduction, and sustainable livehoods
                  </h3>
                  <p className="text-text-green text-sm font-semibold">24 January 2024</p>
                </div>
              </article>
              <hr className="border-t border-outline-grey-light" />

              <article className="flex items-start gap-6 py-6">
                <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/media/business.png" alt="Business" width={96} height={72} className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Image src="/media/cnn_logo.png" alt="CNN Indonesia" width={18} height={18} />
                    <span className="font-[inter] text-sm text-text-grey-dark">CNN Indonesia</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                    Harnessing ecosystems for climate adapation, disaster risk reduction, and sustainable livehoods
                  </h3>
                  <p className="text-text-green text-sm font-semibold">24 January 2024</p>
                </div>
              </article>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}