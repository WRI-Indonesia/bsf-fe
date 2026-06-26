import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import config from '../../../payload.config';

type AlbumItem = {
  id: string;
  title: string;
  cover_image: { url?: string; filename?: string };
  media_items?: Array<{ id?: string }>;
};

type PressRelease = {
  id: string;
  image: { url?: string; filename?: string };
  source_logo: { url?: string; filename?: string };
  source_name: string;
  title: string;
  date: string;
};

type ResourceItem = {
  id?: string;
  image: { url?: string; filename?: string };
  title: string;
  type: string;
  size: string;
  file?: { url?: string; filename?: string };
};

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

async function getAlbums(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'album_media',
      locale: locale as 'en' | 'id',
      depth: 2,
      limit: 9,
    });
    return result.docs || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

function getSectionField(section: Record<string, unknown> | undefined, field: string, defaultValue: string): string {
  return (section?.[field] as string) || defaultValue;
}

function getSectionArray<T>(section: Record<string, unknown> | undefined, field: string): T[] {
  return (section?.[field] as T[]) || [];
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function MediaPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  const mediaContent = await getMediaContent(locale);
  const albums = await getAlbums(locale);

  const photosSection = mediaContent?.photos_section as Record<string, unknown> | undefined;
  const photosLabel = getSectionField(photosSection, 'label', 'Gallery');
  const photosTitle = getSectionField(photosSection, 'title', 'Photos & Videos');
  const albumCountLabel = getSectionField(photosSection, 'album_count_label', 'Photos & Videos');
  const photosViewAllText = getSectionField(photosSection, 'view_all_text', 'Click here to see all albums');
  const photosViewAllLink = getSectionField(photosSection, 'view_all_link', '/media/gallery');

  const pressSection = mediaContent?.press_section as Record<string, unknown> | undefined;
  const pressLabel = getSectionField(pressSection, 'label', 'Press');
  const pressTitle = getSectionField(pressSection, 'title', 'Press Releases');
  const pressReleases = getSectionArray<PressRelease>(pressSection, 'press_releases');
  const pressViewAllText = getSectionField(pressSection, 'view_all_text', 'All Press Release');
  const pressViewAllLink = getSectionField(pressSection, 'view_all_link', '/media/press');

  const mediaKitSection = mediaContent?.media_kit_section as Record<string, unknown> | undefined;
  const kitLabel = getSectionField(mediaKitSection, 'label', 'Media Kit');
  const kitTitle = getSectionField(mediaKitSection, 'title', 'Media Resources');
  const kitResources = getSectionArray<ResourceItem>(mediaKitSection, 'resources');
  const kitViewAllText = getSectionField(mediaKitSection, 'view_all_text', 'All Media Kit');
  const kitViewAllLink = getSectionField(mediaKitSection, 'view_all_link', '/media/kit');

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <main className="w-full">
        <section id="photos" className="bg-text-white-broken px-20 py-30 mt-[98px]">
          <div className="flex flex-col gap-15 mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-12">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                {photosLabel}
              </p>
              <h1 className="text-[3.125rem] leading-[1] font-semibold text-text-grey-dark md:text-8xl">
                {photosTitle}
              </h1>
            </div>

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
                      <p className="mt-1 font-['inter'] text-[13px] text-text-grey-light">{mediaCount} {albumCountLabel}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Link
                href={photosViewAllLink}
                className="inline-flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-text-green hover:underline"
              >
                {photosViewAllText} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="news" className="bg-background-base-green-light px-20 py-30">
          <div className="flex flex-col lg:flex-row max-w-[1280px] gap-20 mx-auto">
            <div id="press" className="flex flex-col gap-6 w-full lg:max-w-[600px]">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                {pressLabel}
              </p>
              <h2 className="text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
                {pressTitle}
              </h2>

              <div className="mt-8 space-y-6">
                {pressReleases.map((release, index) => {
                  const releaseImg = getUploadUrl(release.image as unknown as Record<string, unknown>, '/media/business.png');
                  const sourceLogo = getUploadUrl(release.source_logo as unknown as Record<string, unknown>, '/media/cnn_logo.png');

                  function formatDate(dateStr: string) {
                    const date = new Date(dateStr);
                    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                  }
                  function slugify(value: string) {
                    return value.toLowerCase().trim().replace(/["']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                  }
                  const pressSlug = slugify(release.title);

                  return (
                    <Link key={release.id || index} href={`/media/press/${pressSlug}`} className="flex gap-6 items-center bg-white rounded-[20px] p-3 shadow-sm">
                      <div className="w-[120px] h-[100px] md:w-[220px] md:h-[140px] rounded-[12px] overflow-hidden relative flex-shrink-0">
                        <Image src={releaseImg} alt={release.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <Image src={sourceLogo} alt={release.source_name} width={28} height={28} />
                          <span className="text-sm text-text-grey-dark">{release.source_name}</span>
                        </div>
                        <h3 className="text-lg md:text-2xl font-semibold text-text-grey-dark leading-[100%]">
                          {release.title}
                        </h3>
                        <p className="text-text-green font-semibold text-sm md:text-base">{formatDate(release.date)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                href={pressViewAllLink}
                className="mt-6 inline-flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-text-green hover:underline"
              >
                {pressViewAllText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div id="kit" className="flex flex-col gap-6 w-full">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                {kitLabel}
              </p>
              <h2 className="text-[2rem] font-bold leading-[1] text-text-black md:text-[2.5rem]">
                {kitTitle}
              </h2>

              <div className="mt-7 space-y-6">
                {kitResources.map((resource) => {
                  const resourceImg = getUploadUrl(resource.image as unknown as Record<string, unknown>, '/media/cafe.png');
                  return (
                    <button
                      key={resource.id}
                      type="button"
                      className="flex w-full items-center gap-4 rounded-[14px] bg-white px-6 py-6 text-left shadow-[0_0_0_1px_rgba(17,26,19,0.04)]"
                    >
                      <div className="w-[45px] h-[60px] overflow-hidden relative flex-shrink-0">
                        <Image src={resourceImg} alt={resource.title} fill className="object-cover" />
                      </div>                    
                      <div className="min-w-0 flex flex-col flex-1 gap-1">
                        <p className="font-['inter'] text-lg font-semibold leading-[1] text-text-black">
                          {resource.title}
                        </p>
                        <p className="font-['inter'] text-base uppercase tracking-wide text-text-grey-dark">
                          {resource.type} {resource.size}
                        </p>
                      </div>
                      <span className="text-[20px] text-text-green" aria-hidden="true">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              <Link
                href={kitViewAllLink}
                className="mt-6 inline-flex items-center gap-2 font-['inter'] text-[16px] font-semibold text-text-green hover:underline"
              >
                {kitViewAllText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
