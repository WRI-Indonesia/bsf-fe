import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../../payload.config';

type PressItem = {
  id: string;
  image: { url?: string; filename?: string };
  source_logo: { url?: string; filename?: string };
  source_name: string;
  title: string;
  date: string;
  content?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getUploadUrl(item: Record<string, unknown> | undefined, fallback: string): string {
  if (!item) return fallback;
  const url = item.url as string;
  const filename = item.filename as string;
  const result = url || (filename ? `/api/media/file/${filename}` : fallback);
  try {
    const parsed = new URL(result);
    return parsed.pathname + parsed.search;
  } catch {
    return result;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function getPressReleases(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'press_media',
      locale: locale as 'en' | 'id',
      depth: 2,
      limit: 100,
      sort: '-date',
    });
    return result.docs || [];
  } catch (error) {
    console.error("Error fetching press releases:", error);
    return [];
  }
}

export default async function PressRelease() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const pressReleases = await getPressReleases(locale);

  return (
    <div className="min-h-screen bg-text-white-broken">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] px-20 pt-30 pb-10 gap-12 max-w-[1280px] mx-auto w-full">
          <nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Media</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-semibold text-text-green leading-[22px]">Press Releases</span>
          </nav>
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-text-black xl:text-8xl lg:text-6xl md:text-4xl text-2xl">
              Press Releases
            </h1>
            <p className="font-[inter] text-text-grey-dark text-xl font-normal">
              Latest news and announcements.
            </p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="space-y-6">
              {pressReleases.map((release, index) => {
                const pressItem = release as unknown as PressItem;
                const pressSlug = slugify(pressItem.title);
                const imgUrl = getUploadUrl(pressItem.image as unknown as Record<string, unknown>, '/media/business.png');
                const logoUrl = getUploadUrl(pressItem.source_logo as unknown as Record<string, unknown>, '/media/cnn_logo.png');
                return (
                  <div key={pressItem.id}>
                    <Link
                      href={`/media/press/${pressSlug}`}
                      className="flex items-start gap-6 py-6"
                    >
                      <div className="w-[96px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={imgUrl} alt={pressItem.title} width={96} height={72} className="object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <Image src={logoUrl} alt={pressItem.source_name} width={18} height={18} />
                          <span className="font-[inter] text-sm text-text-grey-dark">{pressItem.source_name}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-text-grey-dark leading-[1.05]">
                          {pressItem.title}
                        </h3>
                        <p className="text-text-green text-sm font-semibold">{formatDate(pressItem.date)}</p>
                      </div>
                    </Link>
                    {index < pressReleases.length - 1 && (
                      <hr className="border-t border-outline-grey-light" />
                    )}
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