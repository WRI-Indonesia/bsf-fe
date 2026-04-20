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
    { text: "Register Now", style: "bg-[#225139]", hoverStyle: "hover:bg-[#173e28]" },
    { text: "Submit Abstract", style: "bg-white", hoverStyle: "hover:bg-[#f6f9f5]" }
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
    iconBg: "bg-[#e5ebe4]",
    iconColor: "text-[#5b7a63]",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2"/></svg>,
  },
  {
    title: "Abstract Submission",
    desc: "Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable",
    iconBg: "bg-[#fcf5e2]",
    iconColor: "text-[#ecca59]",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" stroke="white" strokeWidth="2"/></svg>,
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <section className="bg-background-base-dark relative overflow-hidden pt-32 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px] grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <div className="flex flex-col z-10 text-white">
              <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
                UPCOMING FORUM
              </p>
              <h1 className="mt-6 text-[48px] md:text-[64px] lg:text-[76px] font-bold leading-[1.1] tracking-tight">
                {EVENT_DATA.title}
              </h1>
              <div className="mt-8 flex flex-wrap gap-8 font-['inter'] text-[16px] text-[#AFAFAF]">
                <div>{EVENT_DATA.date}</div>
                <div>{EVENT_DATA.location}</div>
                <div>{EVENT_DATA.participants}</div>
              </div>
              <p className="mt-8 max-w-[500px] font-['inter'] text-[18px] text-[#93a299] leading-[1.6]">
                {EVENT_DATA.description}
              </p>
              <div className="mt-10 flex gap-4">
                {EVENT_DATA.buttons.map((button, i) => (
                  <button key={i} className="flex items-center gap-2 rounded-[8px] bg-[#225139] px-6 py-[12px] text-[15px] font-semibold text-white transition-colors hover:bg-[#173e28]">
                    {button.text}
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                ))}
                <button className="rounded-[8px] bg-white px-6 py-[12px] text-[15px] font-semibold text-text-black transition-colors hover:bg-[#f6f9f5]">
                  Submit Abstract
                </button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-l-[80px] overflow-hidden ml-auto">
              <Image
                src={EVENT_DATA.image}
                alt="Forum discussion"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px] text-center">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              IMPORTANT DATES
            </p>
            <h2 className="mt-4 text-[42px] md:text-[48px] font-bold text-text-black">
              Key dates & Deadlines
            </h2>
            <div className="mt-16 flex justify-center flex-wrap gap-4 lg:gap-6">
              {importantDates.map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-6 lg:p-8 bg-[#Fbfbfb] rounded-[20px] border border-[#e8efe8] w-[180px] lg:w-[220px] min-h-[160px] text-center">
                  <svg className="mb-4 text-[#265F44] w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                  <p className="font-bold text-text-black text-[15px] lg:text-[16px] whitespace-pre-line leading-[1.3] mb-2">{item.date}</p>
                  <p className="font-['inter'] text-[13px] text-text-grey-dark whitespace-pre-line">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef1e6] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              PROGRAMME
            </p>
            <h2 className="mt-2 text-[42px] md:text-[48px] font-bold text-text-black mb-12">
              Thematic Areas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thematicAreas.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[20px]">
                  <h3 className="font-bold text-text-black text-[20px] mb-4">{item.title}</h3>
                  <p className="font-['inter'] text-text-grey-dark text-[15px] leading-[1.6]">
                    Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[white] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              KEYNOTE SPEAKERS
            </p>
            <h2 className="mt-2 text-[42px] md:text-[48px] font-bold text-text-black mb-12">
              Featured Speakers
            </h2>

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
                  <div className="flex flex-col justify-center h-full sm:pt-4 p-4 sm:p-0">
                    <h3 className="text-[24px] font-bold text-text-black">{expert.name}</h3>
                    <p className="font-['inter'] text-[14px] font-semibold text-[#0A77FF] mb-4">{expert.role}</p>
                    <p className="font-['inter'] text-[15px] text-[#515151] mb-6 leading-[1.6]">
                      {expert.desc}
                    </p>
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

        <section className="bg-[#cdd7c8] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              SESSION
            </p>
            <h2 className="mt-2 text-[42px] md:text-[48px] font-bold text-text-black mb-12 uppercase">
              SESSIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Nature Based Solutions" },
                { title: "Marine & Coastal Biodiversity" },
                { title: "Nature Based Solutions" },
                { title: "Marine & Coastal Biodiversity" },
                { title: "Nature Based Solutions" },
                { title: "Marine & Coastal Biodiversity" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[20px]">
                  <h3 className="font-bold text-text-black text-[20px] mb-4">{item.title}</h3>
                  <p className="font-['inter'] text-text-grey-dark text-[15px] leading-[1.6]">
                    Harnessing ecosystems for climate adaption, disaster risk reduction, and sustainable livelihoods
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#9bb29c] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12">
              <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#265F44]">
                PARTICIPATE
              </p>
              <h2 className="mt-2 text-[42px] md:text-[48px] font-bold text-text-black uppercase">
                REGISTRATION
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {registrationOptions.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[20px] flex flex-col md:flex-row gap-6 items-start">
                  <div className={"w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 " + item.iconBg + " " + item.iconColor}>
                    {item.icon}
                  </div>
                  <div className="flex-1 flex flex-col text-left">
                    <h3 className="font-bold text-text-black text-[24px] lg:text-[28px] mb-4">{item.title}</h3>
                    <p className="font-['inter'] text-text-grey-dark text-[15px] leading-[1.6]">
                      {item.desc}
                    </p>
                    <button className="mt-6 ml-auto rounded-[8px] bg-[#225139] px-8 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[#173e28]">
                      See More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfbfb] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              ARCHIVE
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <h2 className="mt-2 text-[42px] md:text-[48px] font-bold text-text-black">
                Past Events
              </h2>
              <Link href="#" className="mt-4 md:mt-0 flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-[#1f4a31] hover:underline">
                View all past events <span>→</span>
              </Link>
            </div>

            <div className="flex flex-col">
              {[
                { year: "2023", title: "Implementing the Global Biodiversity Framework", location: "Bangkok, Thailand", participants: "450 participants" },
                { year: "2021", title: "Biodiversity in a Post-Pandemic World", location: "Virtual", participants: "520 participants" },
                { year: "2019", title: "Science for Biodiversity Action in ASEAN", location: "Manila, Philippines", participants: "289 participants" }
              ].map((event, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center py-6 md:py-8 border-b border-[#e2e8d9] last:border-0 group cursor-pointer gap-4">
                  <div className="flex-1">
                    <p className="font-['inter'] text-[14px] font-bold text-[#1f4a31] mb-2">{event.year}</p>
                    <h3 className="font-['inter'] text-[20px] md:text-[24px] font-normal text-text-black mb-2">{event.title}</h3>
                    <p className="font-['inter'] text-[16px] text-text-grey-dark">{event.location} . {event.participants}</p>
                  </div>
                  <div className="text-text-grey-dark group-hover:text-[#1f4a31] transition-colors ml-auto sm:ml-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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