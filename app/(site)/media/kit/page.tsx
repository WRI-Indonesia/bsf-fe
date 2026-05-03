import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../../payload.config';

type ResourceItem = {
  id?: string;
  image: { url?: string; filename?: string };
  title: string;
  type: string;
  size: string;
  file?: { url?: string; filename?: string };
};

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

async function getMediaContent(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
      slug: 'media_content',
      locale: locale as 'en' | 'id',
      depth: 2,
    });
    return result;
  } catch (error) {
    console.error("Error fetching media content:", error);
    return null;
  }
}

export default async function MediaKitPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  const mediaContent = await getMediaContent(locale);
  const kitSection = mediaContent?.media_kit_section as Record<string, unknown> | undefined;
  const kitTitle = (kitSection?.title as string) || 'Media Kit';
  const kitResources = (kitSection?.resources as ResourceItem[]) || [];

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] px-20 pt-30 pb-10 gap-10 max-w-[1280px] mx-auto w-full">
          <nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-6">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-6">Media</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-semibold text-text-green leading-6">Media Kit</span>
          </nav>
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-text-black xl:text-8xl lg:text-6xl md:text-4xl text-2xl">
              {kitTitle}
            </h1>
            <p className="font-[inter] text-text-grey-dark text-xl font-normal">
              Download our media resources and brand assets.
            </p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {kitResources.map((resource) => {
                const resourceImg = getUploadUrl(resource.image as unknown as Record<string, unknown>, '/media/gallery.png');
                return (
                  <button
                    key={resource.id}
                    type="button"
                    className="flex items-center justify-between gap-6 rounded-2xl border border-outline-grey-light bg-white p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={resourceImg} alt={resource.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-[inter] text-lg font-semibold text-text-grey-dark">{resource.title}</p>
                        <p className="font-[inter] text-sm uppercase tracking-wide text-text-grey-mid">
                          {resource.type} {resource.size}
                        </p>
                      </div>
                    </div>
                    <span className="text-text-green text-xl" aria-hidden="true">→</span>
                  </button>
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
