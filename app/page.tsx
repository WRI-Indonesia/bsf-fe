import Image from "next/image";

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
    <div className="min-h-screen bg-[#f4f6ee] text-[#0e1b12]">
      <header className="absolute top-0 z-20 mx-auto flex w-full items-center justify-between px-[40px] py-[11px]">
        <div className="flex items-center">
          <Image
            src="/bsf_logo.png"
            alt="BSF logo"
            width={73}
            height={73}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
        <nav className="hidden items-center gap-20 text-sm font-medium ml-auto mr-10 md:flex">
          <a className="text-text-green" href="#">
            Home
          </a>
          <a className="flex items-center gap-1 text-text-green" href="#">
            About
            <span className="text-[10px]">▼</span>
          </a>  
          <a className="flex items-center gap-1 text-text-green" href="#">
            Events
            <span className="text-[10px]">▼</span>
          </a>
          <a className="flex items-center gap-1 text-text-green" href="#">
            Publications
            <span className="text-[10px]">▼</span>
          </a>
          <a className="flex items-center gap-1 text-text-green" href="#">
            Media
            <span className="text-[10px]">▼</span>
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-[#b7c5b3] bg-white px-3 py-1 text-xs font-semibold text-[#1f3b2c]">
            EN
            <span className="text-[10px] text-[#6a7c6f]">▼</span>
          </button>
        </div>
      </header>
      <main className="w-full pb-24">
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-[#0f1c14]/70" />
          <div className="relative mx-auto grid w-full gap-10 pb-16 pt-28 md:grid-cols-[1.2fr_0.8fr] h-[820px]">
            <div className="pl-25 space-y-5 text-[#1f3b2c]">
              <div className="text-[88px] font-semibold leading-tight text-text-grey-dark">
                ASEAN Biodiversity
                <br />
                Science Forum
              </div>
              <p className="font-['inter'] text-[20px] font-normal text-text-grey-dark">
                A hub for community to get the biodiversity science updates around ACB.
              </p>
            </div>
            <div className="pr-10 flex items-end md:justify-end">
              <div className="w-[480px] rounded-2xl bg-white/75 p-[24px]">
                <p className="text-[20px] font-bold text-text-lime">
                  Upcoming Forum
                </p>
                <h3 className="mt-2 text-[38px] font-bold leading-[1.1] tracking-tight text-text-green">
                  Connecting Biodiversity Science,
                  Policy, and Action
                </h3>
                <div className="mt-6 flex w-full items-center justify-center gap-6 rounded-lg bg-[#aac0ac]/50 py-3 text-text-green">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-bold text-text-green">14-19</span>
                    <span className="font-['inter'] text-[16px] font-normal leading-none tracking-normal text-text-green">June 2026</span>
                  </div>
                  <div className="h-7 w-[1.5px] bg-[#668270]" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-bold text-text-green">500+</span>
                    <span className="font-['inter'] text-[16px] font-normal leading-none tracking-normal text-text-green">Participants</span>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-3">
                  <button className="flex items-center justify-center rounded-xl border border-[#1f4a31] bg-white px-4 py-[10px] text-[15px] font-semibold text-text-green transition-colors hover:bg-gray-50">
                    Explore Publications
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
        <section className="bg-[#101612] px-[80px] py-[100px] text-white">
          <div className="mx-auto grid w-full gap-16 md:grid-cols-[1fr_1.1fr] ">
            <div className="flex flex-col w-[636px]">
              <p className="font-['inter'] text-[20px] font-semibold uppercase tracking-wider text-text-lime">
                ABOUT THE FORUM
              </p>
              <div>
                <h2 className="mt-10 text-[40px] font-semibold leading-[1.2] text-white">
                  A space for biodiversity science,
                  <br className="hidden md:block" />
                  collaboration, and knowledge exchange.
                </h2>
                <p className="mt-2 font-['inter'] font-normal text-[20px] leading-[1.6] text-[#93a299]">
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
                  className="rounded-[16px] h-[121px] bg-[#3f4a41] p-[24px]"
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
                      <Image
                        src="/book.svg"
                        alt="Evidence-Based"
                        width={22}
                        height={22}
                        style={{ width: "22px", height: "22px" }}
                        className="brightness-0 invert"
                      />                    )}
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
                <div>
                  <p className="text-[24px] font-semibold text-text-black">
                    {item.title}
                  </p>
                  <p className="font-['inter'] text-[16px] mt-2 leading-[24px] tracking-[0px] text-text-grey-mid">
                    {item.description}
                  </p>
                  <p className="font-['inter'] text-[16px] text-text-grey-light">
                    ACB/NRI, 15 Mar 2024, 15MB
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-['inter'] font-medium border rounded-md px-3 py-1 text-[14px] font-semibold ${item.tagBg} ${item.tagText}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button className="rounded-full border border-[#1f3b2c] px-4 py-2 text-xs font-semibold text-[#1f3b2c]">
                      Download
                    </button>
                    <button className="rounded-full bg-[#1f3b2c] px-4 py-2 text-xs font-semibold text-white">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-[#cbd8c7] py-12 text-[#1b2d1f]">
          <div className="mx-auto grid w-full gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b28d3c]">
                Contact Us
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Get in touch with the BSF team
              </h2>
              <p className="mt-4 max-w-md text-sm text-[#4a5d4f]">
                Whether you are interested in partnerships, have questions about
                the forum, or want to contribute to biodiversity science, we
                would love to hear from you.
              </p>
              <div className="mt-6 space-y-4 text-sm text-[#2c4537]">
                <div>
                  <p className="text-xs font-semibold">Email</p>
                  <p>contact@bsf-asean.org</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Address</p>
                  <p>ACB Annex, Los Banos, Laguna, Philippines</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Phone</p>
                  <p>+62 (0491) 558-2865</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/85 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#5f7366]">
                  Full Name
                  <input
                    className="mt-2 w-full rounded-lg border border-[#d7e0d5] bg-white px-3 py-2 text-sm text-[#1b2d1f]"
                    placeholder="Your name"
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold text-[#5f7366]">
                  Email
                  <input
                    className="mt-2 w-full rounded-lg border border-[#d7e0d5] bg-white px-3 py-2 text-sm text-[#1b2d1f]"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
              </div>
              <label className="mt-4 block text-xs font-semibold text-[#5f7366]">
                Subject
                <input
                  className="mt-2 w-full rounded-lg border border-[#d7e0d5] bg-white px-3 py-2 text-sm text-[#1b2d1f]"
                  placeholder="Add a subject"
                  type="text"
                />
              </label>
              <label className="mt-4 block text-xs font-semibold text-[#5f7366]">
                Message
                <textarea
                  className="mt-2 min-h-[120px] w-full rounded-lg border border-[#d7e0d5] bg-white px-3 py-2 text-sm text-[#1b2d1f]"
                  placeholder="Write your message"
                />
              </label>
              <p className="mt-4 text-[11px] text-[#7a8d80]">
                Your request will be sent securely and remain private.
              </p>
              <button className="mt-4 rounded-full bg-[#1f3b2c] px-5 py-2 text-xs font-semibold text-white">
                Send your message
              </button>
            </div>
          </div>
        </section>
        <footer className="bg-[#0f1c14] py-12 text-white">
          <div className="mx-auto grid w-full gap-10 px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/bsf_logo.png"
                  alt="BSF logo"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                />
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f2f4ef]">
                  Biodiversity
                  <br />
                  Science Forum
                </div>
              </div>
              <p className="mt-4 text-xs text-[#a8b5ac]">
                The Biodiversity Science Forum brings together researchers,
                institutions, and policy makers to strengthen dialogue for
                biodiversity conservation across the ASEAN region.
              </p>
            </div>
            <div className="text-xs">
              <p className="font-semibold text-[#b28d3c]">About</p>
              <div className="mt-3 space-y-2 text-[#c6d1c8]">
                <p>About the forum</p>
                <p>Mission & Objectives</p>
                <p>Scientific Committee</p>
              </div>
            </div>
            <div className="text-xs">
              <p className="font-semibold text-[#b28d3c]">Events</p>
              <div className="mt-3 space-y-2 text-[#c6d1c8]">
                <p>Upcoming forum</p>
                <p>Participate</p>
                <p>Past Events</p>
              </div>
            </div>
            <div className="text-xs">
              <p className="font-semibold text-[#b28d3c]">Publications</p>
              <div className="mt-3 space-y-2 text-[#c6d1c8]">
                <p>Featured Publications</p>
                <p>Proceedings</p>
                <p>Policy Briefs</p>
                <p>Reports</p>
                <p>Scientific Articles</p>
                <p>Presentations & Slides</p>
              </div>
            </div>
            <div className="text-xs">
              <p className="font-semibold text-[#b28d3c]">Media</p>
              <div className="mt-3 space-y-2 text-[#c6d1c8]">
                <p>Featured Media</p>
                <p>News & Announcements</p>
                <p>Press Releases</p>
                <p>Photos & Videos</p>
                <p>Media Kit</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 flex w-full flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 pt-6 text-[11px] text-[#94a397]">
            <p>© 2026 Biodiversity Science Forum. All rights reserved.</p>
            <div className="flex gap-4">
              <p>Privacy Policy</p>
              <p>Terms of Use</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
