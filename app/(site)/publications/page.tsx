import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Publications() {
  const PUBLICATIONS_DATA = [
    {
      title: "Proceedings of the 5th ASEAN Biodiversity Conference",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Policy Brief",
      tagBg: "bg-background-light-primary-second",
      tagText: "text-text-icons-light-primary",
    },
    {
      title: "Guide to Invasive Species Control in SEA",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Proceedings",
      tagBg: "bg-background-light-success-second",
      tagText: "text-text-icons-light-success",
    },
    {
      title: "State of Coral Reefs in the Coral Triangle",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Publications",
      tagBg: "bg-background-light-warning-second",
      tagText: "text-text-icons-light-warning",
    },
    {
      title: "Proceedings of Mangrove Forests Conservation",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Technical Outputs",
      tagBg: "bg-background-light-danger-second",
      tagText: "text-text-icons-light-danger",
    },
    {
      title: "Guide to Invasive Species Control in SEA",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Proceedings",
      tagBg: "bg-background-light-success-second",
      tagText: "text-text-icons-light-success",
    },
    {
      title: "Proceedings of the 5th ASEAN Biodiversity Conference",
      desc: "Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference Guide to Invasive Species Control in SEA Proceedings of the 5th ASEAN Biodiversity Conference",
      meta: "ACB/WRI, 15 Mar 2024, 15MB",
      tag: "Policy Brief",
      tagBg: "bg-background-light-primary-second",
      tagText: "text-text-icons-light-primary",
    }
  ];

  const tabs = ["Proceedings", "Policy Brief", "Publications", "Technical Outputs", "Research Reports"];

  const popularPosts = [
    { date: "25 Apr 2023", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { date: "25 Apr 2023", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { date: "25 Apr 2023", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  ];

  return (
    <div className="min-h-screen bg-background-base-grey-light">
      <Header />

      <main className="w-full relative z-0">
        <section className="bg-background-base-lime-light mt-[98px] px-20 py-30">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col max-w-[800px] gap-12">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                PUBLICATIONS
              </p>
              <h1 className="text-8xl font-semibold text-text-black leading-[96px] tracking-[0]">
                Featured Publications
              </h1>
              <p className="font-['inter'] text-xl text-text-grey-dark">
                Join leading scientists, policy experts, and conservation
                practitioners for five days of keynotes, sessions, and
                collaborative workshops on the future of biodiversity in
                Southeast Asia.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex bg-white w-[678px] rounded-2xl border border-[#e8efe8] p-3 overflow-x-auto gap-5 mb-10">
              <button className="px-3 py-1 rounded-full bg-background-base-lime-light text-text-green border border-text-green text-[14px] font-semibold whitespace-nowrap">
                All
              </button>
              {tabs.map(tab => (
                <button key={tab} className="font-['inter'] rounded-full text-text-grey-mid text-sm font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors">
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-[240px] flex-shrink-0 flex flex-col gap-6">
                <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
                  <h3 className="font-bold text-[#111A13] text-[18px] mb-5">File Type</h3>
                  <div className="flex flex-col gap-4 font-['inter']">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded-[4px] bg-[#265F44] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="font-bold text-[15px] text-text-black">PDF</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded-[4px] border border-[#d1d5db] flex-shrink-0"></div>
                      <span className="font-semibold text-[15px] text-[#111a13]">JPG</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded-[4px] border border-[#d1d5db] flex-shrink-0"></div>
                      <span className="font-semibold text-[15px] text-[#111a13]">Docx</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded-[4px] border border-[#d1d5db] flex-shrink-0"></div>
                      <span className="font-semibold text-[15px] text-[#111a13]">ZIP</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
                  <h3 className="font-bold text-[#111A13] text-[18px] mb-5">Publication Year</h3>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-[#d1d5db] rounded-lg px-4 py-3 text-[15px] font-semibold text-[#111a13] outline-none cursor-pointer">
                      <option>2026</option>
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-black">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex-1 flex flex-col gap-4">
                {PUBLICATIONS_DATA.map((pub, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e8e2] bg-[#fcfdfb] px-5 py-4"
                  >
                    <h3 className="text-[24px] font-semibold text-text-black leading-[1.25]">{pub.title}</h3>
                    <p className="font-['inter'] text-[16px] leading-[24px] tracking-[0px] text-text-grey-mid">
                      {pub.desc}
                    </p>
                    <p className="font-['inter'] text-[16px] text-text-grey-light">
                      {pub.meta}
                    </p>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className={`font-['inter'] font-medium border rounded-md px-3 py-1 text-[14px] font-semibold ${pub.tagBg} ${pub.tagText}`}>
                        {pub.tag}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                        <button className="flex h-[36px] flex-1 sm:flex-none sm:w-[136px] items-center justify-center gap-2 rounded-xl border border-text-green text-sm font-semibold text-text-green min-w-[120px]">
                          Download
                          <Image src="/download.svg" alt="Download Icon" width={16} height={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-8 flex items-center justify-between pt-4">
                  <button className="flex items-center gap-2 text-[#515151] font-semibold text-[15px] hover:text-[#111a13]">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Prev
                  </button>
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 font-semibold text-[15px] text-[#515151]">
                    <button className="hover:text-[#111a13]">1</button>
                    <button className="hover:text-[#111a13]">2</button>
                    <span className="cursor-default">...</span>
                    <button className="text-[#0A77FF]">5</button>
                    <button className="hover:text-[#111a13]">6</button>
                  </div>
                  <button className="flex items-center gap-2 text-[#515151] font-semibold text-[15px] hover:text-[#111a13]">
                    Next
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}