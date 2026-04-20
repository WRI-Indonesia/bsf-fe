import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ABOUT_DATA = {
  title: "Advancing biodiversity science through regional collaboration",
  description:
    "Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.",
  image: "/about/hero.png",
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-[#e2e8d9] relative overflow-hidden pt-32 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px] grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <div className="flex flex-col z-10">
              <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-text-lime">
                ABOUT THE FORUM
              </p>
              <h1 className="mt-6 text-[48px] md:text-[64px] lg:text-[76px] font-bold leading-[1] text-text-black tracking-tight">
                {ABOUT_DATA.title}
              </h1>
              <p className="mt-8 max-w-[500px] font-['inter'] text-[18px] text-text-grey-dark leading-[1.5]">
                {ABOUT_DATA.description}
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-tl-[80px] overflow-hidden">
              <Image
                src={ABOUT_DATA.image}
                alt="Forum discussion"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Mission & Objectives Section */}
        <section className="bg-white py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-text-lime">
                MISSION & OBJECTIVES
              </p>
              <h2 className="mt-4 text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-black">
                Bridging science and policy for biodiversity action
              </h2>
              <p className="mt-6 font-['inter'] text-[18px] text-text-grey-dark leading-[1.6]">
                Whether you&apos;re interested in partnerships, have questions
                about the forum, or want to contribute to biodiversity
                science, we&apos;d love to hear from you. have questions about
                the forum, or want to contribute to biodiversity science,
                we&apos;d love to hear from you.
              </p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 font-['inter'] text-[15px] font-semibold text-text-green hover:underline">
                Read full mission statement <span>→</span>
              </a>
            </div>
            
            <div className="space-y-8 flex flex-col justify-center">
              {[
                { title: "Regional Collaboration", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
                { title: "Multi-Stakeholder Dialogue", desc: "Ahave questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
                { title: "Evidence-Based Policy", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
                { title: "Open Access Knowledge", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 text-text-green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-['inter'] text-[18px] font-semibold text-text-black">{item.title}</h3>
                    <p className="mt-1 font-['inter'] text-[15px] text-text-grey-dark leading-[1.5]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="bg-[#EDF2EA] py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-text-lime">
                OUR JOURNEY
              </p>
              <h2 className="mt-2 text-[48px] font-bold text-text-black">
                Key Milestones
              </h2>
            </div>
            
            <div className="relative">
              {/* Vertical line centered */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#265F44] -translate-x-1/2" />
              
              {[
                { year: "2018", right: true },
                { year: "2019", right: false },
                { year: "2020", right: true },
                { year: "2021", right: false },
                { year: "2022", right: true },
              ].map((milestone, i) => (
                <div key={i} className={`relative flex items-center mb-16 last:mb-0 ${milestone.right ? "justify-end" : "justify-start"}`}>
                  <div className={`w-1/2 ${milestone.right ? "pl-12" : "pr-12 text-right"}`}>
                    <p className="font-['inter'] text-[14px] font-bold text-text-green mb-1">{milestone.year}</p>
                    <h4 className="font-['inter'] text-[18px] font-semibold text-text-green mb-2">Forum Concept Developed</h4>
                    <p className="font-['inter'] text-[15px] text-text-grey-dark">Initial proposal for a regional biodiversity science<br/>platform by ACB</p>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-1/2 w-[12px] h-[12px] bg-[#265F44] rounded-full -translate-x-1/2 border-2 border-[#EDF2EA]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scientific Committee Section */}
        <section className="bg-white py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-text-lime">
                  SCIENTIFIC COMMITTEE
                </p>
                <h2 className="mt-2 text-[48px] font-bold text-text-black">
                  Meet our Experts
                </h2>
              </div>
              <a href="#" className="mt-4 md:mt-0 inline-flex items-center gap-2 font-['inter'] text-[15px] font-semibold text-text-green hover:underline">
                Read full mission statement <span>→</span>
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                { name: "Lisa Clarc", role: "UI/UX Designer", img: "/about/expert_1.png", desc: "Lisa's proactive support and problem-solving abilities make her an invaluable advocate for our customers." },
                { name: "Olivia Manson", role: "Cloud Architect", img: "/about/expert_2.png", desc: "With a deep understanding of user behavior and industry best practices, she crafts engaging experiences that seamlessly blend form and function." },
                { name: "Andrew Drue", role: "Project Manager", img: "/about/expert_3.png", desc: "An ambitious and exquisite personality that always strives to exceed expectations. Always there when someone is in need." },
                { name: "Morgan John", role: "CEO", img: "/about/expert_4.png", desc: "With his expertise in digital marketing channels and data analytics, Michael consistently helps our SaaS company succeed." },
              ].map((expert, i) => (
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
                    <p className="font-['inter'] text-[15px] text-text-grey-dark mb-6 leading-[1.6]">
                      {expert.desc}
                    </p>
                    <div className="flex gap-4 items-center">
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        {/* X Logo minimal */}
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        {/* Facebook Minimal */}
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        {/* LinkedIn */}
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        {/* Telegram */}
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.96-.63-.34-.98.22-1.56.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.85 1.18-5.23 3.46-.49.34-.94.51-1.35.5-.45-.01-1.3-.25-1.94-.46-.78-.26-1.4-.39-1.35-.83.03-.23.35-.47.96-.73 3.76-1.64 6.27-2.72 7.54-3.25 3.58-1.49 4.32-1.75 4.81-1.76.11 0 .35.03.48.14.11.09.14.22.15.34-.01.07-.01.19-.02.26z"/></svg>
                      </a>
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
