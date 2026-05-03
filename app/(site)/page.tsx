import Image from "next/image";
import Footer from "./components/Footer";
import Link from 'next/link';
import { getPayload } from 'payload';
import Header from './components/Header';
import config from '../../payload.config';
import { cookies } from 'next/headers';
import { formatDateRange, formatParticipants } from '../../lib/helpers';

const iconMap: Record<string, string> = {
  globe: '/globe.svg',
  stakeholder: '/stakeholder.svg',
  book: '/book.svg',
  bulb: '/bulb.svg',
};

const publicationTags: Record<string, { bg: string; text: string }> = {
  "Policy brief": {
    bg: "bg-background-light-primary-second",
    text: "text-text-icons-light-primary",
  },
  Proceedings: {
    bg: "bg-background-light-success-second",
    text: "text-text-icons-light-success",
  },
  Publications: {
    bg: "bg-background-light-warning-second",
    text: "text-text-icons-light-warning",
  },
  "Technical Outputs": {
    bg: "bg-background-light-danger-second",
    text: "text-text-icons-light-danger",
  },
}

type pastPublication = {
  id?: string;
  title: string;
  description: string;
  tag: string;
  meta: string;
  file?: Record<string, unknown>;
  date?: string;
  source?: string;
} & Record<string, unknown>;

type HomepageBox = {
  id?: string;
  icon: 'globe' | 'stakeholder' | 'book' | 'bulb';
  title: string;
  description: string;
};


async function getPublications(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'latest_publications',
      limit: 10,
      sort: 'id',
      locale: locale as 'en' | 'id',
    });

    return result.docs || [];
  } catch (error) {
    console.error("Error fetching publications:", error);
    return [];
  }
}

async function getForum(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });

    const featuredResult = await payload.find({
      collection: 'events',
      limit: 1,
      where: {
        and: [
          {
            start_date: {
              greater_than: new Date(),
            },
          },
          {
            show_on_homepage: {
              equals: true,
            },
          },
        ],
      },
      sort: 'start_date',
      locale: locale as 'en' | 'id',
    });

    if (featuredResult.docs.length > 0) {
      return featuredResult.docs;
    }

    const result = await payload.find({
      collection: 'events',
      limit: 1,
      where: {
        start_date: {
          greater_than: new Date(),
        },
      },
      sort: 'start_date',
      locale: locale as 'en' | 'id',
    });

    return result.docs || [];
  } catch (error) {
    console.error("Error fetching forum events:", error);
    return [];
  }
}

async function getHomepageContent(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });

    const result = await payload.findGlobal({
      slug: 'homepage_content',
      locale: locale as 'en' | 'id',
      depth: 1,
    });

    return result;
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return null;
  }
}


