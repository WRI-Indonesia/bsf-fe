import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

export default function PastEvents() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <section className="flex flex-col bg-background-base-lime-light mt-[98px] p-20 gap-10 overflow-hidden">
          <nav aria-label="Breadcrumb" className="mt-4 mb-6 flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Events</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-medium text-text-green leading-[22px]">Past Events</span>
          </nav>
          <div className="flex flex-col gap-5 lg:max-h-[800px]">
            <p className="font-semibold text-text-black xl:text-8xl lg:text-6xl md:text-2xl xl:leading-[90px]">Past Events</p>
            <p className="font-[inter] text-text-grey-dark text-xl font-normal">Lorem Ipsum</p>
          </div>
        </section>

        <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20">
            <div className="grid gap-[48px] md:grid-cols-1 md:gap-y-[60px] lg:grid-cols-2 lg:gap-x-[60px] lg:gap-y-[72px]">
              {pastEvents.map((event, i) => (
                <div key={i} className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-6 items-start lg:grid-cols-[190px_1fr]">
                  <div className="relative h-[190px] w-full overflow-hidden rounded-2xl md:h-[150px] md:w-[220px] lg:h-[190px] lg:w-[190px]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 lg:h-full lg:max-h-[190px] lg:justify-between">
                    <p className="font-[inter] font-semibold text-text-green">
                      {event.date}
                    </p>
                    <h3 className="lg:text-xl xl:text-[1.75rem]/[100%] font-semibold text-text-grey-dark">
                      {event.title}
                    </h3>
                    <div className="flex flex-col text-text-grey-dark">
                      <div className="flex items-center gap-2">
                        <Image src="/globe.svg" alt="Location" width={16} height={16} />
                        <p className="font-['inter'] text-[14px]">{event.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/participants.svg" alt="Participants" width={16} height={16} />
                        <p className="font-['inter'] text-[14px]">{event.participants}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}