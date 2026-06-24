type AbstractAcceptanceEmailArgs = {
  defaultFromAddress?: string | null;
  defaultFromName?: string | null;
  eventTitle: string;
  mainAuthor: string;
  payload: {
    sendEmail: (message: {
      from?: string;
      subject: string;
      text: string;
      to: string;
    }) => Promise<void>;
  };
  recipientEmail: string;
  registrationURL: string;
  submissionTitle: string;
};

export async function sendAbstractAcceptanceEmail({
  defaultFromAddress,
  defaultFromName,
  eventTitle,
  mainAuthor,
  payload,
  recipientEmail,
  registrationURL,
  submissionTitle,
}: AbstractAcceptanceEmailArgs) {
  const fromAddress = defaultFromAddress?.trim();
  const fromName = defaultFromName?.trim() || 'ASEAN Biodiversity Science Forum';

  await payload.sendEmail({
    from: fromAddress ? `"${fromName}" <${fromAddress}>` : undefined,
    subject: 'Your abstract has been accepted',
    text: [
      `Dear ${mainAuthor},`,
      '',
      `We are pleased to let you know that your abstract "${submissionTitle}" has been accepted for ${eventTitle}.`,
      '',
      'Please complete your event registration using the link below:',
      registrationURL,
      '',
      'If you have any questions, please reply to this email.',
      '',
      'Best regards,',
      'ASEAN Biodiversity Science Forum',
    ].join('\n'),
    to: recipientEmail,
  });
}
