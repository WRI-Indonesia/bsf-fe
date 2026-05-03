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
      ({ data, req }) => {
        if (data?.file) {
          // When a file is uploaded directly via the API
          const mimeType = data.file.mimeType;
          data.file_type = getFileTypeFromMime(mimeType);
        } else if (data?.file && typeof data.file === 'number') {
          // If file is an existing media ID, we need to look it up
          // This will be handled by the afterRead or we can fetch it
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // If the file is a media relation (ID), fetch its mime type
        if (doc.file && typeof doc.file === 'number' && req.payload) {
          try {
            const mediaDoc = await req.payload.findByID({
              collection: 'media',
              id: doc.file,
            });
            if (mediaDoc?.mimeType) {
              const fileType = getFileTypeFromMime(mediaDoc.mimeType);
              if (fileType !== doc.file_type) {
                await req.payload.update({
                  collection: 'latest_publications',
                  id: doc.id,
                  data: {
                    file_type: fileType,
                  },
                });
              }
            }
          } catch (e) {
            // Silently fail - file type will remain as-is
          }
        }
        return doc;
      },
    ],
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
