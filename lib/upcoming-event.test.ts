import assert from 'node:assert/strict';
import test from 'node:test';

import { getCanonicalUpcomingEvent, syncSingleUpcomingEvent } from './upcoming-event';

test('syncSingleUpcomingEvent unchecks any other upcoming events when saving a checked event', async () => {
  const updatedIds: Array<number | string> = [];

  const result = await syncSingleUpcomingEvent(
    {
      collection: {} as never,
      context: {} as never,
      data: {
        is_upcoming_event: true,
      },
      operation: 'update',
      originalDoc: {
        id: 'event-current',
      },
      req: {
        payload: {
          find: async () => ({
            docs: [
              { id: 'event-1', is_upcoming_event: true },
              { id: 'event-2', is_upcoming_event: true },
            ],
          }),
          update: async ({
            id,
          }: {
            collection: string;
            data: Record<string, unknown>;
            id: number | string;
          }) => {
            updatedIds.push(id);
            return {};
          },
        },
      } as never,
    } as Parameters<typeof syncSingleUpcomingEvent>[0],
  );

  assert.deepEqual(result, {
    is_upcoming_event: true,
  });
  assert.deepEqual(updatedIds, ['event-1', 'event-2']);
});

test('syncSingleUpcomingEvent leaves other events alone when unchecked', async () => {
  let findCalls = 0;
  let updateCalls = 0;

  const result = await syncSingleUpcomingEvent(
    {
      collection: {} as never,
      context: {} as never,
      data: {
        is_upcoming_event: false,
      },
      operation: 'update',
      originalDoc: {
        id: 'event-current',
      },
      req: {
        payload: {
          find: async () => {
            findCalls += 1;
            return { docs: [] };
          },
          update: async () => {
            updateCalls += 1;
            return {};
          },
        },
      } as never,
    } as Parameters<typeof syncSingleUpcomingEvent>[0],
  );

  assert.deepEqual(result, {
    is_upcoming_event: false,
  });
  assert.equal(findCalls, 0);
  assert.equal(updateCalls, 0);
});

test('getCanonicalUpcomingEvent prefers the explicitly flagged event', async () => {
  const calls: Array<Record<string, unknown>> = [];

  const event = await getCanonicalUpcomingEvent(
    {
      find: async (args: unknown) => {
        const query = args as { where: Record<string, unknown> };
        calls.push(query.where);
        return {
          docs: [{ id: 'flagged-event', is_upcoming_event: true }],
        };
      },
    },
    'en',
  );

  assert.equal((event as { id?: string } | null)?.id, 'flagged-event');
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], {
    is_upcoming_event: {
      equals: true,
    },
  });
});

test('getCanonicalUpcomingEvent falls back to the nearest future event when nothing is flagged', async () => {
  const calls: Array<Record<string, unknown>> = [];

  const event = await getCanonicalUpcomingEvent(
    {
      find: async (args: unknown) => {
        const query = args as { where: Record<string, unknown> };
        calls.push(query.where);

        if (calls.length === 1) {
          return { docs: [] };
        }

        return {
          docs: [{ id: 'future-event' }],
        };
      },
    },
    'en',
  );

  assert.equal((event as { id?: string } | null)?.id, 'future-event');
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0], {
    is_upcoming_event: {
      equals: true,
    },
  });
  assert.ok('start_date' in calls[1]);
});
