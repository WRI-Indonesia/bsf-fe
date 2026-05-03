import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPayload } from 'payload';
import config from '../../../../payload.config';
import { cookies } from 'next/headers';
import { formatDateRange, formatParticipants } from '../../../../lib/helpers';

type pastEventImage = {
  filename: string;
};

type pastEvent = {
  id?: string;
  date: string;
  title: string;
  location: string;
  participants: string;
  image: pastEventImage;
} & Record<string, unknown>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getPastEvents(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const now = new Date();

    const result = await payload.find({
      collection: 'events',
      where: {
        and: [
          {
            end_date: {
              less_than: now.toISOString(),
            },
          },
          {
            key_date: {
              exists: false,
            },
          },
        ],
      },
      limit: 50,
      sort: '-start_date',
      locale: locale as 'en' | 'id',
    });

    return result.docs || [];
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}


export default async function PastEvents() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const pastEvents = await getPastEvents(locale);

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="w-full flex flex-col 2xl:justify-center">
        <section className="mt-[98px] px-20 py-30">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-10">
              <nav aria-label="Breadcrumb" className="mt-4 mb-6 flex items-center gap-5 text-sm text-text-grey-dark">
                <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
                <span className="text-text-grey-dark">/</span>
                <Link href="/events" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Events</Link>
                <span className="text-text-grey-dark">/</span>
                <span className="font-[inter] font-medium text-text-green leading-[22px]">Past Events</span>
              </nav>
              <div className="flex flex-col gap-5">
                <p className="font-semibold text-text-black xl:text-8xl lg:text-6xl md:text-2xl xl:leading-[90px]">
                  Past Events
                </p>
                <p className="font-[inter] text-text-grey-dark text-xl font-normal">
                  Explore our past events and activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex bg-text-white-broken px-20 py-30 2xl:justify-center">
          <div className="flex flex-col max-w-[1280px] mx-auto gap-20">
            <div className="grid gap-[48px] md:grid-cols-1 md:gap-y-[60px] lg:grid-cols-2 lg:gap-x-[60px] lg:gap-y-[72px]">
              {(pastEvents as unknown as pastEvent[]).map((event: pastEvent) => {
                const eventSlug = slugify(event.title || '');
                const eventImage =
                  event.image && typeof event.image === 'object'
                    ? `/api/media/file/${event.image.filename}`
                    : '/events_1.png';

                return (
                  <Link
                    key={event.id?.toString() || ''}
                    href={`/events/past_events/${eventSlug}`}
                    className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-6 items-start"
                  >
                    <div className="relative h-[190px] w-full overflow-hidden rounded-2xl md:h-[150px] md:w-[220px] lg:h-[190px] lg:w-[190px]">
                      <Image
                        src={eventImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-3 lg:h-full lg:max-h-[190px] lg:justify-between">
                      <p className="font-[inter] font-semibold text-text-green">
                        {formatDateRange(event.start_date as string, event.end_date as string)}
                      </p>
                      <h3 className="lg:text-xl xl:text-[1.75rem]/[100%] font-semibold text-text-grey-dark line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-col text-text-grey-dark">
                        <div className="flex items-center gap-2">
                          <Image src="/location.png" alt="Location" width={16} height={16} />
                          <span className="font-[inter] font-semibold text-text-grey-mid truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image src="/participants.svg" alt="Participants" width={16} height={16} />
                          <span className="font-[inter] font-semibold text-text-grey-mid">{formatParticipants(event.participants)}</span>
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