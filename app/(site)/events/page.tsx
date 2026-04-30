import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EVENT_DATA = {
  title: "4th Biodiversity Science Forum 2026",
  date: "10-12 November 2026",
  location: "Singapore",
  participants: "500+ Expected Participants",
  description: "Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.",
  buttons: [
    { text: "Register Now", style: "bg-text-green text-text-white-broken", icon: true},
    { text: "Submit Abstract", style: "bg-text-white-broken text-text-green", icon: false},
  ],
  image: "/events/hero.png"
};

const importantDates = [
  { date: "1 June 2026", desc: "Abstract Submission\nOpens" },
  { date: "15 August 2026", desc: "Abstract Deadline" },
  { date: "1 September 2026", desc: "Abstract Submission\nOpens" },
  { date: "15 October 2026", desc: "Abstract Submission\nOpens" },
  { date: "10-12 November\n2026", desc: "Abstract Submission" },
];

const thematicAreas = [
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
];

const sessionThemes = [
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
  { title: "Nature Based Solutions" },
  { title: "Marine & Coastal Biodiversity" },
];

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
];

const keynoteSpeakers = [
  { name: "Lisa Clarc", role: "UI/UX Designer", img: "/events/speaker_1.png", desc: "Lisa's proactive support and problem-solving abilities make her an invaluable advocate for our customers." },
  { name: "Olivia Manson", role: "Cloud Architect", img: "/events/speaker_2.png", desc: "With a deep understanding of user behavior and industry best practices, she crafts engaging experiences that seamlessly blend form and function." },
  { name: "Andrew Drue", role: "Project Manager", img: "/events/speaker_3.png", desc: "An ambitious and exquisite personality that always strives to exceed expectations. Always there when someone is in need." },
  { name: "Morgan John", role: "CEO", img: "/events/speaker_4.png", desc: "With his expertise in digital marketing channels and data analytics, Michael consistently helps our SaaS company succeed." },
];

