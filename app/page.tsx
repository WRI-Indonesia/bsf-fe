import Image from "next/image";
import Footer from "./components/Footer";
import BookIcon from "../public/book.svg";
import Link from 'next/link';
import Header from './components/Header';

const aboutItems = [
  {
    title: "Regional Collaboration",
    text: "Connecting biodiversity science across Southeast Asia and beyond.",
  },
  {
    title: "Multi-Stakeholder",
    text: "Bridging researchers, policy-makers,\nand practitioners.",
  },
  {
    title: "Evidence-Based",
    text: "Turning scientific knowledge into\nactionable policy insights.",
  },
  {
    title: "Open Access",
    text: "Making biodiversity research freely\naccessible to all",
  },
];

const keyDates = [
  { date: "14 Mar 2026", text: "Abstract Submissions Opens" },
  { date: "28 Apr 2026", text: "Early Bird Registration Deadline" },
  { date: "15 May 2026", text: "Abstract Submissions Closes" },
  { date: "01 Jun 2026", text: "Program Announcement" },
  { date: "14 Jun 2026", text: "Abstract Submissions Opens" },
];

const publications = [
  {
    title: "Proceedings of the 5th ASEAN Biodiversity Conference",
    description: "Guide to Invasive Species Control in SEA Proceedings \
                    of the 5th ASEAN Biodiversity Conference Guide to  \
                    Invasive Species Control in SEA Proceedings of \
                    the 5th ASEAN Biodiversity Conference",
    tag: "Policy brief",
    tagBg: "bg-background-light-primary-second",
    tagText: "text-text-icons-light-primary",
  },
  {
    title: "Guide to Invasive Species Control in SEA",
    description: "Guide to Invasive Species Control in SEA Proceedings \
                  of the 5th ASEAN Biodiversity Conference Guide to \
                  Invasive Species Control in SEA Proceedings of the 5th \
                  ASEAN Biodiversity Conference",
    tag: "Proceedings",
    tagBg: "bg-background-light-success-second",
    tagText: "text-text-icons-light-success",
  },
  {
    title: "State of Coral Reefs in the Coral Triangle",
    description: "Guide to Invasive Species Control in SEA Proceedings \
              of the 5th ASEAN Biodiversity Conference Guide to \
              Invasive Species Control in SEA Proceedings of the 5th \
              ASEAN Biodiversity Conference",
    tag: "Publications",
    tagBg: "bg-background-light-warning-second",
    tagText: "text-text-icons-light-warning",
  },
  {
    title: "Proceedings of Mangrove Forests Conservation",
    description: "Guide to Invasive Species Control in SEA Proceedings \
              of the 5th ASEAN Biodiversity Conference Guide to \
              Invasive Species Control in SEA Proceedings of the 5th \
              ASEAN Biodiversity Conference",
    tag: "Technical Outputs",
    tagBg: "bg-background-light-danger-second",
    tagText: "text-text-icons-light-danger",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full">
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-[#0f1c14]/70" />
          <div className="relative mx-auto grid w-full gap-10 pb-16 pt-28 lg:grid-cols-[1.2fr_0.8fr] min-h-[820px]">
            <div className="px-8 md:px-12 lg:px-0 lg:pl-[100px] space-y-5 text-[#1f3b2c] flex flex-col justify-center lg:justify-start">
              <div className="text-[56px] md:text-[72px] lg:text-[88px] font-semibold text-text-grey-dark leading-[1]">
                ASEAN Biodiversity
                <br />
                Science Forum
              </div>
              <p className="font-['inter'] text-[18px] lg:text-[20px] font-normal text-text-grey-dark">
                A hub for community to get the biodiversity science updates around ACB.
              </p>
            </div>
            <div className="px-8 md:px-12 lg:px-0 lg:pr-10 flex items-end lg:justify-end">
              <div className="w-full sm:max-w-[480px] rounded-2xl bg-white/75 p-[24px]">
                <p className="text-[20px] font-bold text-text-lime">
                  Upcoming Forum
                </p>
                <h3 className="mt-2 text-[38px] font-bold leading-[1.1] tracking-tight text-text-green">
                  Connecting Biodiversity Science,
                  Policy, and Action
                </h3>
                <div className="mt-6 flex w-full items-center justify-center gap-4 sm:gap-6 rounded-lg bg-[#aac0ac]/50 py-3 text-text-green">
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="text-[22px] sm:text-[24px] font-bold text-text-green">14-19</span>
                    <span className="font-['inter'] text-[14px] sm:text-[16px] font-normal leading-none tracking-normal text-text-green">June 2026</span>
                  </div>
                  <div className="h-7 w-[1.5px] bg-[#668270] shrink-0" />
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="text-[22px] sm:text-[24px] font-bold text-text-green">500+</span>
                    <span className="font-['inter'] text-[14px] sm:text-[16px] font-normal leading-none tracking-normal text-text-green">Participants</span>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-3">
                  <button className="flex items-center justify-center rounded-xl border border-[#1f4a31] bg-white px-4 py-[10px] text-[15px] font-semibold text-text-green transition-colors hover:bg-gray-50">
                    <Link href="/publications">Explore Publications</Link>
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1f4a31] px-4 py-[10px] text-[15px] font-semibold text-white transition-colors hover:bg-[#163824]">
                    Register Now
                    <Image
                      src="/arrow_right.svg"
                      alt="Arrow Right"
                      width={14}
                      height={14}
                      style={{ width: "14px", height: "14px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#101612] px-[40px] md:px-[80px] py-[100px] text-white">
          <div className="mx-auto grid w-full gap-16 lg:grid-cols-[1fr_1.1fr] ">
            <div className="flex flex-col w-full lg:max-w-[636px]">
              <p className="font-['inter'] text-[20px] font-semibold uppercase tracking-wider text-text-lime">
                ABOUT THE FORUM
              </p>
              <div>
                <h2 className="mt-10 text-[32px] sm:text-[40px] font-semibold leading-[1.2] text-white">
                  A space for biodiversity science,
                  <br className="hidden lg:block" />
                  collaboration, and knowledge exchange.
                </h2>
                <p className="mt-2 font-['inter'] font-normal text-[18px] sm:text-[20px] leading-[1.6] text-[#93a299]">
                  The Biodiversity Science Forum brings together researches,
                  practitioners, institutions, and decision-makers to strengthen
                  dialogue, biodiversity conservation across the ASEAN region
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {aboutItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[16px] min-h-[121px] flex flex-col justify-center bg-[#3f4a41] p-[24px]"
                >
                  <div className="flex items-center gap-3">
                    {item.title === "Regional Collaboration" && (
                      <Image
                        src="/globe.svg"
                        alt="Globe"
                        width={22}
                        height={22}
                        style={{ width: "22px", height: "22px" }}
                        className="brightness-0 invert"
                      />
                    )}
                    {item.title === "Multi-Stakeholder" && (
                      <Image
                        src="/stakeholder.svg"
                        alt="Multi-Stakeholder"
                        width={22}
                        height={22}
                        style={{ width: "22px", height: "22px" }}
                        className="brightness-0 invert"
                      />
                    )}
                    {item.title === "Evidence-Based" && (
                      <BookIcon/>
                    )}
                    {item.title === "Open Access" && (
                      <Image
                        src="/bulb.svg"
                        alt="Open Access"
                        width={22}
                        height={22}
                        style={{ width: "22px", height: "22px" }}
                        className="brightness-0 invert"
                      />                    )}
                    <h3 className="text-[18px] font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="font-['inter'] mt-2 whitespace-pre-line text-[13px] font-normal leading-[1.6] text-[#AFAFAF]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#e4ebd8] py-20 px-[80px] text-[#1b2d1f]">
          <div className="mx-auto grid w-full gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:max-w-[1400px]">
            <div className="flex flex-col justify-center">
              <p className="font-['inter'] text-[20px] font-semibold uppercase text-text-lime">
                UPCOMING FORUM
              </p>
              <h2 className="mt-6 text-[40px] font-semibold tracking-tight text-text-black">
                ASEAN Biodiversity Science Forum 2026
              </h2>
              <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#697d70]">
                Join leading scientists, policy experts, and conservation
                practitioners for five days of keynotes, sessions, and
                collaborative workshops on the future of biodiversity in
                Southeast Asia.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex flex-1 items-center gap-3 rounded-[12px] border border-[#aabda7] bg-[#c3d4be] px-5 py-4">
                  <svg className="h-[22px] w-[22px] text-[#173e28]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#173e28]">14-19 June 2026</span>
                    <span className="text-[13px] font-medium text-[#3b664d]">5 Days Event</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 rounded-[12px] border border-[#aabda7] bg-[#c3d4be] px-5 py-4">
                  <svg className="h-[22px] w-[22px] text-[#173e28]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#173e28]">Jakarta, Indonesia</span>
                    <span className="text-[13px] font-medium text-[#3b664d]">ASEAN HQ</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 rounded-[12px] border border-[#aabda7] bg-[#c3d4be] px-5 py-4">
                  <svg className="h-[22px] w-[22px] text-[#173e28]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#173e28]">500+ Expected</span>
                    <span className="text-[13px] font-medium text-[#3b664d]">Participants</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="flex items-center gap-2 rounded-[8px] bg-[#225139] px-6 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[#173e28]">
                  Register Now
                  <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="rounded-[8px] border border-[#225139] bg-white px-6 py-[10px] text-[14px] font-semibold text-[#225139] transition-colors hover:bg-[#f6f9f5]">
                  View Program
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center lg:pl-10">
              <p className="text-[14px] font-bold uppercase tracking-wider text-[#1d3d2a]">
                KEY DATES
              </p>
              <div className="mt-6 space-y-6">
                {keyDates.map((item, index) => {
                  let textColClass = "text-[#173e28]";
                  let textSubClass = "text-[#486e57]";
                  let dotClass = "bg-[#173e28]";
                  
                  if (index === 1) {
                    textColClass = "text-[#44a877]";
                    textSubClass = "text-[#44a877]";
                    dotClass = "bg-[#173e28] ring-[3px] ring-[#44a877] ring-offset-[#e4ebd8] ring-offset-2";
                  } else if (index > 1) {
                    textColClass = "text-[#a4aba1]";
                    textSubClass = "text-[#a4aba1]";
                    dotClass = "bg-[#a4aba1]";
                  }
                  
                  return (
                    <div key={item.date + index} className="relative flex gap-5">
                      <div className="relative z-10 mt-[6px] flex flex-col items-center w-[12px]">
                        <span className={`h-[10px] w-[10px] rounded-full flex-shrink-0 ${dotClass}`} />
                        {index < keyDates.length - 1 ? (
                          <span className="absolute top-[10px] h-[calc(100%+1.5rem)] w-[1.5px] bg-[#c3cdbe]" />
                        ) : null}
                      </div>
                      <div className="relative -top-[1px]">
                        <p className={`text-[12px] tracking-wide font-medium ${textColClass}`}>
                          {item.date}
                        </p>
                        <p className={`text-[15px] font-medium leading-[1.4] ${textSubClass}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white px-[80px] py-[120px] text-[#1b2d1f]">
          <div className="mx-auto flex w-full flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-['inter'] text-[20px] font-semibold uppercase text-[#b28d3c]">
                Latest Publication
              </p>
              <h2 className="font-semibold text-[40px] mt-4 font-semibold">
                Recent Knowledge Products
              </h2>
            </div>
            <button className="text-[16px] font-semibold text-text-green">
              View all publications →
            </button>
          </div>
          <div className="mx-auto mt-8 w-full space-y-4">
            {publications.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e8e2] bg-[#fcfdfb] px-5 py-4"
              >
                <div className="space-y-2">
                  <p className="text-[24px] font-semibold text-text-black">
                    {item.title}
                  </p>
                  <p className="font-['inter'] text-[16px] leading-[24px] tracking-[0px] text-text-grey-mid">
                    {item.description}
                  </p>
                  <p className="font-['inter'] text-[16px] text-text-grey-light">
                    ACB/NRI, 15 Mar 2024, 15MB
                  </p>
                </div>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-['inter'] font-medium border rounded-md px-3 py-1 text-[14px] font-semibold ${item.tagBg} ${item.tagText}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                    <button className="flex h-[36px] flex-1 sm:flex-none sm:w-[136px] items-center justify-center gap-2 rounded-xl border border-text-green text-sm font-semibold text-text-green min-w-[120px]">
                      Download <Image src="/download.svg" alt="Download Icon" width={16} height={16} />
                    </button>
                    <button className="flex h-[36px] flex-1 sm:flex-none sm:w-[136px] items-center justify-center gap-2 rounded-xl bg-text-green text-sm font-semibold text-white min-w-[120px]">
                      Open <Image src="/arrow_right.svg" alt="Download Icon" width={10} height={10} style={{ height: "auto" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-background-base-green-light px-20 py-30">
          <div className="mx-auto grid w-full gap-[48px] lg:grid-cols-2 xl:grid-cols-[572px_1fr]">
            <div>
              <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">
                Contact Us
              </p>
              <h2 className="mt-4 text-[2.5rem] font-semibold text-text-black">
                Get in touch with the BSF team
              </h2>
              <p className="font-['inter'] mt-4 text-xl text-text-grey-mid">
                Whether you&apos;re interested in partnerships, have questions about 
                the forum, or want to contribute to biodiversity science, we&apos;d 
                love to hear from you.
              </p>
              <div className="mt-10 flex flex-col gap-8 text-text-green">
                <div className="flex items-center gap-4">
                  <BookIcon/>
                  <div>
                    <p className="font-['inter'] text-lg font-semibold leading-6">Email</p>
                    <p className="font-['inter'] text-base">contact@bsf-asean.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BookIcon className="mb-[1.5rem]" />
                  <div>
                    <p className="font-['inter'] text-lg font-semibold leading-6">Address</p>
                    <p className="font-['inter'] text-base">ASEAN Centre for Biodiversity<br />Los Banos, Laguna, Philippines</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BookIcon/>
                  <div>
                    <p className="font-['inter'] text-lg font-semibold leading-6">Phone</p>
                    <p className="font-['inter'] text-base">+62 (049) 536-2865</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-space-between w-full rounded-2xl font-['Plus_Jakarta_Sans']">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="block h-[22px] text-sm font-semibold leading-[22px] text-text-black">Full Name</span>
                  <input
                    className="w-full rounded-lg border border-outline-grey-light bg-white px-3 py-3 text-sm font-normal text-[#1b2d1f]"
                    placeholder="Your name"
                    type="text"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="block h-[22px] text-sm font-semibold leading-[22px] text-text-black">Email</span>
                  <input
                    className="w-full rounded-lg border border-outline-grey-light bg-white px-3 py-3 text-sm font-normal text-[#1b2d1f]"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
              </div>
              <label className="mt-6 flex flex-col gap-2">
                <span className="block h-[22px] text-sm font-semibold leading-[22px] text-text-black">Subject</span>
                <input
                  className="w-full rounded-lg border border-outline-grey-light bg-white px-3 py-3 text-sm font-normal text-[#1b2d1f]"
                  placeholder="Add a subject"
                  type="text"
                />
              </label>
              <label className="mt-6 flex flex-col gap-2">
                <span className="block h-[22px] text-sm font-semibold leading-[22px] text-text-black">Message</span>
                <textarea
                  className="min-h-[158px] w-full rounded-lg border border-outline-grey-light bg-white px-3 py-3 text-sm font-normal text-[#1b2d1f]"
                  placeholder="Write your message"
                />
              </label>
              <p className="my-6 text-sm text-text-grey-mid">
                Your request will be sent securely and remain private.
              </p>
              <div>
                <button className="rounded-md bg-text-green px-6 py-4 text-md font-semibold text-white">
                  Send your message
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
