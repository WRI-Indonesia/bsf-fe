import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPayload } from 'payload';
import config from '../../../payload.config';
import { cookies } from 'next/headers';
import YearFilter from './YearFilter';


async function getPublications(locale: string = 'en', page: number = 1, limit: number = 10, filters?: { tag?: string; file_type?: string; year?: string }) {
  try {
    const payload = await getPayload({ config });

    const where: Record<string, unknown> = {};

    if (filters?.tag && filters.tag !== 'All') {
      where.tag = { equals: filters.tag };
    }

    if (filters?.file_type) {
      where.file_type = { equals: filters.file_type };
    }

    if (filters?.year) {
      const yearNum = parseInt(filters.year, 10);
      if (!isNaN(yearNum)) {
        where.date = {
          greater_than_equal: new Date(`${yearNum}-01-01`).toISOString(),
          less_than: new Date(`${yearNum + 1}-01-01`).toISOString(),
        };
      }
    }

    const result = await payload.find({
      collection: 'latest_publications',
      limit,
      page,
      sort: '-date',
      locale: locale as 'en' | 'id',
      where: Object.keys(where).length > 0 ? (where as any) : undefined,
    });

    return {
      docs: result.docs || [],
      totalPages: result.totalPages || 0,
      page: result.page || 1,
      totalDocs: result.totalDocs || 0,
    };
  } catch (error) {
    console.error("Error fetching publications:", error);
    return { docs: [], totalPages: 0, page: 1, totalDocs: 0 };
  }
}

async function getPublicationsContent(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });

    const result = await payload.findGlobal({
      slug: 'publications_content',
      locale: locale as 'en' | 'id',
    });

    return result;
  } catch (error) {
    console.error("Error fetching publications content:", error);
    return null;
  }
}

async function getPublicationYears(locale: string = 'en') {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'latest_publications',
      limit: 1000,
      sort: '-date',
      locale: locale as 'en' | 'id',
    });

    const years = new Set<number>();
    result.docs.forEach(doc => {
      if (doc.date) {
        const year = new Date(doc.date).getFullYear();
        if (!isNaN(year)) {
          years.add(year);
        }
      }
    });

    return Array.from(years).sort((a, b) => b - a);
  } catch (error) {
    console.error("Error fetching publication years:", error);
    return [];
  }
}

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

