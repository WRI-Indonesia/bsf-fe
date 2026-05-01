import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getPayload } from "payload";
import config from "../../../../../payload.config";
import { cookies } from 'next/headers';

type PastEventImage = {
  filename: string;
};

type PastEvent = {
  id?: string | number;
  date?: string;
  title?: string;
  location?: string;
  participants?: string;
  image?: PastEventImage | string | null;
  article?: unknown;
} & Record<string, unknown>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDetailDate(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} - ${year}`;
}

function formatListDate(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getImageSrc(image?: PastEvent["image"]) {
  if (image && typeof image === "object" && "filename" in image) {
    return `/api/media/file/${image.filename}`;
  }

  return "/media/cafe.png";
}

function extractTextFromRichText(value: unknown): string {
  console.log(value)
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractTextFromRichText).filter(Boolean).join("\n");
  }

  if (typeof value === "object") {
    const node = value as Record<string, unknown>;

    if (typeof node.text === "string") {
      return node.text;
    }

    if (node.root) {
      return extractTextFromRichText(node.root);
    }

    if (Array.isArray(node.children)) {
      const childrenText = node.children
        .map(extractTextFromRichText)
        .filter(Boolean)
        .join("");
      const needsBreak = ["paragraph", "heading", "listitem", "list"].includes(
        String(node.type)
      );

      return needsBreak ? `${childrenText}\n` : childrenText;
    }
  }

  return "";
}

async function getPastEventDetail(slug: string, locale: string = 'en') {
  const payload = await getPayload({ config });
  const now = new Date();

  const listResult = await payload.find({
    collection: "events",
    where: {
      date: {
        less_than: now.toISOString(),
      },
    },
    limit: 50,
    sort: "-date",
    depth: 1,
    locale: locale as 'en' | 'id',
  });

  const pastEvents = (listResult.docs || []) as PastEvent[];
  const matchedEvent = pastEvents.find(
    (event) => slugify(event.title || "") === slug
  );

  if (!matchedEvent?.id) {
    return {
      event: null as PastEvent | null,
      relatedEvents: pastEvents,
    };
  }

  const event = (await payload.findByID({
    collection: "events",
    id: matchedEvent.id,
    depth: 1,
    locale: locale as 'en' | 'id',
  })) as PastEvent | null;

  return {
    event: event || matchedEvent,
    relatedEvents: pastEvents.filter((item) => item.id !== matchedEvent.id),
  };
}

export default async function PastEventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const { event, relatedEvents } = await getPastEventDetail(slug, locale);

  if (!event) {
    notFound();
  }

  const articleText = extractTextFromRichText(event.article).trim();
  const detailDate = formatDetailDate(event.date);
  const eventImage = getImageSrc(event.image);
  const related = relatedEvents.slice(0, 3);
  const eventTitle = event.title || "";

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center gap-10">
        <section className="flex flex-col mt-[98px] px-20 pt-30 gap-10 max-w-[1280px] overflow-hidden">
          <nav aria-label="Breadcrumb" className="mt-4 mb-6 flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Events</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/events/past_events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Past Events</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-medium text-text-green leading-[22px]">{eventTitle}</span>
          </nav>
          <div className="flex flex-col gap-5 lg:max-h-[800px]">
            <p className="font-semibold text-text-black lg:text-[3.625rem] md:text-2xl">{eventTitle}</p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px] bg-white rounded-xl px-9 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <main className="lg:col-span-2">
                <div className="flex flex-col gap-6 bg-white rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm text-text-grey-dark">
                      <div className="flex items-center gap-2">
                        <span className="font-[inter] font-semibold text-text-grey-mid">{detailDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/location.png" alt="Location" width={16} height={16} />
                        <span className="font-[inter] font-semibold text-text-grey-mid">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/participants.svg" alt="Participants" width={16} height={16} />
                        <span className="font-[inter] font-semibold text-text-grey-mid">{event.participants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                    <Image src={eventImage} alt={eventTitle || "Past event"} fill className="object-cover" />
                  </div>

                  <div className="text-text-grey-dark whitespace-pre-line font-[inter] text-text-grey-mid text-justify">
                    {articleText}
                  </div>
                </div>
              </main>

              <aside className="lg:col-span-1">
                <div className="flex flex-col bg-white rounded-2xl p-6 gap-2 border">
                  <h3 className="font-[inter] font-semibold text-lg text-text-main">Related Events</h3>
                  <div className="flex flex-col gap-4">
                    {related.map((relatedEvent, i) => (
                      <div key={String(relatedEvent.id) || i} className="flex flex-col gap-4">
                        <Link
                          href={`/events/past_events/${slugify(relatedEvent.title || "")}`}
                          className="flex items-stretch gap-4"
                        >
                          <div className="flex w-[160px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getImageSrc(relatedEvent.image)}
                              alt={relatedEvent.title || "Past event"}
                              width={160}
                              height={110}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-sm gap-2 justify-around">
                            <div className="flex flex-col text-sm">
                              <p className="font-[inter] font-semibold text-[#325B53] leading-[100%]">{relatedEvent.title}</p>
                            </div>
                            <div className="flex flex-col text-sm">
                              <p className="font-[inter] text-text-grey-mid text-sm">{formatListDate(relatedEvent.date)}</p>
                              <p className="font-[inter] text-text-grey-mid text-sm">{relatedEvent.location}</p>
                            </div>
                          </div>
                        </Link>
                        {i < related.length - 1 && (
                          <div className="h-[1px] w-full bg-outline-grey-light" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
