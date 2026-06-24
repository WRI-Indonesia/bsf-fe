import type { CollectionBeforeChangeHook, PayloadRequest } from "payload";

type RelationValue =
  | number
  | string
  | {
      id?: number | string | null;
    }
  | null
  | undefined;

type EventDoc = {
  id: number | string;
  [key: string]: unknown;
  is_upcoming_event?: boolean | null;
};

type EventResult = {
  docs: EventDoc[];
};

type MinimalPayload = {
  find: unknown;
};

const getRelationId = (value: RelationValue): number | string | null => {
  if (value == null) return null;
  if (typeof value === "object") return value.id ?? null;
  return value;
};

export const syncSingleUpcomingEvent: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!data || data.is_upcoming_event !== true) {
    return data;
  }

  const findEvents = req.payload.find as unknown as (
    args: Record<string, unknown>,
  ) => Promise<EventResult>;
  const updateEvent = req.payload.update as unknown as (
    args: Record<string, unknown>,
  ) => Promise<unknown>;

  const currentDocId =
    operation === "update"
      ? getRelationId(originalDoc?.id as RelationValue)
      : null;

  const existingUpcomingEvents = await findEvents({
    collection: "events",
    depth: 0,
    limit: 100,
    pagination: false,
    req,
    where: currentDocId
      ? {
          and: [
            {
              is_upcoming_event: {
                equals: true,
              },
            },
            {
              id: {
                not_equals: currentDocId,
              },
            },
          ],
        }
      : {
          is_upcoming_event: {
            equals: true,
          },
        },
  });

  await Promise.all(
    existingUpcomingEvents.docs.map((event) =>
      updateEvent({
        collection: "events",
        data: {
          is_upcoming_event: false,
        },
        id: event.id,
        req,
      }),
    ),
  );

  return data;
};

export async function getCanonicalUpcomingEvent(
  payload: MinimalPayload,
  locale: "en" | "id" = "en",
) {
  const findEvents = payload.find as unknown as (
    args: Record<string, unknown>,
  ) => Promise<EventResult>;

  const featuredResult = await findEvents({
    collection: "events",
    depth: 1,
    limit: 1,
    locale,
    pagination: false,
    sort: "start_date",
    where: {
      is_upcoming_event: {
        equals: true,
      },
    },
  });

  if (featuredResult.docs.length > 0) {
    return featuredResult.docs[0];
  }

  return null;

  // const fallbackResult = await findEvents({
  //   collection: 'events',
  //   depth: 1,
  //   limit: 1,
  //   locale,
  //   pagination: false,
  //   sort: 'start_date',
  //   where: {
  //     start_date: {
  //       greater_than: new Date().toISOString(),
  //     },
  //   },
  // });

  // return fallbackResult.docs[0] ?? null;
}