export default async function Publications({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const params = await searchParams || {};
  
  const currentPage = parseInt((params.page as string) || '1', 10);
  const activeTag = (params.tag as string) || 'All';
  const activeFileType = (params.file_type as string) || '';
  const activeYear = (params.year as string) || '';

  const filters = {
    tag: activeTag !== 'All' ? activeTag : undefined,
    file_type: activeFileType || undefined,
    year: activeYear || undefined,
  };

  const { docs: PUBLICATIONS_DATA, totalPages, page, totalDocs } = await getPublications(locale, currentPage, 10, filters);
  const content = await getPublicationsContent(locale);
  const availableYears = await getPublicationYears(locale);

  const heroSection = content?.hero_section as Record<string, unknown> | undefined;
  const filtersSection = content?.filters_section as Record<string, unknown> | undefined;
  const paginationSection = content?.pagination_section as Record<string, unknown> | undefined;
  const downloadLabel = (content?.download_button_label as string) || 'Download';

  const heroLabel = (heroSection?.label as string) || 'PUBLICATIONS';
  const heroTitle = (heroSection?.title as string) || 'Featured Publications';
  const heroDescription = (heroSection?.description as string) || '';

  const allLabel = (filtersSection?.all_label as string) || 'All';
  const fileTypeLabel = (filtersSection?.file_type_label as string) || 'File Type';
  const pubYearLabel = (filtersSection?.publication_year_label as string) || 'Publication Year';

  const prevLabel = (paginationSection?.prev_label as string) || 'Prev';
  const nextLabel = (paginationSection?.next_label as string) || 'Next';

  const tabs = ["Proceedings", "Policy Brief", "Publications", "Technical Outputs", "Research Reports"];

  const fileTypeOptions = ['PDF', 'JPG', 'DOCX', 'ZIP'];

  const showPagination = totalPages > 1;

  return (
    <div className="min-h-screen bg-background-base-grey-light">
      <Header locale={locale} />

      <main className="w-full relative z-0">
        <section className="bg-background-base-lime-light mt-[98px] px-20 py-30">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col max-w-[800px] gap-12">
              <p className="font-['inter'] text-xl font-semibold uppercase tracking-widest text-text-lime">
                {heroLabel}
              </p>
              <h1 className="text-8xl font-semibold text-text-black leading-[96px] tracking-[0]">
                {heroTitle}
              </h1>
              <p className="font-['inter'] text-xl text-text-grey-dark">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-[40px] md:px-[80px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex w-fit bg-white rounded-2xl border border-[#e8efe8] p-3 overflow-x-auto gap-5 mb-10">
              <a
                href="/publications"
                className={`px-3 py-1 rounded-full text-[14px] font-semibold whitespace-nowrap ${
                  activeTag === 'All'
                    ? 'bg-background-base-lime-light text-text-green border border-text-green'
                    : 'text-text-grey-mid hover:bg-gray-50 transition-colors'
                }`}
              >
                {allLabel}
              </a>
              {tabs.map(tab => {
                const tagValue = tab === 'Policy Brief' ? 'Policy brief' : tab;
                const href = new URLSearchParams({ ...(params as Record<string, string>), tag: tagValue, page: '1' }).toString();
                return (
                  <a
                    key={tab}
                    href={`/publications?${href}`}
                    className={`font-['inter'] rounded-full text-sm font-semibold whitespace-nowrap transition-colors px-3 py-1 ${
                      activeTag === tagValue
                        ? 'bg-background-base-lime-light text-text-green border border-text-green'
                        : 'text-text-grey-mid hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-[240px] flex-shrink-0 flex flex-col gap-6">
                <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
                  <h3 className="font-bold text-[#111A13] text-[18px] mb-5">{fileTypeLabel}</h3>
                  <div className="flex flex-col gap-4 font-['inter']">
                    {fileTypeOptions.map(ft => {
                      const isActive = activeFileType === ft;
                      const newParams = new URLSearchParams(params as Record<string, string>);
                      if (isActive) {
                        newParams.delete('file_type');
                      } else {
                        newParams.set('file_type', ft);
                      }
                      newParams.set('page', '1');
                      return (
                        <a key={ft} href={`/publications?${newParams.toString()}`} className="flex items-center gap-3 cursor-pointer">
                          <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0 ${
                            isActive ? 'bg-[#265F44]' : 'border border-[#d1d5db]'
                          }`}>
                            {isActive && (
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            )}
                          </div>
                          <span className={`text-[15px] ${isActive ? 'font-bold text-text-black' : 'font-semibold text-[#111a13]'}`}>{ft}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <YearFilter years={availableYears} activeYear={activeYear} label={pubYearLabel} />

              </div>

              <div className="flex-1 flex flex-col gap-4">
                {PUBLICATIONS_DATA.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="font-['inter'] text-lg text-text-grey-mid">No publications found.</p>
                  </div>
                ) : (
                  PUBLICATIONS_DATA.map((pub, i) => {
                    const pubFile = (pub as unknown as Record<string, unknown>).file as Record<string, unknown> | undefined;
                    const fileUrl = pubFile?.url as string || '#';
                    return (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e8e2] bg-[#fcfdfb] px-5 py-4"
                      >
                        <h3 className="text-[24px] font-semibold text-text-black leading-[1.25]">{pub.title}</h3>
                        <p className="font-['inter'] text-[16px] leading-[24px] tracking-[0px] text-text-grey-mid">
                          {pub.description}
                        </p>
                        <p className="font-['inter'] text-[16px] text-text-grey-light">
                          {pub.source}{pub.date ? ` | ${new Date(pub.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}` : ''}{pub.file_type ? ` | ${pub.file_type}` : ''}
                        </p>
                        <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className={`font-['inter'] font-medium border rounded-md px-3 py-1 text-[14px] font-semibold ${publicationTags[pub.tag]?.bg || 'bg-gray-100'} ${publicationTags[pub.tag]?.text || 'text-gray-700'}`}>
                            {pub.tag}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                            <a href={fileUrl} target="_blank" download rel="noopener noreferrer">
                              <button className="flex h-[36px] flex-1 sm:flex-none sm:w-[136px] items-center justify-center gap-2 rounded-xl border border-text-green text-sm font-semibold text-text-green min-w-[120px]">
                                {downloadLabel}
                                <Image src="/download.svg" alt="Download Icon" width={16} height={16} />
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                {showPagination && (
                  <div className="mt-8 flex items-center justify-between pt-4">
                    {page > 1 ? (
                      <a
                        href={`/publications?${new URLSearchParams({ ...(params as Record<string, string>), page: String(page - 1) }).toString()}`}
                        className="flex items-center gap-2 text-[#515151] font-semibold text-[15px] hover:text-[#111a13]"
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        {prevLabel}
                      </a>
                    ) : (
                      <div></div>
                    )}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 font-semibold text-[15px] text-[#515151]">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                        const isActive = p === page;
                        return (
                          <a
                            key={p}
                            href={`/publications?${new URLSearchParams({ ...(params as Record<string, string>), page: String(p) }).toString()}`}
                            className={isActive ? 'text-[#0A77FF]' : 'hover:text-[#111a13]'}
                          >
                            {p}
                          </a>
                        );
                      })}
                    </div>
                    {page < totalPages ? (
                      <a
                        href={`/publications?${new URLSearchParams({ ...(params as Record<string, string>), page: String(page + 1) }).toString()}`}
                        className="flex items-center gap-2 text-[#515151] font-semibold text-[15px] hover:text-[#111a13]"
                      >
                        {nextLabel}
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    ) : (
                      <div></div>
                    )}
                  </div>
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