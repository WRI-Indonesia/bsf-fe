import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "../../../payload.config";
import { formatDateRange } from "../../../lib/helpers";
import { getVisibleKeyDates } from "@/lib/event-key-dates";
import { getCanonicalUpcomingEvent } from "@/lib/upcoming-event";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SocialLinks = {
  x?: string;
  facebook?: string;
  linkedin?: string;
  telegram?: string;
};

type Speaker = {
  id?: string;
  name: string;
  role: string;
  image?: { url?: string };
  description: string;
  social_links?: SocialLinks;
};

type ThematicItem = {
  id?: string;
  title: string;
  description: string;
};

type ButtonItem = {
  id?: string;
  text: string;
  url?: string;
  style: "primary" | "secondary";
  show_arrow?: boolean;
};

function getSectionField(
  section: Record<string, unknown> | undefined,
  field: string,
  defaultValue: string,
): string {
  return (section?.[field] as string) || defaultValue;
}

function getSectionArray<T>(
  section: Record<string, unknown> | undefined,
  field: string,
): T[] {
  return (section?.[field] as T[]) || [];
}

function getUploadUrl(
  section: Record<string, unknown> | undefined,
  field: string,
  fallback: string,
): string {
  const fieldValue = section?.[field];
  if (!fieldValue) return fallback;
  if (typeof fieldValue === "string") return fieldValue;
  if (typeof fieldValue === "object" && fieldValue !== null) {
    let url =
      ((fieldValue as Record<string, unknown>)?.url as string) || fallback;
    try {
      const parsed = new URL(url);
      url = parsed.pathname + parsed.search;
    } catch {}
    return url;
  }
  return fallback;
}

async function getEventsContent(locale: string = "en") {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: "events_content",
      locale: locale as "en" | "id",
      depth: 2,
    });
    return result;
  } catch (error) {
    console.error("Error fetching events content:", error);
    return null;
  }
}

async function getUpcomingEvent(locale: string = "en") {
  try {
    const payload = await getPayload({ config });
    return await getCanonicalUpcomingEvent(payload, locale as "en" | "id");
  } catch (error) {
    console.error("Error fetching upcoming event:", error);
    return null;
  }
}

