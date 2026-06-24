import assert from 'node:assert/strict';
import test from 'node:test';

import { sendAbstractAcceptanceEmail } from '@/lib/abstract-acceptance-email';

test('sends an acceptance email with the registration link', async () => {
  const messages: Array<{ subject: string; text: string; to: string }> = [];

  await sendAbstractAcceptanceEmail({
    defaultFromAddress: 'no-reply@example.com',
    defaultFromName: 'ASEAN Biodiversity Science Forum',
    eventTitle: 'ASEAN Biodiversity Forum',
    mainAuthor: 'Jane Doe',
    payload: {
      sendEmail: async (message) => {
        messages.push(message);
      },
    },
    recipientEmail: 'submitter@example.com',
    registrationURL: 'https://example.com/event-registration?registration=abc123',
    submissionTitle: 'Protecting Wetlands',
  });

  assert.equal(messages.length, 1);
  assert.deepEqual(messages[0], {
    from: '"ASEAN Biodiversity Science Forum" <no-reply@example.com>',
    subject: 'Your abstract has been accepted',
    text: [
      'Dear Jane Doe,',
      '',
      'We are pleased to let you know that your abstract "Protecting Wetlands" has been accepted for ASEAN Biodiversity Forum.',
      '',
      'Please complete your event registration using the link below:',
      'https://example.com/event-registration?registration=abc123',
      '',
      'If you have any questions, please reply to this email.',
      '',
      'Best regards,',
      'ASEAN Biodiversity Science Forum',
    ].join('\n'),
    to: 'submitter@example.com',
  });
});
