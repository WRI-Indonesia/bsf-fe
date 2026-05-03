import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../payload.config';

type Objective = {
  id?: string;
  title: string;
  description: string;
};

type Milestone = {
  id?: string;
  year: string;
  title: string;
  description?: string;
  align_right?: boolean;
};

type SocialLinks = {
  x?: string;
  facebook?: string;
  linkedin?: string;
  telegram?: string;
};

type Expert = {
  id?: string;
  name: string;
  role: string;
  image?: { url?: string };
  description: string;
  social_links?: SocialLinks;
};

async function getAboutContent(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'about_content',
      locale: locale as 'en' | 'id',
      depth: 2,
    });
    return result;
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
}

function getSectionField(section: Record<string, unknown> | undefined, field: string, defaultValue: string): string {
  return (section?.[field] as string) || defaultValue;
}

function getSectionArray<T>(section: Record<string, unknown> | undefined, field: string): T[] {
  return (section?.[field] as T[]) || [];
}

function getUploadUrl(section: Record<string, unknown> | undefined, field: string, fallback: string): string {
  const fieldValue = section?.[field];
  if (!fieldValue) return fallback;
  if (typeof fieldValue === 'string') return fieldValue;
  if (typeof fieldValue === 'object' && fieldValue !== null) {
    let url = (fieldValue as Record<string, unknown>)?.url as string || fallback;
    try {
      const parsed = new URL(url);
      url = parsed.pathname + parsed.search;
    } catch {
    }
    return url;
  }
  return fallback;
}

