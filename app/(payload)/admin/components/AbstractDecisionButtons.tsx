'use client';

import type { MouseEvent } from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, toast, useConfig } from '@payloadcms/ui';

const containerStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
};

type Decision = 'accept' | 'reject';

type ActionResponse = {
  doc?: Record<string, unknown>;
  message?: string;
};

type Props = {
  collectionSlug: string;
  id: number | string;
  onSuccess?: (doc: Record<string, unknown>) => void;
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  status: string | null;
};

const getErrorMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as ActionResponse;
    return body.message || 'The abstract action could not be completed.';
  } catch {
    return 'The abstract action could not be completed.';
  }
};

export function AbstractDecisionButtons({
  collectionSlug,
  id,
  onSuccess,
  size = 'small',
  status,
}: Props) {
  const router = useRouter();
  const { config } = useConfig();
  const [pendingDecision, setPendingDecision] = useState<Decision | null>(null);

  const runDecision = async (decision: Decision) => {
    const confirmationMessage =
      decision === 'accept'
        ? 'Accept this abstract and send the registration email?'
        : 'Reject this abstract?';

    if (!window.confirm(confirmationMessage)) {
      return;
    }

    setPendingDecision(decision);

    try {
      const response = await fetch(`${config.routes.api}/${collectionSlug}/${id}/${decision}`, {
        credentials: 'include',
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const body = (await response.json()) as ActionResponse;

      if (body.doc) {
        onSuccess?.(body.doc);
      }

      toast.success(body.message || 'Abstract updated.');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'The abstract action could not be completed.',
      );
    } finally {
      setPendingDecision(null);
    }
  };

  const handleClick =
    (decision: Decision) => (event: MouseEvent<Element>) => {
      event.preventDefault();
      event.stopPropagation();
      void runDecision(decision);
    };

  return (
    <div style={containerStyle}>
      <Button
        buttonStyle="primary"
        disabled={pendingDecision !== null}
        onClick={handleClick('accept')}
        size={size}
      >
        {pendingDecision === 'accept'
          ? 'Accepting...'
          : status === 'accepted'
            ? 'Resend acceptance'
            : 'Accept'}
      </Button>
      <Button
        buttonStyle="secondary"
        disabled={pendingDecision !== null || status === 'rejected'}
        onClick={handleClick('reject')}
        size={size}
      >
        {pendingDecision === 'reject' ? 'Rejecting...' : 'Reject'}
      </Button>
    </div>
  );
}