async function getPastEvents(locale: string = "en") {
  try {
    const payload = await getPayload({ config });
    const now = new Date();

    const result = await payload.find({
      collection: "events",
      limit: 6,
      where: {
        end_date: {
          less_than: now.toISOString(),
        },
      },
      sort: "-start_date",
      locale: locale as "en" | "id",
    });
    return result.docs || [];
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}

export default async function Events() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  const eventsContent = await getEventsContent(locale);
  const upcomingEvent = await getUpcomingEvent(locale);
  const keyDates = getVisibleKeyDates(
    upcomingEvent as
      | {
          key_dates?: Array<{
            date: string;
            label: string;
            show?: boolean;
          }> | null;
        }
      | null
      | undefined,
  );
  const pastEvents = await getPastEvents(locale);

  // Hero section
  const heroSection = eventsContent?.hero_section as
    | Record<string, unknown>
    | undefined;
  const heroLabel = getSectionField(heroSection, "label", "UPCOMING FORUM");
  const heroTitle = (upcomingEvent?.title as string) || "";
  const heroDate =
    formatDateRange(
      upcomingEvent?.start_date as string,
      upcomingEvent?.end_date as string,
    ) || "TBD";
  const heroLocation = (upcomingEvent?.location as string) || "";
  const heroParticipants = (upcomingEvent?.participants as string) || "";
  const heroDescription = (upcomingEvent?.description as string) || "";
  const heroImage = getUploadUrl(
    heroSection,
    "image",
    ((upcomingEvent?.image as Record<string, unknown>)?.url as string) ||
      "/events/hero.png",
  );
  const heroButtons = getSectionArray<ButtonItem>(heroSection, "buttons");
  const abstractCtaText = getSectionField(
    heroSection,
    "abstract_cta_text",
    "Submit your Abstract",
  );
  const registrationNote = getSectionField(
    heroSection,
    "registration_note",
    "note : Registration is by invitation only, selected authors will receive an email link after abstract review.",
  );
  const featuredEventId =
    typeof upcomingEvent?.id === "string"
      ? upcomingEvent.id
      : typeof upcomingEvent?.id === "number"
        ? String(upcomingEvent.id)
        : "";
  const abstractSubmissionHref = featuredEventId
    ? `/submit-abstract?event=${encodeURIComponent(featuredEventId)}`
    : "/events";

  // Key dates section
  const keyDatesSection = eventsContent?.key_dates_section as
    | Record<string, unknown>
    | undefined;
  const keyDatesLabel = getSectionField(
    keyDatesSection,
    "label",
    "IMPORTANT DATES",
  );
  const keyDatesTitle = getSectionField(
    keyDatesSection,
    "title",
    "Key dates & Deadlines",
  );

  // Thematic areas section
  const thematicSection = eventsContent?.thematic_areas_section as
    | Record<string, unknown>
    | undefined;
  const thematicLabel = getSectionField(thematicSection, "label", "Programme");
  const thematicTitle = getSectionField(
    thematicSection,
    "title",
    "Thematic Areas",
  );
  const thematicItems = (upcomingEvent?.thematic_areas as ThematicItem[]) || [];

  // Speakers section
  const speakersSection = eventsContent?.speakers_section as
    | Record<string, unknown>
    | undefined;
  const speakersLabel = getSectionField(
    speakersSection,
    "label",
    "Keynote Speakers",
  );
  const speakersTitle = getSectionField(
    speakersSection,
    "title",
    "Featured Speakers",
  );
  const speakers = getSectionArray<Speaker>(speakersSection, "speakers");

  // Sessions section
  const sessionsSection = eventsContent?.sessions_section as
    | Record<string, unknown>
    | undefined;
  const sessionsLabel = getSectionField(sessionsSection, "label", "Session");
  const sessionsTitle = getSectionField(sessionsSection, "title", "Sessions");
  const sessionItems = (upcomingEvent?.sessions as ThematicItem[]) || [];

  // Registration section
  const registrationSection = eventsContent?.registration_section as
    | Record<string, unknown>
    | undefined;
  const registrationLabel = getSectionField(
    registrationSection,
    "label",
    "Participate",
  );
  const registrationTitle = getSectionField(
    registrationSection,
    "title",
    "Registration",
  );
  const leftBox = registrationSection?.left_box as
    | Record<string, unknown>
    | undefined;
  const rightBox = registrationSection?.right_box as
    | Record<string, unknown>
    | undefined;

  // Past events section
  const pastEventsSection = eventsContent?.past_events_section as
    | Record<string, unknown>
    | undefined;
  const pastEventsLabel = getSectionField(
    pastEventsSection,
    "label",
    "Archive",
  );
  const pastEventsTitle = getSectionField(
    pastEventsSection,
    "title",
    "Past Events",
  );
  const pastEventsViewAll = getSectionField(
    pastEventsSection,
    "view_all_text",
    "View all past events",
  );

  const buttonStyles: Record<string, string> = {
    primary: "bg-text-green text-text-white-broken",
    secondary: "bg-text-white-broken text-text-green",
  };

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <main className="w-full">
        {upcomingEvent && (
          <>
            <section className="bg-background-base-dark mt-[98px] py-30 overflow-hidden">
              <div className="flex flex-col xl:flex-row px-10 md:px-20 items-stretch gap-30">
                <div
                  className="flex flex-col z-10 text-white w-full xl:w-[703px] xl:h-[552px] gap-12 shrink-0 justify-center"
                  id="upcoming_forum"
                >
                  <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                    {heroLabel}
                  </p>
                  <h1 className="text-5xl md:text-7xl xl:text-8xl font-semibold leading-tight xl:leading-[96px] text-text-white-broken tracking-tight">
                    {heroTitle}
                  </h1>
                  <div className="flex flex-wrap font-['inter'] text-[16px] justify-between text-text-grey-light">
                    <div>{heroDate}</div>
                    <div>{heroLocation}</div>
                    <div>{heroParticipants}</div>
                  </div>
                  <p className="font-['inter'] text-xl text-text-grey-light">
                    {heroDescription}
                  </p>
                  <div className="flex flex-row gap-3 max-w-[373px]">
                    {heroButtons.map((button, i) => (
                      <Link key={button.id || i} href={button.url || "#"}>
                        <button
                          className={`flex font-[inter] text-sm justify-center w-full items-center gap-[6px] ${buttonStyles[button.style] || buttonStyles.primary} rounded-[8px] px-[10px] py-[16px] h-[36px] font-semibold`}
                        >
                          {button.text}
                          {button.show_arrow && (
                            <Image
                              src="/arrow_right.svg"
                              alt="Arrow Right"
                              width={10}
                              height={9}
                              style={{ width: "10px", height: "9px" }}
                            />
                          )}
                        </button>
                      </Link>
                    ))}
                  </div>
                  <div className="flex w-full flex-col items-center justify-end gap-3">
                    <Link href={abstractSubmissionHref} className="w-full">
                      <div className="flex h-12 w-full items-center justify-center gap-[6px] rounded-[8px] bg-text-green px-4 py-[10px] font-['inter'] text-[20px] leading-none font-semibold text-text-white-broken shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-opacity hover:opacity-95">
                        <span>{abstractCtaText}</span>
                        <Image
                          src="/arrow_right.svg"
                          alt="Arrow Right"
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px]"
                        />
                      </div>
                    </Link>
                    <p className="w-full font-['inter'] text-[14px] leading-none text-text-grey-light">
                      {registrationNote}
                    </p>
                  </div>
                </div>
                <div className="relative h-[320px] md:h-[420px] -mr-10 md:-mr-20 block xl:hidden">
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

            {keyDates.length > 0 && (
              <section className="flex justify-center bg-white px-6 py-16 md:px-20 md:py-30">
                <div className="flex flex-col max-w-[1400px] text-center items-center gap-10 w-full">
                  <div className="flex flex-col md:max-w-[572px]">
                    <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                      {keyDatesLabel}
                    </p>
                    <p className="text-[2.5rem] font-semibold text-text-black">
                      {keyDatesTitle}
                    </p>
                  </div>
                  <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5">
                    {keyDates.map((keyDate, i) => {
                      const formattedDate = keyDate.date
                        ? new Date(keyDate.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "";
                      return (
                        <div
                          key={`${featuredEventId || "upcoming-event"}-${i}`}
                          className="flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-outline-grey-light gap-3 bg-background-base-grey-light"
                        >
                          <Image
                            src="/book.svg"
                            alt="Important Date"
                            width={24}
                            height={38}
                            style={{ width: "24px", height: "38px" }}
                          />
                          <div className="flex flex-col gap-3">
                            <p className="font-semibold text-lg text-text-black">
                              {formattedDate}
                            </p>
                            <p className="font-['inter'] text-base font-normal leading-[100%] text-text-grey-dark">
                              {keyDate.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {thematicItems.length > 0 && (
              <section className="flex bg-background-base-lime-light px-20 py-30 2xl:justify-center">
                <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
                  <div className="flex flex-col 2xl:items-center">
                    <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                      {thematicLabel}
                    </p>
                    <p className="text-[2.5rem] font-semibold text-text-black">
                      {thematicTitle}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {thematicItems.map((item, i) => (
                      <div
                        key={item.id || i}
                        className="bg-white p-8 rounded-[20px]"
                      >
                        <h3 className="font-bold text-text-black text-[20px]">
                          {item.title}
                        </h3>
                        <p className="font-['inter'] text-text-grey-dark text-[15px] leading-[1.6]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {speakers.length > 0 && (
              <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
                <div className="flex flex-col max-w-[1400px] gap-10 2xl:items-center">
                  <div className="flex flex-col 2xl:items-center gap-6">
                    <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                      {speakersLabel}
                    </p>
                    <p className="text-[2.5rem] font-semibold text-text-black">
                      {speakersTitle}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {speakers.map((speaker, i) => {
                      const speakerImg = getUploadUrl(
                        speaker as unknown as Record<string, unknown>,
                        "image",
                        "/events/speaker_1.png",
                      );
                      const socialLinks = speaker.social_links as
                        | SocialLinks
                        | undefined;

                      return (
                        <div
                          key={speaker.id || i}
                          className="flex flex-col sm:flex-row gap-6 bg-[#FaFaFa] rounded-2xl p-4 items-center sm:items-start"
                        >
                          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] flex-shrink-0">
                            <Image
                              src={speakerImg}
                              alt={speaker.name}
                              fill
                              className="object-cover rounded-xl"
                            />
                          </div>
                          <div className="flex flex-col justify-center h-full gap-8">
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col">
                                <p className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-text-black">
                                  {speaker.name}
                                </p>
                                <p className="font-['inter'] text-text-icons-light-primary">
                                  {speaker.role}
                                </p>
                              </div>
                              <p className="font-['inter'] text-text-grey-mid">
                                {speaker.description}
                              </p>
                            </div>
                            <div className="flex gap-4 items-center">
                              {(
                                [
                                  "x",
                                  "linkedin",
                                  "facebook",
                                  "telegram",
                                ] as const
                              ).map((platform) => {
                                const platformRoots: Record<string, string> = {
                                  x: "https://x.com",
                                  facebook: "https://facebook.com",
                                  linkedin: "https://linkedin.com",
                                  telegram: "https://t.me",
                                };
                                const url = socialLinks?.[platform];
                                let href =
                                  url && url.trim() !== "" && url !== "null"
                                    ? url
                                    : platformRoots[platform];
                                if (
                                  href &&
                                  !href.startsWith("http://") &&
                                  !href.startsWith("https://")
                                ) {
                                  href = "https://" + href;
                                }
                                return (
                                  <Link
                                    key={platform}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-5 h-5 flex items-center justify-center text-text-black"
                                  >
                                    <Image
                                      alt={platform}
                                      src={`/${platform}.svg`}
                                      width={20}
                                      height={20}
                                    />
                                  </Link>
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
            )}

            {sessionItems.length > 0 && (
              <section className="flex bg-background-base-green-light px-20 py-30 2xl:justify-center">
                <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
                  <div className="flex flex-col 2xl:items-center">
                    <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                      {sessionsLabel}
                    </p>
                    <p className="text-[2.5rem] font-semibold text-text-black uppercase">
                      {sessionsTitle}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessionItems.map((item, i) => (
                      <div
                        key={item.id || i}
                        className="flex flex-col bg-white p-6 gap-3 rounded-[20px]"
                      >
                        <h3 className="font-[inter] font-semibold text-text-black text-base">
                          {item.title}
                        </h3>
                        <p className="font-[inter] text-text-grey-dark text-base">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="hidden flex bg-background-base-green-mid px-20 py-30 2xl:justify-center">
              <div className="flex flex-col max-w-[1400px] gap-20 2xl:items-center">
                <div className="flex flex-col 2xl:items-center">
                  <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-green">
                    {registrationLabel}
                  </p>
                  <p className="text-[2.5rem] font-semibold text-text-black uppercase">
                    {registrationTitle}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {[leftBox, rightBox].map((box, i) => {
                    if (!box) return null;
                    const icon = (box.icon as string) || "document_green.png";
                    const boxTitle = (box.title as string) || "";
                    const boxDesc = (box.description as string) || "";
                    const boxButton = (box.button_text as string) || "Register";
                    const boxButtonUrl = (box.button_url as string) || "#";

                    return (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-[16px] flex flex-col sm:flex-row gap-6 items-center"
                      >
                        <div className="flex flex-row gap-5 items-start flex-1">
                          <div className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl">
                            <Image
                              src={`/${icon}`}
                              alt="Document"
                              width={50}
                              height={50}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <p className="font-semibold text-text-grey-dark text-[1.6rem] leading-[1.1] tracking-[0]">
                              {boxTitle}
                            </p>
                            <p className="font-['inter'] text-text-grey-dark text-base">
                              {boxDesc}
                            </p>
                          </div>
                        </div>
                        <Link href={boxButtonUrl}>
                          <button className="font-[inter] sm:ml-auto h-[36px] px-6 bg-text-green text-text-white-broken rounded-xl text-sm font-semibold flex items-center justify-center self-end">
                            {boxButton}
                          </button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1400px] gap-20">
            <div className="flex flex-col">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                {pastEventsLabel}
              </p>
              <div
                className="flex flex-col md:flex-row md:items-end justify-between"
                id="past_events"
              >
                <h2 className="text-[42px] md:text-[48px] font-bold text-text-black">
                  {pastEventsTitle}
                </h2>
                <Link
                  href="/events/past_events"
                  className="flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-[#1f4a31] hover:underline"
                >
                  {pastEventsViewAll} <span>→</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-[48px] md:grid-cols-1 grid-flow-row md:gap-y-[60px] lg:grid-cols-2 lg:gap-x-[60px] lg:gap-y-[72px]">
              {pastEvents.map((event, i) => {
                const eventImg = getUploadUrl(
                  event as unknown as Record<string, unknown>,
                  "image",
                  "/events_1.png",
                );
                const eventDate =
                  formatDateRange(
                    event.start_date as string,
                    event.end_date as string,
                  ) || "";
                const eventSlug = slugify((event.title as string) || "");
                return (
                  <Link
                    key={event.id || i}
                    href={`/events/past_events/${eventSlug}`}
                    className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-6 items-start lg:grid-cols-[190px_1fr] group"
                  >
                    <div className="relative h-[190px] w-full overflow-hidden rounded-2xl md:h-[150px] md:w-[220px] lg:h-[190px] lg:w-[190px]">
                      <Image
                        src={eventImg}
                        alt={event.title as string}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-3 lg:h-full lg:max-h-[190px] lg:justify-between">
                      <p className="font-[inter] font-semibold text-text-green">
                        {eventDate}
                      </p>
                      <h3 className="lg:text-xl xl:text-[1.75rem]/[100%] font-semibold text-text-grey-dark line-clamp-2 group-hover:text-text-green transition-colors">
                        {event.title as string}
                      </h3>
                      <div className="flex flex-col text-text-grey-dark">
                        <div className="flex items-center gap-2">
                          <Image
                            alt="Location"
                            src="/globe.svg"
                            width={16}
                            height={16}
                          />
                          <p className="font-['inter'] text-[14px] truncate">
                            {event.location as string}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image
                            alt="Participants"
                            src="/participants.svg"
                            width={16}
                            height={16}
                          />
                          <p className="font-['inter'] text-[14px]">
                            {event.participants as string}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