export default async function About() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  const aboutContent = await getAboutContent(locale);

  const heroSection = aboutContent?.hero_section as Record<string, unknown> | undefined;
  const heroLabel = getSectionField(heroSection, 'label', 'ABOUT THE FORUM');
  const heroTitle = getSectionField(heroSection, 'title', 'Advancing biodiversity science through regional collaboration');
  const heroDescription = getSectionField(heroSection, 'description', 'Join leading scientists, policy experts, and conservation practitioners for five days of keynotes, sessions, and collaborative workshops on the future of biodiversity in Southeast Asia.');
  const heroImage = getUploadUrl(heroSection, 'image', '/about/hero.png');

  const missionSection = aboutContent?.mission_section as Record<string, unknown> | undefined;
  const missionLabel = getSectionField(missionSection, 'label', 'MISSION & OBJECTIVES');
  const missionTitle = getSectionField(missionSection, 'title', 'Bridging science and policy for biodiversity action');
  const missionDescription = getSectionField(missionSection, 'description', '');
  const missionReadMore = getSectionField(missionSection, 'read_more_text', 'Read full mission statement');
  const objectives = getSectionArray<Objective>(missionSection, 'objectives');

  const milestonesSection = aboutContent?.milestones_section as Record<string, unknown> | undefined;
  const milestonesLabel = getSectionField(milestonesSection, 'label', 'OUR JOURNEY');
  const milestonesTitle = getSectionField(milestonesSection, 'title', 'Key Milestones');
  const milestones = getSectionArray<Milestone>(milestonesSection, 'milestones');

  const expertsSection = aboutContent?.experts_section as Record<string, unknown> | undefined;
  const expertsLabel = getSectionField(expertsSection, 'label', 'SCIENTIFIC COMMITTEE');
  const expertsTitle = getSectionField(expertsSection, 'title', 'Meet our Experts');
  const experts = getSectionArray<Expert>(expertsSection, 'experts');

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <main className="w-full">
        <section className="bg-background-base-lime-light mt-[98px] py-30 overflow-hidden">
          <div className="flex flex-col xl:flex-row px-10 md:px-20 items-stretch gap-30">
            
            <div className="flex flex-col z-10 gap-12 w-full xl:w-[703px] xl:h-[552px] shrink-0 justify-center">
              <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">
                {heroLabel}
              </p>
              <p className="text-5xl md:text-7xl xl:text-8xl font-semibold leading-tight xl:leading-[90px] text-text-black tracking-tight">
                {heroTitle}
              </p>
              <p className="font-['inter'] text-xl text-text-grey-dark leading-relaxed xl:leading-[1]">
                {heroDescription}
              </p>
            </div>

            <div className="relative h-[400px] md:h-[500px] -mr-10 md:-mr-20 block xl:hidden">
              <div className="relative w-full h-full rounded-tl-[80px] overflow-hidden">
                <Image
                  src={heroImage}
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
                  src={heroImage}
                  alt="Forum discussion"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        <section className="bg-text-white-broken px-20 py-30">
          <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="flex flex-col gap-6">
              <p className="font-['inter'] font-xl font-semibold uppercase text-text-lime">
                {missionLabel}
              </p>
              <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-black">
                {missionTitle}
              </h2>
              <p className="font-['inter'] text-[18px] text-text-grey-dark leading-[1.6]">
                {missionDescription}
              </p>
              <a href="#" className="inline-flex items-center gap-2 font-['inter'] text-[15px] font-semibold text-text-green hover:underline">
                {missionReadMore} <span>→</span>
              </a>
            </div>

            <div className="flex flex-col gap-8 md:max-w-[503px]">
              {objectives.map((item, i) => (
                <div key={item.id || i} className="flex gap-4">
                  <div className="flex flex-shrink-0 text-text-green items-center pb-[1.5rem]">
                    <Image
                      src="/book.svg"
                      alt="Icon Book"
                      width={24}
                      height={24}
                      style={{ width: "24px", height: "auto" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-['inter'] text-xl font-semibold text-text-black">{item.title}</h3>
                    <p className="font-['inter'] text-base text-text-grey-dark">{item.description}</p>
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
                {milestonesLabel}
              </p>
              <h2 className="mt-2 text-[2.5rem] font-semibold text-text-black">
                {milestonesTitle}
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-text-grey-light -translate-x-1/2" />
              {milestones.map((milestone, i) => (
                <div key={milestone.id || i} className={`relative flex items-center mb-16 last:mb-0 ${milestone.align_right ? "justify-end" : "justify-start"}`}>
                  <div className={`w-1/2 ${milestone.align_right ? "pl-12" : "pr-12 text-right"}`}>
                    <p className="font-['inter'] text-sm font-semibold text-text-green mb-1">{milestone.year}</p>
                    <h4 className="font-['inter'] text-lg font-semibold text-text-green mb-2">{milestone.title}</h4>
                    {milestone.description && (
                      <p className="font-['inter'] text-base text-text-green">{milestone.description}</p>
                    )}
                  </div>

                  <div className="absolute left-1/2 w-4 h-4 bg-text-green rounded-full -translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-text-white-broken py-16 px-4 sm:px-6 md:px-10 lg:px-[80px] md:py-24">
          <div className="flex flex-col mx-auto max-w-[1400px] gap-8 md:gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="font-['inter'] text-[14px] font-bold uppercase tracking-widest text-text-lime">
                  {expertsLabel}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-black leading-tight">
                  {expertsTitle}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {experts.map((expert, i) => {
                const expertImg = getUploadUrl(expert as unknown as Record<string, unknown>, 'image', '/about/expert_1.png');
                const socialLinks = expert.social_links as SocialLinks | undefined;

                return (
                  <div key={expert.id || i} className="flex flex-col xl:flex-row gap-5 rounded-2xl p-4 sm:p-5 items-center xl:items-start text-center xl:text-left">
                    <div className="relative w-full max-w-[220px] aspect-square flex-shrink-0 mx-auto xl:mx-0">
                      <Image
                        src={expertImg}
                        alt={expert.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col justify-center h-full p-2 xl:p-0 w-full min-w-0">
                      <h3 className="text-[24px] font-bold text-text-black">{expert.name}</h3>
                      <p className="font-['inter'] text-[14px] font-semibold text-[#0A77FF] mb-4">{expert.role}</p>
                      <p className="font-['inter'] text-[15px] text-text-grey-dark mb-6 leading-[1.6]">
                        {expert.description}
                      </p>
                      <div className="flex gap-4 items-center justify-center xl:justify-start">
                        {(['x', 'facebook', 'linkedin', 'telegram'] as const).map((platform) => {
                          const platformRoots: Record<string, string> = {
                            x: 'https://x.com',
                            facebook: 'https://facebook.com',
                            linkedin: 'https://linkedin.com',
                            telegram: 'https://t.me',
                          };
                          const url = socialLinks?.[platform];
                          const href = (url && url.trim() !== '' && url !== 'null') ? url : platformRoots[platform];
                          return (
                            <a key={platform} href={href} target="_blank" rel="noopener noreferrer" className="w-5 h-5 flex items-center justify-center text-text-black">
                              <Image src={`/${platform}.svg`} alt={platform} width={20} height={20} />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
