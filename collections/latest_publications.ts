import type { CollectionConfig } from 'payload';

function getFileTypeFromMime(mimeType?: string | null): string {
  if (!mimeType) return 'Unknown';

  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('jpg') || mimeType.includes('jpeg')) return 'JPG';
  if (mimeType.includes('docx') || mimeType.includes('doc')) return 'DOCX';
  if (mimeType.includes('zip')) return 'ZIP';

  const parts = mimeType.split('/');
  return parts[parts.length - 1]?.toUpperCase() || 'Unknown';
}

const latestPublications: CollectionConfig = {
  slug: 'latest_publications',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (data?.file) {
          let mimeType: string | undefined | null = null;

          if (typeof data.file === 'object' && data.file !== null) {
            const fileData = data.file as Record<string, unknown>;
            mimeType = fileData.mimeType as string | undefined;
          } else if (typeof data.file === 'number' && req.payload) {
            try {
              const mediaDoc = await req.payload.findByID({
                collection: 'media',
                id: data.file,
              });
              mimeType = mediaDoc?.mimeType as string | undefined;
            } catch (e) {
            }
          }

          if (mimeType) {
            data.file_type = getFileTypeFromMime(mimeType);
          }
        }
        return data;
      },
    ],
    afterChange: [],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'tag',
      type: 'select',
      required: true,
      options: [
        { label: 'Policy brief', value: 'Policy brief' },
        { label: 'Proceedings', value: 'Proceedings' },
        { label: 'Publications', value: 'Publications' },
        { label: 'Technical Outputs', value: 'Technical Outputs' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Publication File',
      required: true,
    },
    {
      name: 'file_type',
      type: 'text',
      label: 'File Type',
      required: true,
      admin: {
        readOnly: true,
        description: 'Automatically detected from the uploaded file',
      },
    },
  ],
}

export default latestPublications