export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  
  const pastPublications = await getPublications(locale);
  const upcomingForums = await getForum(locale);
  const homepageContent = await getHomepageContent(locale);

  const aboutBoxes = (homepageContent?.about_section?.boxes as HomepageBox[]) || [];
  const aboutLabel = (homepageContent?.about_section as Record<string, unknown>)?.label as string;
  const aboutTitle = (homepageContent?.about_section as Record<string, unknown>)?.title as string;
  const aboutDescription = (homepageContent?.about_section as Record<string, unknown>)?.description as string;

  const heroEvent = (homepageContent?.hero_section as Record<string, unknown>)?.featured_event as Record<string, unknown> | undefined;
  const upcomingForumEvent = (homepageContent?.upcoming_forum_section as Record<string, unknown>)?.featured_event as Record<string, unknown> | undefined;

  const heroSection = homepageContent?.hero_section as Record<string, unknown> | undefined;
  const heroRegisterCta = heroSection?.register_cta as string || 'Register Now';
  const heroExploreCta = heroSection?.explore_cta as string || 'Explore Publications';

  const upcomingForumSection = homepageContent?.upcoming_forum_section as Record<string, unknown> | undefined;
  const upcomingRegisterCta = upcomingForumSection?.register_cta as string || 'Register Now';
  const upcomingViewProgramCta = upcomingForumSection?.view_program_cta as string || 'View Program';

  const contactLabel = (homepageContent?.contact_section as Record<string, unknown>)?.label as string || 'Contact Us';
  const contactTitle = (homepageContent?.contact_section as Record<string, unknown>)?.title as string || 'Get in touch with the BSF team';
  const contactDescription = (homepageContent?.contact_section as Record<string, unknown>)?.description as string || "Whether you're interested in partnerships, have questions about the forum, or want to contribute to biodiversity science, we'd love to hear from you.";
  const contactItems = ((homepageContent?.contact_section as Record<string, unknown>)?.contact_items as Array<{ id?: string; label: string; value: string }>) || [];

  return (
    <>
      <Header locale={locale} />
      <main className="w-full">
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0" />
          <div className="relative mx-auto grid w-full gap-10 pb-16 pt-28 lg:grid-cols-[1.2fr_0.8fr] min-h-[820px]">
            <div className="px-8 md:px-12 lg:px-0 lg:pl-[100px] space-y-5 text-[#1f3b2c] flex flex-col justify-center lg:justify-start">
              <div className="text-[32px] md:text-[40px] lg:text-[56px] xl:text-[88px] font-semibold text-text-grey-dark leading-[1]">
                ASEAN Biodiversity
                <br />
                Science Forum
              </div>
              <p className="font-['inter'] text-[15px] md:text-[18px] lg:text-[20px] font-normal text-text-grey-dark">
                A hub for community to get the biodiversity science updates around ACB.
              </p>
            </div>
            <div className="px-8 md:px-12 lg:px-0 lg:pr-10 flex items-end lg:justify-end">
              <div className="flex flex-col gap-4 w-full sm:max-w-[480px] rounded-xl bg-white/75 p-6">
                <p className="text-base md:text-lg font-['inter'] font-semibold text-text-lime">
                  Upcoming Forum
                </p>
                <h3 className="text-[22px] md:text-[32px] lg:text-[38px] font-bold leading-[1.1] tracking-tight text-text-green">
                  {heroEvent?.title as string || "Connecting Biodiversity Science, Policy, and Action"}
                </h3>
                <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 rounded-lg bg-background-base-green/20 px-2 sm:px-4 py-2 text-text-green">
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="text-lg md:text-2xl font-bold leading-none tracking-normal text-text-green">{formatDateRange(heroEvent?.start_date as string, heroEvent?.end_date as string) || "14-19"}</span>
                  </div>
                  <div className="hidden sm:block h-7 w-[1.5px] h-[37px] bg-[#668270] shrink-0" />
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="text-lg md:text-2xl font-bold leading-none tracking-normal text-text-green">{formatParticipants(heroEvent?.participants as string) || "500+"}</span>
                    <span className="font-['inter'] text-xs md:text-base font-normal leading-none tracking-normal text-text-green">Participants</span>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                  <button className="font-[inter] h-[36px] flex items-center justify-center rounded-lg border border-outline-green bg-white px-4 py-[10px] text-sm font-semibold text-text-green transition-colors hover:bg-gray-50">
                    <Link href="/publications">{heroExploreCta}</Link>
                  </button>
                  <button className="font-[inter] h-[36px] flex items-center justify-center gap-2 rounded-lg bg-[#1f4a31] px-4 py-[10px] text-sm font-semibold text-white transition-colors hover:bg-[#163824]">
                    {heroRegisterCta}
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
        <section className="bg-[#101612] px-20 py-30 text-white">
          <div className="mx-auto grid w-full gap-16 lg:grid-cols-[1fr_1.1fr] ">
            <div className="flex flex-col w-full lg:max-w-[636px]">
              <p className="font-['inter'] text-[20px] font-semibold uppercase tracking-wider text-text-lime">
                {aboutLabel}
              </p>
              <div>
                <h2 className="mt-10 text-[32px] sm:text-[40px] font-semibold leading-[1.2] text-white">
                  {aboutTitle}
                </h2>
                <p className="mt-2 font-['inter'] font-normal text-[18px] sm:text-[20px] leading-[1.6] text-[#93a299]">
                  {aboutDescription}
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {aboutBoxes.map((box) => (
                <div
                  key={box.id || box.title}
                  className="rounded-[16px] min-h-[121px] flex flex-col justify-center bg-[#3f4a41] p-[24px]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={iconMap[box.icon] || '/globe.svg'}
                      alt={box.title}
                      width={22}
                      height={22}
                      style={{ width: "22px", height: "22px" }}
                      className="brightness-0 invert"
                    />
                    <h3 className="text-[18px] font-semibold text-white">{box.title}</h3>
                  </div>
                  <p className="font-['inter'] mt-2 whitespace-pre-line text-[13px] font-normal leading-[1.6] text-[#AFAFAF]">{box.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#e4ebd8] px-20 py-30">
          <div className="grid w-full gap-10 2xl:max-w-none lg:max-w-[1280px] lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex flex-col justify-center gap-6">
              <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">
                UPCOMING FORUM
              </p>
              <div className="flex flex-col gap-8">
                
                <span className="h-fit text-[2rem] font-semibold leading-[1] tracking-[0] text-text-black sm:text-[2.25rem] lg:text-[2.5rem]">
                  {upcomingForumEvent?.title as string || "Implementing the Global Biodiversity Framework"}
                </span>
                <p className="font-[inter] text-lg leading-[1.3] tracking-[0] text-[#697d70] sm:text-xl">
                  {upcomingForumEvent?.description as string || "The 6th ASEAN Biodiversity Science Forum will focus on the implementation of the Global Biodiversity Framework, fostering collaboration and knowledge exchange to drive biodiversity conservation efforts across the ASEAN region."}
                </p>
                <div className="flex flex-wrap gap-5">
                  <div className="flex w-full items-center gap-3 rounded-[12px] border border-outline-green-light bg-[#c3d4be] p-4 sm:w-auto">
                    <Image
                      src="/book.svg"
                      alt="Evidence-Based"
                      width={20}
                      height={18}
                      style={{ width: "20px", height: "18px" }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-text-green lg:text-2xl">{formatDateRange(upcomingForumEvent?.start_date as string, upcomingForumEvent?.end_date as string) || "10-12 November 2026"}</span>
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-3 rounded-[12px] border border-outline-green-light bg-[#c3d4be] p-4 sm:w-auto">
                    <Image
                      src="/book.svg"
                      alt="Location"
                      width={20}
                      height={18}
                      style={{ width: "20px", height: "18px" }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-text-green lg:text-2xl">{upcomingForumEvent?.location as string || "Jakarta, Indonesia"}</span>
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-3 rounded-[12px] border border-outline-green-light bg-[#c3d4be] p-4 sm:w-auto">
                    <Image
                      src="/book.svg"
                      alt="Participants"
                      width={20}
                      height={18}
                      style={{ width: "20px", height: "18px" }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-text-green lg:text-2xl">{formatParticipants(upcomingForumEvent?.participants as string) || "500+"} Expected</span>
                      <span className="font-['inter'] font-normal text-text-green">Participants</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <button className="h-[36px] w-full font-['inter'] flex items-center justify-center gap-[6px] rounded-[8px] bg-[#225139] px-[34px] py-[10px] text-sm font-semibold text-white transition-colors hover:bg-[#173e28] sm:w-auto">
                    {upcomingRegisterCta}
                    <Image
                        src="/arrow_right.svg"
                        alt="Arrow Right"
                        width={10}
                        height={9}
                        style={{ width: "10px", height: "9px" }}
                      />
                  </button>
                  <button className="h-[36px] w-full font-['inter'] flex items-center justify-center rounded-[8px] border border-[#225139] bg-white px-[2.5rem] py-[10px] text-sm font-semibold text-text-green transition-colors hover:bg-[#f6f9f5] sm:w-auto">
                    {upcomingViewProgramCta}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center lg:pl-2 xl:pl-6">
              <p className="font-['inter'] text-base font-bold uppercase tracking-wider text-text-green">
                KEY DATES
              </p>
              <div className="mt-6 space-y-6">
                {(() => {
                  const keyDates = (upcomingForumEvent?.key_dates as Array<{ date: string; label: string }>) || [];
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  
                  return keyDates.map((kd, index) => {
                    const kdDate = kd.date ? new Date(kd.date) : null;
                    let isPast = false;
                    let isToday = false;
                    let isFuture = false;
                    
                    if (kdDate) {
                      const kdDateOnly = new Date(kdDate);
                      kdDateOnly.setHours(0, 0, 0, 0);
                      isPast = kdDateOnly < today;
                      isToday = kdDateOnly.getTime() === today.getTime();
                      isFuture = kdDateOnly > today;
                    }
                    
                    let textColClass = "text-[#173e28]";
                    let textSubClass = "text-[#486e57]";
                    let dotClass = "bg-text-green";
                    
                    if (isPast) {
                      textColClass = "text-[#a4aba1]";
                      textSubClass = "text-[#a4aba1]";
                      dotClass = "bg-text-grey-light";
                    } else if (isToday) {
                      textColClass = "text-[#44a877]";
                      textSubClass = "text-[#44a877]";
                      dotClass = "bg-text-green ring-[3px] ring-text-green-light ring-offset-[#e4ebd8]";
                    }
                    
                    const formattedDate = kd.date ? new Date(kd.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }) : '';
                    
                    return (
                      <div key={index} className="relative flex gap-4">
                        <div className="relative z-10 mt-[6px] flex flex-col items-center w-[12px]">
                          <span className={`h-[10px] w-[10px] rounded-full flex-shrink-0 ${dotClass}`} />
                          {index < keyDates.length - 1 ? (
                            <span className="absolute top-[10px] h-[calc(100%+1.5rem)] w-[1.5px] bg-[#c3cdbe]" />
                          ) : null}
                        </div>
                        <div className="relative -top-[1px] flex flex-col gap-1">
                          <p className={`font-['inter'] text-[13px] tracking-wide font-light leading-none ${textColClass}`}>
                            {formattedDate}
                          </p>
                          <p className={`font-['inter'] text-base font-normal leading-tight ${textSubClass}`}>
                            {kd.label}
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white px-[80px] py-[120px] text-[#1b2d1f]">
          <div className="mx-auto flex w-full flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-['inter'] text-[20px] font-semibold uppercase text-[#b28d3c]">
                {(homepageContent?.publications_section as Record<string, unknown>)?.label as string || 'Latest Publication'}
              </p>
              <h2 className="font-semibold text-[40px] mt-4 font-semibold">
                {(homepageContent?.publications_section as Record<string, unknown>)?.title as string || 'Recent Knowledge Products'}
              </h2>
            </div>
            <Link href="/publications" className="text-[16px] font-semibold text-text-green hover:underline">
              {(homepageContent?.publications_section as Record<string, unknown>)?.view_all_text as string || 'View all publications →'}
            </Link>
          </div>
          <div className="mx-auto mt-8 w-full space-y-4">
            {(pastPublications as unknown as pastPublication[]).map((publication: pastPublication) => {
              const pubFile = publication.file as Record<string, unknown> | undefined;
              const fileUrl = pubFile?.url as string || '#';
              return (
                <div
                  key={publication.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e8e2] bg-[#fcfdfb] px-5 py-4"
                >
                  <div className="space-y-2">
                    <p className="text-[24px] font-semibold text-text-black">
                      {publication.title}
                    </p>
                    <p className="font-['inter'] text-[16px] leading-[24px] tracking-[0px] text-text-grey-mid">
                      {publication.description}
                    </p>
                    <p className="font-['inter'] text-[16px] text-text-grey-light">
                      {publication.date ? new Date(publication.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }) : publication.source}
                      {publication.file_type ? ` | ${publication.file_type}` : ''}
                    </p>
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:publications-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-['inter'] font-medium border rounded-md px-3 py-1 text-[14px] font-semibold ${publicationTags[publication.tag].bg} ${publicationTags[publication.tag].text}`}
                      >
                        {publication.tag}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                      <a href={fileUrl} target="_blank" download rel="noopener noreferrer">
                        <button className="flex h-[36px] flex-1 sm:flex-none sm:w-[136px] items-center justify-center gap-2 rounded-xl border border-text-green text-sm font-semibold text-text-green min-w-[120px]">
                          {(homepageContent?.publications_section as Record<string, unknown>)?.download_cta as string || 'Download'} <Image src="/download.svg" alt="Download Icon" width={16} height={16} />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              )},)}
          </div>
        </section>
        <section className="bg-background-base-green-light px-20 py-30">
          <div className="mx-auto grid w-full gap-[48px] lg:grid-cols-2 xl:grid-cols-[572px_1fr]">
            <div>
              <p className="font-['inter'] text-xl font-semibold uppercase text-text-lime">
                {contactLabel}
              </p>
              <h2 className="mt-4 text-[2.5rem] font-semibold text-text-black">
                {contactTitle}
              </h2>
              <p className="font-['inter'] mt-4 text-xl text-text-grey-mid">
                {contactDescription}
              </p>
              <div className="mt-10 flex flex-col gap-8 text-text-green">
                {contactItems.map((item) => (
                  <div key={item.id || item.label} className="flex items-center gap-4">
                    <Image
                      src="/book.svg"
                      alt={item.label}
                      width={22}
                      height={22}
                      style={{ width: "22px", height: "22px" }}
                    />
                    <div>
                      <p className="font-['inter'] text-lg font-semibold leading-6">{item.label}</p>
                      <p className="font-['inter'] text-base whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
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
