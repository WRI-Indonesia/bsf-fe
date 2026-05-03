import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../../payload.config';

type AlbumItem = {
  id: string;
  title: string;
  cover_image: { url?: string; filename?: string };
  media_items?: Array<{ id?: string }>;
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

async function getAlbums(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'album_media',
      locale: locale as 'en' | 'id',
      depth: 2,
      limit: 100,
    });
    return result.docs || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const albums = await getAlbums(locale);

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

            <span className="font-[inter] font-semibold text-text-green leading-[22px]">Gallery</span>
          </nav>

          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-text-black xl:text-8xl lg:text-6xl md:text-4xl text-2xl">
              Gallery
            </h1>
            <p className="font-[inter] text-text-grey-dark text-xl font-normal">
              Explore our photo and video albums.
            </p>
          </div>
        </section>

        <section className="flex px-20 pb-30 2xl:justify-center">

          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => {
                const albumSlug = slugify(album.title);
                const imgUrl = getUploadUrl(album.cover_image as unknown as Record<string, unknown>, '/media/gallery.png');
                const mediaCount = album.media_items?.length || 0;
                return (
                  <Link
                    key={album.id}
                    href={`/media/${albumSlug}`}
                    className="flex flex-col rounded-[16px] overflow-hidden bg-white"
                  >
                    <div className="grid gap-3 p-4">
                      <div className="col-span-2">
                        <div className="relative w-full h-[180px] md:h-[220px] rounded-[12px] overflow-hidden">
                          <Image src={imgUrl} alt={album.title} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-6 text-center">
                      <p className="mt-2 font-['inter'] text-[16px] font-semibold text-text-black">{album.title}</p>
                      <p className="mt-1 font-['inter'] text-[13px] text-text-grey-light">{mediaCount} Photos &amp; Videos</p>
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