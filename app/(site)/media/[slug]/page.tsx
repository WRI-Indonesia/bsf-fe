import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../../payload.config';
import { notFound } from 'next/navigation';

type MediaItem = {
  id?: string;
  type: 'photo' | 'video';
  file: { url?: string; filename?: string };
  caption?: string;
};

type AlbumDetail = {
  id: string;
  title: string;
  cover_image: { url?: string; filename?: string };
  media_items?: MediaItem[];
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

async function getAlbumBySlug(slug: string, locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'album_media',
      locale: locale as 'en' | 'id',
      depth: 2,
      limit: 100,
    });
    const docs = result.docs || [];
    const album = docs.find((a) => slugify(a.title as string) === slug);
    return (album as unknown as AlbumDetail) || null;
  } catch (error) {
    console.error("Error fetching album:", error);
    return null;
  }
}

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const album = await getAlbumBySlug(slug, locale);

  if (!album) {
    notFound();
  }

  const mediaCount = album.media_items?.length || 0;

  return (
    <div className="min-h-screen bg-text-white-broken">
      <Header locale={locale} />
      <main className="flex flex-col 2xl:justify-center">
        <section className="flex flex-col mt-[98px] px-20 pt-30 pb-10 gap-12 max-w-[1400px] mx-auto w-full">
          <nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
            <Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Home</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Media</Link>
            <span className="text-text-grey-dark">/</span>
            <Link href="/media/gallery" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-[22px]">Gallery</Link>
            <span className="text-text-grey-dark">/</span>
            <span className="font-[inter] font-semibold text-text-green leading-[22px]">{album.title}</span>
          </nav>
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-text-black xl:text-[3.625rem] md:text-4xl text-2xl">
              {album.title}
            </h1>
            <p className="font-[inter] text-text-grey-mid text-lg font-normal">
              {mediaCount} Photos &amp; Videos
            </p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {album.media_items?.map((item) => {
                const fileUrl = getUploadUrl(item.file as unknown as Record<string, unknown>, '');
                if (item.type === 'video') {
                  return (
                    <div key={item.id} className="flex flex-col rounded-[16px] overflow-hidden bg-white">
                      <div className="p-4">
                        <div className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-black">
                          <video
                            src={fileUrl}
                            controls
                            className="w-full h-full object-cover"
                            poster={fileUrl}
                          />
                        </div>
                      </div>
                      {item.caption && (
                        <div className="px-4 pb-4 text-center">
                          <p className="font-['inter'] text-[14px] text-text-grey-dark">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={item.id} className="flex flex-col rounded-[16px] overflow-hidden bg-white">
                    <div className="p-4">
                      <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden">
                        <Image src={fileUrl} alt={item.caption || album.title} fill className="object-cover" />
                      </div>
                    </div>
                    {item.caption && (
                      <div className="px-4 pb-4 text-center">
                        <p className="font-['inter'] text-[14px] text-text-grey-dark">{item.caption}</p>
                      </div>
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
