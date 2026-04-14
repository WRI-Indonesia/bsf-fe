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
    tag: "Policy brief",
    tagBg: "bg-[#e8f0ea]",
    tagText: "text-[#2a6b44]",
  },
  {
    title: "Guide to Invasive Species Control in SEA",
    tag: "Proceedings",
    tagBg: "bg-[#e9f5ec]",
    tagText: "text-[#2a6b44]",
  },
  {
    title: "State of Coral Reefs in the Coral Triangle",
    tag: "Publications",
    tagBg: "bg-[#f7f0e1]",
    tagText: "text-[#9a7b2f]",
  },
  {
    title: "Proceedings of Mangrove Forests Conservation",
    tag: "Technical Outputs",
    tagBg: "bg-[#f7e7e7]",
    tagText: "text-[#a03b3b]",
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
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#1f3b2c] md:ml-auto md:mr-10 md:flex">
          <a className="hover:text-[#0f6a3d]" href="#">
            Home
          </a>
          <a className="flex items-center gap-1 hover:text-[#0f6a3d]" href="#">
            About
            <span className="text-[10px]">▼</span>
          </a>
          <a className="flex items-center gap-1 hover:text-[#0f6a3d]" href="#">
            Events
            <span className="text-[10px]">▼</span>
          </a>
          <a className="flex items-center gap-1 hover:text-[#0f6a3d]" href="#">
            Publications
            <span className="text-[10px]">▼</span>
          </a>
          <a className="flex items-center gap-1 hover:text-[#0f6a3d]" href="#">
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
          <div className="relative mx-auto grid w-full gap-10 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] h-[820px]">
            <div className="pl-20 space-y-5 text-[#1f3b2c]">
              <div className="text-[88px] font-semibold leading-tight text-[#4a4a4a]">
                ASEAN Biodiversity
                <br />
                Science Forum
              </div>
              <p className="max-w-md text-[20px] font-normal text-[#515151]">
                A hub for community to get the biodiversity science updates around ACB.
              </p>
            </div>
            <div className="pr-10 flex items-end md:justify-end">
              <div className="w-[480px] rounded-2xl bg-white/60 p-[24px] text-[#1f4a31]">
                <p className="text-[20px] font-bold text-[#887000]">
                  Upcoming Forum
                </p>
                <h3 className="mt-2 text-[38px] font-bold leading-[1.1] tracking-tight text-[#1f4a31]">
                  Connecting Biodiversity Science,
                  Policy, and Action
                </h3>
                <div className="mt-6 flex w-full items-center justify-center gap-6 rounded-lg bg-[#aac0ac]/50 py-3 text-[#1f4a31]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-bold text-[#265F44]">14-19</span>
                    <span className="font-['Inter'] text-[16px] font-normal leading-none tracking-normal text-[#265F44]">June 2026</span>
                  </div>
                  <div className="h-7 w-[1.5px] bg-[#668270]" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-bold text-[#265F44]">500+</span>
                    <span className="font-['Inter'] text-[16px] font-normal leading-none tracking-normal text-[#265F44]">Participants</span>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-3">
                  <button className="flex items-center justify-center rounded-xl border border-[#1f4a31] bg-white px-4 py-[10px] text-[15px] font-semibold text-[#1f4a31] transition-colors hover:bg-gray-50">
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
              <p className="font-['Inter'] text-[20px] font-semibold uppercase tracking-wider text-[#887000]">
                ABOUT THE FORUM
              </p>
              <div>
                <h2 className="mt-10 text-[40px] font-semibold leading-[1.2] text-white">
                  A space for biodiversity science,
                  <br className="hidden md:block" />
                  collaboration, and knowledge exchange.
                </h2>
                <p className="mt-2 font-['Inter'] font-normal text-[20px] leading-[1.6] text-[#93a299]">
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
                      <svg className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                    )}
                    {item.title === "Multi-Stakeholder" && (
                      <svg className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    )}
                    {item.title === "Evidence-Based" && (
                      <svg className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    )}
                    {item.title === "Open Access" && (
                      <svg className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5Z"/></svg>
                    )}
                    <h3 className="text-[18px] font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-5 whitespace-pre-line text-[13px] leading-[1.6] text-[#9baa9e]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#e9efdf] py-12 text-[#1b2d1f]">
          <div className="mx-auto grid w-full gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b28d3c]">
                Upcoming Forum
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                ASEAN Biodiversity Science Forum 2026
              </h2>
              <p className="mt-4 max-w-md text-sm text-[#4a5d4f]">
                Join leading scientists, policy experts, and conservation
                practitioners for five days of keynotes, sessions, and
                collaborative workshops on the future of biodiversity in
                Southeast Asia.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-[#1f3b2c]">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[#b7c5b3] bg-white/70 px-3 py-2">
                  <span>14-19 June 2026</span>
                  <span className="text-[10px] text-[#6a7c6f]">6 Days Event</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[#b7c5b3] bg-white/70 px-3 py-2">
                  <span>Jakarta, Indonesia</span>
                  <span className="text-[10px] text-[#6a7c6f]">ASEAN HQ</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[#b7c5b3] bg-white/70 px-3 py-2">
                  <span>500+ Expected</span>
                  <span className="text-[10px] text-[#6a7c6f]">Participants</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#1f3b2c] px-5 py-2 text-xs font-semibold text-white">
                  Register Now
                </button>
                <button className="rounded-full border border-[#1f3b2c] px-5 py-2 text-xs font-semibold text-[#1f3b2c]">
                  View Program
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#c7d3c2] bg-white/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#51685d]">
                Key Dates
              </p>
              <div className="mt-5 space-y-4 text-sm">
                {keyDates.map((item, index) => (
                  <div key={item.date} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="h-2 w-2 rounded-full bg-[#1f3b2c]" />
                      {index < 4 ? (
                        <span className="mt-1 h-7 w-px bg-[#c7d3c2]" />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1f3b2c]">
                        {item.date}
                      </p>
                      <p className="text-xs text-[#5e7365]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 text-[#1b2d1f]">
          <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-4 px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b28d3c]">
                Latest Publication
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Recent Knowledge Products
              </h2>
            </div>
            <button className="text-xs font-semibold text-[#1f3b2c]">
              View all publications →
            </button>
          </div>
          <div className="mx-auto mt-8 w-full space-y-4 px-6">
            {publications.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e2e8e2] bg-[#fcfdfb] px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1f3b2c]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-[#6a7c6f]">
                    Guide to Invasive Species Control in SEA Proceedings of the
                    5th ASEAN Biodiversity Conference
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${item.tagBg} ${item.tagText}`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-[#8a998f]">
                      ACB/NRI, 15 Mar 2024, 15MB
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full border border-[#1f3b2c] px-4 py-2 text-xs font-semibold text-[#1f3b2c]">
                    Download
                  </button>
                  <button className="rounded-full bg-[#1f3b2c] px-4 py-2 text-xs font-semibold text-white">
                    Open
                  </button>
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
