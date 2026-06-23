import type { CollectionConfig } from 'payload';

const publicUsers: CollectionConfig = {
  slug: 'public-users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
  ],
};

export default publicUsers;
