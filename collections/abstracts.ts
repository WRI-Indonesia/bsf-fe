import type {
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload';

import { ABSTRACT_TEXT_MAX_LENGTH } from '@/lib/abstract-submission';

type RequestUser = {
  id: number | string;
  collection?: string;
  role?: 'admin' | 'editor';
};

const isCmsUser = (user: RequestUser | null | undefined) => user?.collection === 'users';

const isPublicUser = (user: RequestUser | null | undefined) => user?.collection === 'public-users';

const getRelationId = (
  value: number | string | { id?: number | string | null } | null | undefined,
): number | string | null => {
  if (value == null) return null;
  if (typeof value === 'object') return value.id ?? null;
  return value;
};

const normalizeText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : value;

const normalizeKeywords = (value: unknown) => {
  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const keyword = normalizeText((item as { keyword?: unknown }).keyword);

      if (!keyword || typeof keyword !== 'string') {
        return null;
      }

      return { keyword };
    })
    .filter(Boolean);
};

const validateAbstractShape: CollectionBeforeValidateHook = async ({ data }) => {
  if (!data) {
    return data;
  }

  data.main_author = normalizeText(data.main_author);
  data.affiliation = normalizeText(data.affiliation);
  data.title = normalizeText(data.title);
  data.text = normalizeText(data.text);
  data.citation = normalizeText(data.citation);
  data.keywords = normalizeKeywords(data.keywords);

  if (typeof data.text === 'string' && data.text.length > ABSTRACT_TEXT_MAX_LENGTH) {
    throw new Error(`Abstract text must be ${ABSTRACT_TEXT_MAX_LENGTH} characters or fewer.`);
  }

  if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
    throw new Error('At least one keyword is required.');
  }

  return data;
};

const ensureUniqueAbstractPerEvent: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  const user = req.user as RequestUser | undefined;

  if (isPublicUser(user)) {
    data.user = user?.id;
  }

  const eventId = getRelationId(data.event);
  const submitterId = getRelationId(data.user) ?? getRelationId(originalDoc?.user);
  const currentDocId = getRelationId(originalDoc?.id);

  if (!eventId || !submitterId) {
    return data;
  }

  const existing = await req.payload.find({
    collection: 'abstracts',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          event: {
            equals: eventId,
          },
        },
        {
          user: {
            equals: submitterId,
          },
        },
        ...(operation === 'update' && currentDocId != null
          ? [
              {
                id: {
                  not_equals: currentDocId,
                },
              },
            ]
          : []),
      ],
    },
  });

  if (existing.docs.length > 0) {
    throw new Error('A user can only submit one abstract per event.');
  }

  return data;
};

const abstracts: CollectionConfig = {
  slug: 'abstracts',
  access: {
    create: ({ req }) => {
      const user = req.user as RequestUser | undefined;
      return isCmsUser(user) || isPublicUser(user);
    },
    delete: ({ req }) => {
      const user = req.user as RequestUser | undefined;
      return isCmsUser(user);
    },
    read: ({ req }) => {
      const user = req.user as RequestUser | undefined;

      if (isCmsUser(user)) {
        return true;
      }

      if (isPublicUser(user)) {
        return {
          user: {
            equals: user?.id,
          },
        };
      }

      return false;
    },
    update: ({ req }) => {
      const user = req.user as RequestUser | undefined;

      if (isCmsUser(user)) {
        return true;
      }

      if (isPublicUser(user)) {
        return {
          user: {
            equals: user?.id,
          },
        };
      }

      return false;
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'main_author', 'event', 'status', 'updatedAt'],
    components: {
      listMenuItems: ['@/app/(payload)/admin/components/AbstractsListMenuItems#AbstractsListMenuItems'],
      views: {
        byEvent: {
          Component: '@/app/(payload)/admin/components/AbstractsByEventView#AbstractsByEventView',
          path: '/by-event',
        },
      },
    },
  },
  hooks: {
    beforeValidate: [validateAbstractShape],
    beforeChange: [ensureUniqueAbstractPerEvent],
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'public-users',
      required: true,
      admin: {
        condition: (_, __, { user }) => isCmsUser(user as RequestUser | undefined),
      },
    },
    {
      name: 'main_author',
      type: 'text',
      required: true,
    },
    {
      name: 'affiliation',
      type: 'text',
      required: true,
      label: 'Affiliation / Organisation',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'keywords',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'citation',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Under Review',
          value: 'under_review',
        },
        {
          label: 'Accepted',
          value: 'accepted',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
    },
  ],
};

export default abstracts;
