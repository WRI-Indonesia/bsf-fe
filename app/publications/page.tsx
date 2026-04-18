import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Publications() {
  const publications = [
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

  return (
    <div className="min-h-screen bg-[#fbfcfb]">
      <div className="absolute top-0 w-full h-[95px] bg-[#111a13] z-10" />
      <style dangerouslySetInnerHTML={{__html: `
        header nav a { color: #ffffff !important; }
        header button { background: rgba(255,255,255,0.1) !important; color: white !important; border-color: rgba(255,255,255,0.2) !important; }
        header button span { color: white !important; }
      `}} />
      <Header />
      
      <main className="w-full relative z-0">
        <section className="bg-[#eef1e6] pt-[150px] pb-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-[#857C00]">
              PUBLICATIONS
            </p>
            <h1 className="mt-4 text-[48px] md:text-[64px] font-bold leading-[1.1] text-[#111A13] tracking-tight">
              Featured Publications
            </h1>
            <p className="mt-6 max-w-[600px] font-['inter'] text-[18px] text-[#515151] leading-[1.6]">
              Join leading scientists, policy experts, and conservation
              practitioners for five days of keynotes, sessions, and
              collaborative workshops on the future of biodiversity in
              Southeast Asia.
            </p>
          </div>
        </section>

        <section className="py-12 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            
            <div className="flex bg-white rounded-2xl shadow-sm border border-[#e8efe8] p-2 overflow-x-auto gap-2 mb-10 max-w-fit">
              <button className="px-6 py-[8px] rounded-full bg-[#E9F8F1] text-[#27B973] border border-[#27B973] text-[14px] font-semibold whitespace-nowrap">
                All
              </button>
              {["Proceedings", "Policy Brief", "Publications", "Technical Outputs", "Research Reports"].map(tab => (
                <button key={tab} className="px-6 py-[8px] rounded-full text-text-grey-dark text-[14px] font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors">
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
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

                {/* Thematic Area */}
                <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
                  <h3 className="font-bold text-[#111A13] text-[18px] mb-5">Thematic Area</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Marine", "Forest", "Invasive Species", "Forest", "Marine"].map((tag, i) => (
                      <span key={i} className="px-4 py-2 border border-[#d1d5db] rounded-[8px] text-[13px] font-semibold text-[#111a13]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Post */}
                <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
                  <h3 className="font-bold text-[#111A13] text-[18px] mb-5">Popular Post</h3>
                  <div className="flex flex-col">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="py-4 border-b border-[#e8efe8] last:border-0 first:pt-0 last:pb-0">
                        <p className="font-['inter'] text-[13px] font-semibold text-[#265F44] mb-2">25 Apr 2023</p>
                        <p className="font-semibold text-[15px] text-[#111a13] leading-[1.4]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                {publications.map((pub, i) => (
                  <div key={i} className="bg-white border border-[#e8efe8] rounded-[24px] p-6 md:p-8">
                    <h3 className="font-bold text-[20px] md:text-[22px] text-[#111a13] leading-[1.3]">{pub.title}</h3>
                    <p className="font-['inter'] mt-3 text-[15px] text-text-grey-dark leading-[1.6]">
                      {pub.desc}
                    </p>
                    <p className="font-['inter'] mt-4 text-[14px] text-[#AFAFAF]">
                      {pub.meta}
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <span className={`px-4 py-[6px] rounded-full text-[13px] font-bold inline-block border border-transparent ${pub.tagBg} ${pub.tagText}`}>
                        {pub.tag}
                      </span>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-[10px] rounded-[8px] border border-[#265F44] text-[#265F44] font-semibold text-[14px] transition-colors hover:bg-[#F2F7F4]">
                          Download
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button>
                        <button className="flex items-center gap-2 px-5 py-[10px] rounded-[8px] bg-[#265F44] text-white font-semibold text-[14px] transition-colors hover:bg-[#1f4a31]">
                          Open
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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