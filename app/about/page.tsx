import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ABOUT_DATA = {
  title: "Advancing biodiversity science through regional collaboration",
  description:
    "Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.",
  image: "/about/hero.png",
};

const missionObjectives = [
  { title: "Regional Collaboration", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
  { title: "Multi-Stakeholder Dialogue", desc: "Ahave questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
  { title: "Evidence-Based Policy", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
  { title: "Open Access Knowledge", desc: "have questions about the forum, or want to contribute to biodiversity science, we&apos;d love to hear from you." },
];

const milestones = [
  { year: "2018", right: true },
  { year: "2019", right: false },
  { year: "2020", right: true },
  { year: "2021", right: false },
  { year: "2022", right: true },
];

const experts = [
  { name: "Lisa Clarc", role: "UI/UX Designer", img: "/about/expert_1.png", desc: "Lisa's proactive support and problem-solving abilities make her an invaluable advocate for our customers." },
  { name: "Olivia Manson", role: "Cloud Architect", img: "/about/expert_2.png", desc: "With a deep understanding of user behavior and industry best practices, she crafts engaging experiences that seamlessly blend form and function." },
  { name: "Andrew Drue", role: "Project Manager", img: "/about/expert_3.png", desc: "An ambitious and exquisite personality that always strives to exceed expectations. Always there when someone is in need." },
  { name: "Morgan John", role: "CEO", img: "/about/expert_4.png", desc: "With his expertise in digital marketing channels and data analytics, Michael consistently helps our SaaS company succeed." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
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
              {missionObjectives.map((item, i) => (
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

        <section className="bg-background-base-lime-light py-24 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center mb-16">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                OUR JOURNEY
              </p>
              <h2 className="mt-2 text-[2.5rem] font-semibold text-text-black">
                Key Milestones
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-text-green -translate-x-1/2" />
              {milestones.map((milestone, i) => (
                <div key={i} className={`relative flex items-center mb-16 last:mb-0 ${milestone.right ? "justify-end" : "justify-start"}`}>
                  <div className={`w-1/2 ${milestone.right ? "pl-12" : "pr-12 text-right"}`}>
                    <p className="font-['inter'] text-sm font-semibold text-text-green mb-1">{milestone.year}</p>
                    <h4 className="font-['inter'] text-lg font-semibold text-text-green mb-2">Forum Concept Developed</h4>
                    <p className="font-['inter'] text-base text-text-green">Initial proposal for a regional biodiversity science<br/>platform by ACB</p>
                  </div>

                  <div className="absolute left-1/2 w-4 h-4 bg-text-green rounded-full -translate-x-1/2 border-2 border-[#EDF2EA]" />
                </div>
              ))}
            </div>
          </div>
        </section>

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
              {experts.map((expert, i) => (
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
                        <Image src="/x.svg" alt="Icon X" width={20} height={20} />
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/facebook.svg" alt="Facebook Icon" width={20} height={20} />
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/linkedin.svg" alt="LinkedIn Icon" width={20} height={20} />
                      </a>
                      <a href="#" className="w-5 h-5 flex items-center justify-center text-text-black">
                        <Image src="/telegram.svg" alt="Telegram Icon" width={20} height={20} />
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
