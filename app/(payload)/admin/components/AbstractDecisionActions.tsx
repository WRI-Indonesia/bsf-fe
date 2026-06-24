'use client';

import { useDocumentInfo } from '@payloadcms/ui';

import { AbstractDecisionButtons } from '@/app/(payload)/admin/components/AbstractDecisionButtons';

export function AbstractDecisionActions() {
  const { data, docConfig, id, setData } = useDocumentInfo();

  if (id == null) {
    return null;
  }

  const status = typeof data?.status === 'string' ? data.status : null;
  const collectionSlug = docConfig?.slug;

  if (!collectionSlug) {
    return null;
  }

  return (
    <AbstractDecisionButtons
      collectionSlug={collectionSlug}
      id={id}
      onSuccess={setData}
      size="small"
      status={status}
    />
  );
}
