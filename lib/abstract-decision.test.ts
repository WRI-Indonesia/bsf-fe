import assert from 'node:assert/strict';
import test from 'node:test';

import { acceptAbstract, rejectAbstract } from '@/lib/abstract-decision';

type TestState = {
  abstractStatus: string;
  createdRegistrations: number;
  deletedRegistrationIds: Array<number | string>;
  emailCount: number;
  existingRegistration: null | {
    id: number | string;
    registrationKey: string;
  };
};

const createPayloadFixture = (state: TestState) => {
  const payload = {
    collections: {
      abstracts: {
        config: {
          slug: 'abstracts',
        },
      },
    },
    create: async () => {
      state.createdRegistrations += 1;
      state.existingRegistration = {
        id: 'registration-new',
        registrationKey: 'reg-new',
      };

      return state.existingRegistration;
    },
    delete: async ({ id }: { id: number | string }) => {
      state.deletedRegistrationIds.push(id);
      return {};
    },
    email: {
      defaultFromAddress: 'no-reply@example.com',
      defaultFromName: 'ASEAN Biodiversity Science Forum',
    },
    find: async () => ({
      docs: state.existingRegistration ? [state.existingRegistration] : [],
    }),
    findByID: async ({
      collection,
    }: {
      collection: string;
      id: number | string;
    }) => {
      if (collection === 'abstracts') {
        return {
          event: 'event-1',
          id: 'abstract-1',
          main_author: 'Jane Doe',
          status: state.abstractStatus,
          title: 'Protecting Wetlands',
          user: 'public-user-1',
        };
      }

      if (collection === 'events') {
        return {
          id: 'event-1',
          title: 'ASEAN Biodiversity Forum',
        };
      }

      if (collection === 'public-users') {
        return {
          email: 'submitter@example.com',
          id: 'public-user-1',
        };
      }

      throw new Error(`Unexpected collection ${collection}`);
    },
    sendEmail: async () => {
      state.emailCount += 1;
    },
    update: async ({
      data,
      id,
    }: {
      collection: string;
      data: { status: string };
      id: number | string;
    }) => {
      state.abstractStatus = data.status;

      return {
        id,
        status: data.status,
      };
    },
  };

  return payload;
};

test('accepting an abstract creates a registration, sends email, and updates status', async () => {
  const state: TestState = {
    abstractStatus: 'submitted',
    createdRegistrations: 0,
    deletedRegistrationIds: [],
    emailCount: 0,
    existingRegistration: null,
  };

  const result = await acceptAbstract({
    id: 'abstract-1',
    payload: createPayloadFixture(state),
    req: {} as never,
  });

  assert.equal(state.createdRegistrations, 1);
  assert.equal(state.emailCount, 1);
  assert.equal(state.abstractStatus, 'accepted');
  assert.equal(result.registrationKey, 'reg-new');
  assert.match(result.registrationURL, /registration=reg-new$/);
});

test('accepting an abstract reuses an existing registration without creating a duplicate', async () => {
  const state: TestState = {
    abstractStatus: 'accepted',
    createdRegistrations: 0,
    deletedRegistrationIds: [],
    emailCount: 0,
    existingRegistration: {
      id: 'registration-existing',
      registrationKey: 'reg-existing',
    },
  };

  const result = await acceptAbstract({
    id: 'abstract-1',
    payload: createPayloadFixture(state),
    req: {} as never,
  });

  assert.equal(state.createdRegistrations, 0);
  assert.equal(state.emailCount, 1);
  assert.equal(state.abstractStatus, 'accepted');
  assert.equal(result.registrationKey, 'reg-existing');
});

test('rejecting an abstract updates the status without creating a registration or sending email', async () => {
  const state: TestState = {
    abstractStatus: 'submitted',
    createdRegistrations: 0,
    deletedRegistrationIds: [],
    emailCount: 0,
    existingRegistration: null,
  };

  await rejectAbstract({
    id: 'abstract-1',
    payload: createPayloadFixture(state),
    req: {} as never,
  });

  assert.equal(state.createdRegistrations, 0);
  assert.equal(state.emailCount, 0);
  assert.equal(state.abstractStatus, 'rejected');
});
