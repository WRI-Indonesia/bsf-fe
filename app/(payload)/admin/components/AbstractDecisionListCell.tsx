'use client';

import type { DefaultCellComponentProps } from 'payload';

import { AbstractDecisionButtons } from '@/app/(payload)/admin/components/AbstractDecisionButtons';

type RowData = {
  id?: number | string;
  status?: string | null;
};

export function AbstractDecisionListCell({
  collectionSlug,
  rowData,
}: DefaultCellComponentProps) {
  const normalizedRowData = rowData as RowData | undefined;
  const id = normalizedRowData?.id;

  if (id == null) {
    return null;
  }

  return (
    <AbstractDecisionButtons
      collectionSlug={collectionSlug}
      id={id}
      size="xsmall"
      status={
        typeof normalizedRowData?.status === 'string' ? normalizedRowData.status : null
      }
    />
  );
}
