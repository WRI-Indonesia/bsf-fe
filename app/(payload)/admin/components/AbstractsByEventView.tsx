import type { AdminViewServerProps, ListQuery } from 'payload';

import Link from 'next/link';
import { renderListView } from '@payloadcms/next/views';
import { combineWhereConstraints, formatAdminURL } from 'payload/shared';

type EventOption = {
  id: number | string;
  title?: string | null;
};

type SearchParamValue = string | string[] | undefined;

const getFirstSearchParam = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const getEventLabel = (event: EventOption) => event.title?.trim() || `Event ${event.id}`;

const getPreservedEntries = (
  searchParams: AdminViewServerProps['searchParams'],
): Array<[string, string]> => {
  if (!searchParams) {
    return [];
  }

  const entries: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === 'event' || key === 'page' || value == null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        entries.push([key, item]);
      }
      continue;
    }

    entries.push([key, value]);
  }

  return entries;
};

export async function AbstractsByEventView(props: AdminViewServerProps) {
  const {
    clientConfig,
    collectionConfig,
    initPageResult,
    payload,
    searchParams,
  } = props;

  if (!collectionConfig) {
    return null;
  }

  const selectedEvent = getFirstSearchParam(searchParams?.event);
  const eventsResult = await payload.find({
    collection: 'events',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    req: initPageResult.req,
    sort: 'start_date',
    user: initPageResult.req.user,
  });

  const query: ListQuery = {
    ...initPageResult.req.query,
  };

  if (selectedEvent) {
    query.where = combineWhereConstraints([
      query.where,
      {
        event: {
          equals: selectedEvent,
        },
      },
    ]);
  }

  const { List } = await renderListView({
    ...props,
    clientConfig,
    collectionConfig,
    enableRowSelections: true,
    initPageResult,
    query,
    viewType: 'list',
  });

  const adminRoute = payload.config.routes.admin;
  const listHref = formatAdminURL({
    adminRoute,
    path: `/collections/${collectionConfig.slug}`,
  });
  const byEventHref = formatAdminURL({
    adminRoute,
    path: `/collections/${collectionConfig.slug}/by-event`,
  });
  const preservedEntries = getPreservedEntries(searchParams);

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '0.5rem',
          padding: '1rem',
          background: 'var(--theme-bg)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            alignItems: 'end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Abstracts By Event</h1>
            <p style={{ margin: 0, color: 'var(--theme-elevation-600)' }}>
              Filter the abstracts list by event while keeping Payload&apos;s native table,
              search, and pagination behavior.
            </p>
          </div>

          <Link href={listHref} prefetch={false} style={{ whiteSpace: 'nowrap' }}>
            View all abstracts
          </Link>
        </div>

        <form
          action={byEventHref}
          method="get"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            alignItems: 'end',
            marginTop: '1rem',
          }}
        >
          {preservedEntries.map(([key, value], index) => (
            <input key={`${key}-${value}-${index}`} name={key} type="hidden" value={value} />
          ))}

          <label style={{ display: 'grid', gap: '0.35rem', minWidth: '18rem' }}>
            <span style={{ fontWeight: 600 }}>Event</span>
            <select
              defaultValue={selectedEvent ?? ''}
              name="event"
              style={{
                minHeight: '2.5rem',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                background: 'var(--theme-input-bg)',
                color: 'var(--theme-text)',
              }}
            >
              <option value="">All events</option>
              {eventsResult.docs.map((event) => (
                <option key={String(event.id)} value={String(event.id)}>
                  {getEventLabel(event)}
                </option>
              ))}
            </select>
          </label>

          <button
            style={{
              minHeight: '2.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--theme-elevation-250)',
              background: 'var(--theme-elevation-50)',
              color: 'var(--theme-text)',
              cursor: 'pointer',
            }}
            type="submit"
          >
            Apply filter
          </button>

          {selectedEvent ? (
            <Link href={byEventHref} prefetch={false} style={{ alignSelf: 'center' }}>
              Clear filter
            </Link>
          ) : null}
        </form>
      </div>

      {List}
    </div>
  );
}
