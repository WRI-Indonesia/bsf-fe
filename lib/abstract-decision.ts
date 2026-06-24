import type { PayloadRequest } from 'payload';

import { sendAbstractAcceptanceEmail } from '@/lib/abstract-acceptance-email';
import { getEventRegistrationURL } from '@/lib/event-registration-link';

type RelationValue =
  | number
  | string
  | {
      id?: number | string | null;
    }
  | null
  | undefined;

type AbstractDoc = {
  event?: RelationValue;
  id: number | string;
  main_author?: string | null;
  status?: string | null;
  title?: string | null;
  user?: RelationValue;
};

type EventDoc = {
  id: number | string;
  title?: Record<string, unknown> | string | null;
};

type PublicUserDoc = {
  email?: string | null;
  id: number | string;
};

type RegistrationDoc = {
  id: number | string;
  registrationKey?: string | null;
};

type MinimalPayload = {
  collections?: {
    abstracts?: {
      config?: {
        slug?: string;
      };
    };
  };
  create: (args: {
    collection: string;
    data: Record<string, unknown>;
    req: PayloadRequest;
  }) => Promise<RegistrationDoc>;
  delete: (args: {
    collection: string;
    id: number | string;
    req: PayloadRequest;
  }) => Promise<unknown>;
  email: {
    defaultFromAddress?: string | null;
    defaultFromName?: string | null;
  };
  find: (args: {
    collection: string;
    depth?: number;
    limit?: number;
    pagination?: boolean;
    req: PayloadRequest;
    where: Record<string, unknown>;
  }) => Promise<{
    docs: RegistrationDoc[];
  }>;
  findByID: (args: {
    collection: string;
    id: number | string;
    depth?: number;
    req: PayloadRequest;
  }) => Promise<AbstractDoc | EventDoc | PublicUserDoc>;
  sendEmail: (message: {
    from?: string;
    subject: string;
    text: string;
    to: string;
  }) => Promise<void>;
  update: (args: {
    collection: string;
    data: Record<string, unknown>;
    id: number | string;
    req: PayloadRequest;
  }) => Promise<AbstractDoc>;
};

const getRelationId = (value: RelationValue): number | string | null => {
  if (value == null) return null;
  if (typeof value === 'object') return value.id ?? null;
  return value;
};

const getEventTitle = (event: EventDoc): string => {
  if (typeof event.title === 'string' && event.title.trim()) {
    return event.title.trim();
  }

  if (event.title && typeof event.title === 'object') {
    const localizedTitle = Object.values(event.title).find(
      (value): value is string => typeof value === 'string' && value.trim().length > 0,
    );

    if (localizedTitle) {
      return localizedTitle.trim();
    }
  }

  return `Event ${event.id}`;
};

const getSubmitterEmail = (user: PublicUserDoc) => {
  const email = user.email?.trim();

  if (!email) {
    throw new Error('The abstract submitter does not have a valid email address.');
  }

  return email;
};

const getRegistrationKey = (registration: RegistrationDoc) => {
  const registrationKey = registration.registrationKey?.trim();

  if (!registrationKey) {
    throw new Error('The event registration is missing its registration key.');
  }

  return registrationKey;
};

const loadAbstract = async (payload: MinimalPayload, req: PayloadRequest, id: number | string) =>
  (await payload.findByID({
    collection: 'abstracts',
    depth: 0,
    id,
    req,
  })) as AbstractDoc;

const loadEvent = async (
  payload: MinimalPayload,
  req: PayloadRequest,
  id: number | string,
) =>
  (await payload.findByID({
    collection: 'events',
    depth: 0,
    id,
    req,
  })) as EventDoc;

const loadPublicUser = async (
  payload: MinimalPayload,
  req: PayloadRequest,
  id: number | string,
) =>
  (await payload.findByID({
    collection: 'public-users',
    depth: 0,
    id,
    req,
  })) as PublicUserDoc;

export async function acceptAbstract({
  id,
  payload,
  req,
}: {
  id: number | string;
  payload: MinimalPayload;
  req: PayloadRequest;
}) {
  const abstract = await loadAbstract(payload, req, id);
  const eventId = getRelationId(abstract.event);
  const submitterId = getRelationId(abstract.user);

  if (!eventId) {
    throw new Error('This abstract is missing its related event.');
  }

  if (!submitterId) {
    throw new Error('This abstract is missing its submitter.');
  }

  const [event, submitter, existingRegistrations] = await Promise.all([
    loadEvent(payload, req, eventId),
    loadPublicUser(payload, req, submitterId),
    payload.find({
      collection: 'event-registrations',
      depth: 0,
      limit: 1,
      pagination: false,
      req,
      where: {
        abstract: {
          equals: id,
        },
      },
    }),
  ]);

  const submitterEmail = getSubmitterEmail(submitter);

  let registration = existingRegistrations.docs[0];
  let createdRegistrationId: number | string | null = null;

  if (!registration) {
    registration = await payload.create({
      collection: 'event-registrations',
      data: {
        abstract: id,
      },
      req,
    });
    createdRegistrationId = registration.id;
  }

  const registrationKey = getRegistrationKey(registration);
  const registrationURL = getEventRegistrationURL(registrationKey);

  try {
    await sendAbstractAcceptanceEmail({
      defaultFromAddress: payload.email.defaultFromAddress,
      defaultFromName: payload.email.defaultFromName,
      eventTitle: getEventTitle(event),
      mainAuthor: abstract.main_author?.trim() || 'Participant',
      payload,
      recipientEmail: submitterEmail,
      registrationURL,
      submissionTitle: abstract.title?.trim() || 'your abstract',
    });
  } catch (error) {
    if (createdRegistrationId != null) {
      await payload.delete({
        collection: 'event-registrations',
        id: createdRegistrationId,
        req,
      });
    }

    throw error;
  }

  const updatedAbstract = await payload.update({
    collection: 'abstracts',
    data: {
      status: 'accepted',
    },
    id,
    req,
  });

  return {
    abstract: updatedAbstract,
    registrationKey,
    registrationURL,
  };
}

export async function rejectAbstract({
  id,
  payload,
  req,
}: {
  id: number | string;
  payload: MinimalPayload;
  req: PayloadRequest;
}) {
  const updatedAbstract = await payload.update({
    collection: 'abstracts',
    data: {
      status: 'rejected',
    },
    id,
    req,
  });

  return {
    abstract: updatedAbstract,
  };
}