const registrationOptions = [
  {
    title: "Registration",
    desc: "Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable",
    iconColor: "text-[#5b7a63]",
    icon: "document_green.png",
    submitText: "Register"
  },
  {
    title: "Abstract Submission",
    desc: "Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable",
    iconColor: "text-[#ecca59]",
    icon: "document_yellow.png",
    submitText: "Submit Abstract"
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <section className="bg-background-base-dark mt-[98px] py-30 overflow-hidden">
          <div className="flex flex-col xl:flex-row px-10 md:px-20 items-stretch gap-30">
            <div className="flex flex-col z-10 text-white w-full xl:w-[703px] xl:h-[552px] gap-12 shrink-0 justify-center" id="upcoming_forum">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                UPCOMING FORUM
              </p>
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-semibold leading-tight xl:leading-[96px] text-text-white-broken tracking-tight">
                {EVENT_DATA.title}
              </h1>
              <div className="flex flex-wrap font-['inter'] text-[16px] justify-between text-text-grey-light">
                <div>{EVENT_DATA.date}</div>
                <div>{EVENT_DATA.location}</div>
                <div>{EVENT_DATA.participants}</div>
              </div>
              <p className="font-['inter'] text-xl text-text-grey-light">
                {EVENT_DATA.description}
              </p>
              <div className="flex flex-row gap-3 max-w-[373px]">
                {EVENT_DATA.buttons.map((button, i) => (
                  <button key={i} className={`flex font-[inter] text-sm justify-center w-full items-center gap-[6px] ${button.style} rounded-[8px] px-[10px] py-[16px] h-[36px] font-semibold`}>
                    {button.text}
                    {button.icon &&                     
                      <Image
                        src="/arrow_right.svg"
                        alt="Arrow Right"
                        width={10}
                        height={9}
                        style={{ width: "10px", height: "9px" }}
                      />
                    }
                  </button>
                ))}
              </div>
            </div>
              <div className="relative h-[320px] md:h-[420px] -mr-10 md:-mr-20 block xl:hidden">
                <div className="relative w-full h-full rounded-tl-[80px] overflow-hidden">
                  <Image
                    src={EVENT_DATA.image}
                    alt="Forum discussion"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="relative flex-1 -mr-10 md:-mr-20 hidden xl:block">
                <div className="relative w-full h-full rounded-tl-[80px] overflow-hidden">
                  <Image
                    src={EVENT_DATA.image}
                    alt="Forum discussion"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
          </div>
        </section>

        <section className="flex justify-center bg-white px-6 py-16 md:px-20 md:py-30">
          <div className="flex flex-col max-w-[1400px] text-center items-center gap-10 w-full">
            <div className="flex flex-col md:max-w-[572px]">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                IMPORTANT DATES
              </p>
              <p className="text-[2.5rem] font-semibold text-text-black">
                Key dates & Deadlines
              </p>
            </div>
            <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5">
              {importantDates.map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-outline-grey-light gap-3 bg-background-base-grey-light">
                  <Image
                        src="/book.svg"
                        alt="Important Date"
                        width={20}
                        height={38}
                        style={{ width: "24px", height: "38px" }}
                      />
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold text-lg text-text-black">{item.date}</p>
                    <p className="font-['inter'] text-base font-normal leading-[100%] text-text-grey-dark whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex bg-background-base-lime-light px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
            <div className="flex flex-col 2xl:items-center">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Programme
              </p>
              <p className="text-[2.5rem] font-semibold text-text-black">
                Thematic Areas
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thematicAreas.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[20px]">
                  <h3 className="font-bold text-text-black text-[20px]">{item.title}</h3>
                  <p className="font-['inter'] text-text-grey-dark text-[15px] leading-[1.6]">
                    Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-10 2xl:items-center">
            <div className="flex flex-col 2xl:items-center gap-6">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Keynote Speakers
              </p>
              <p className="text-[2.5rem] font-semibold text-text-black">
                Featured Speakers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {keynoteSpeakers.map((expert, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 bg-[#FaFaFa] rounded-2xl p-4 items-center sm:items-start">
                  <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] flex-shrink-0">
                    <Image
                      src={expert.img}
                      alt={expert.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col justify-center h-full gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <p className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-text-black">{expert.name}</p>
                        <p className="font-['inter'] text-text-icons-light-primary">{expert.role}</p>
                      </div>
                      <p className="font-['inter'] text-text-grey-mid">
                        {expert.desc}
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Link href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/x.svg" alt="Icon X" width={20} height={20} />
                      </Link>
                      <Link href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/linkedin.svg" alt="LinkedIn Icon" width={20} height={20} />
                      </Link>
                      <Link href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/facebook.svg" alt="Facebook Icon" width={20} height={20} />
                      </Link>
                      <Link href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/telegram.svg" alt="Telegram Icon" width={20} height={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex bg-background-base-green-light px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
            <div className="flex flex-col 2xl:items-center">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Session
              </p>
              <p className="text-[2.5rem] font-semibold text-text-black uppercase">
                Sessions
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionThemes.map((item, i) => (
                <div key={i} className="flex flex-col bg-white p-6 gap-3 rounded-[20px]">
                  <h3 className="font-[inter] font-semibold text-text-black text-base">{item.title}</h3>
                  <p className="font-[inter] text-text-grey-dark text-base">
                    Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex bg-background-base-green-mid px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
            <div className="flex flex-col 2xl:items-center">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-green">
                Participate
              </p>
              <p className="text-[2.5rem] font-semibold text-text-black uppercase">
                Registration
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {registrationOptions.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[16px] flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex flex-row gap-5 items-start flex-1">
                    <div className={"flex min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl"}>
                      <Image
                        src={`/${item.icon}`}
                        alt="Document"
                        width={50}
                        height={50}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold text-text-grey-dark text-[1.6rem] leading-[1.1] tracking-[0]">{item.title}</p>
                      <p className="font-['inter'] text-text-grey-dark text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <button className="font-[inter] sm:ml-auto h-[36px] px-6 bg-text-green text-text-white-broken rounded-xl text-sm font-semibold flex items-center justify-center self-end">
                    {item.submitText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20">
            <div className="flex flex-col">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                Archive
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between" id="past_events">
                <h2 className="text-[42px] md:text-[48px] font-bold text-text-black">
                  Past Events
                </h2>
                <Link href="#" className="flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-[#1f4a31] hover:underline">
                  View all past events <span>→</span>
                </Link>
              </div>
            </div>

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