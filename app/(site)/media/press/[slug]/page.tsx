import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../../../payload.config';
import { notFound } from 'next/navigation';

type PressItem = {
  id: string;
  image: { url?: string; filename?: string };
  source_logo: { url?: string; filename?: string };
  source_name: string;
  title: string;
  date: string;
  content?: string;
  related_press?: PressItem[];
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
  return url || (filename ? `/api/media/file/${filename}` : fallback);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function getPressBySlug(slug: string, locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'press_media',
      locale: locale as 'en' | 'id',
      depth: 2,
      limit: 100,
    });
    const docs = result.docs || [];
    const press = docs.find((p) => slugify(p.title as string) === slug);
    return (press as unknown as PressItem) || null;
  } catch (error) {
    console.error("Error fetching press release:", error);
    return null;
  }
}

export default async function PressDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const press = await getPressBySlug(slug, locale);

  if (!press) {
    notFound();
  }

  const imgUrl = getUploadUrl(press.image as unknown as Record<string, unknown>, '/media/business.png');
  const logoUrl = getUploadUrl(press.source_logo as unknown as Record<string, unknown>, '/media/cnn_logo.png');
  const relatedPress = press.related_press || [];

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] px-20 pt-30 pb-10 gap-10 max-w-[1280px] mx-auto w-full">
          <nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Media</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media/press" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Press Releases</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-medium text-text-green leading-[22px] line-clamp-1">{press.title}</span>
          </nav>
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-text-black lg:text-[3.625rem] md:text-4xl text-2xl">
              {press.title}
            </h1>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="bg-white rounded-xl px-9 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2">
                  <div className="flex flex-col gap-6 bg-white rounded-2xl">
                    <div className="flex items-center gap-6 text-sm text-text-grey-dark mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3">
                          <Image src={logoUrl} alt={press.source_name} width={18} height={18} />
                          <span className="font-[inter] text-sm text-text-grey-dark">{press.source_name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-[inter] font-semibold text-text-grey-mid">{formatDate(press.date)}</span>
                      </div>
                    </div>

                    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                      <Image src={imgUrl} alt={press.title} fill className="object-cover" />
                    </div>

                    {press.content && (
                      <div className="text-text-grey-dark whitespace-pre-line font-[inter] text-text-grey-mid text-justify">
                        {press.content}
                      </div>
                    )}
                  </div>
                </main>

                {relatedPress.length > 0 && (
                  <aside className="lg:col-span-1">
                    <div className="flex flex-col bg-white rounded-2xl p-6 gap-2 border">
                      <h3 className="font-[inter] font-semibold text-lg text-text-main">Related Press Release</h3>
                      <div className="flex flex-col gap-4">
                        {relatedPress.slice(0, 3).map((related, i) => {
                          const relatedImg = getUploadUrl(related.image as unknown as Record<string, unknown>, '/media/business.png');
                          const relatedSlug = slugify(related.title);
                          return (
                            <div key={related.id || i} className="flex flex-col gap-4">
                              <Link href={`/media/press/${relatedSlug}`} className="flex items-stretch gap-4">
                                <div className="flex w-[160px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
                                  <Image src={relatedImg} alt={related.title} width={160} height={110} className="object-cover" />
                                </div>
                                <div className="flex flex-col text-sm gap-2 justify-around">
                                  <div className="flex flex-col text-sm">
                                    <p className="font-[inter] font-semibold text-[#325B53] leading-[100%] line-clamp-2">{related.title}</p>
                                  </div>
                                  <div className="flex flex-col text-sm">
                                    <p className="font-[inter] text-text-grey-mid text-sm">{formatDate(related.date)}</p>
                                    <p className="font-[inter] text-text-grey-mid text-sm">{related.source_name}</p>
                                  </div>
                                </div>
                              </Link>
                              {i < Math.min(relatedPress.length, 3) - 1 && (
                                <div className="h-[1px] w-full bg-outline-grey-light" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
