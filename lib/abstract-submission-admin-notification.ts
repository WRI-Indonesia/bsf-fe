type AbstractKeyword = {
  keyword?: string | null;
} | null;

type AbstractSubmissionNotificationArgs = {
  adminEmail?: string | null;
  defaultFromAddress?: string | null;
  defaultFromName?: string | null;
  eventTitle: string;
  payload: {
    logger?: {
      warn?: (message: string) => void;
    };
    sendEmail: (message: {
      from?: string;
      subject: string;
      text: string;
      to: string;
    }) => Promise<unknown>;
  };
  submitterEmail: string;
  submission: {
    id: number | string;
    keywords?: AbstractKeyword[] | null;
    main_author: string;
    title: string;
  };
};

const formatKeywords = (keywords?: AbstractKeyword[] | null) => {
  const values =
    keywords
      ?.map((item) => item?.keyword?.trim())
      .filter((keyword): keyword is string => Boolean(keyword)) ?? [];

  return values.length > 0 ? values.join(", ") : "-";
};

export async function sendAbstractSubmissionAdminNotification({
  adminEmail,
  defaultFromAddress,
  defaultFromName,
  eventTitle,
  payload,
  submitterEmail,
  submission,
}: AbstractSubmissionNotificationArgs) {
  const recipient = adminEmail?.trim();

  if (!recipient) {
    payload.logger?.warn?.(
      "ADMIN_EMAIL is not configured. Admin abstract notification email was skipped.",
    );
    return;
  }

  const fromAddress = defaultFromAddress?.trim();
  const fromName = defaultFromName?.trim() || "ASEAN Biodiversity Science Forum";

  await payload.sendEmail({
    from: fromAddress ? `"${fromName}" <${fromAddress}>` : undefined,
    subject: "New abstract submitted",
    text: [
      "A new abstract has been submitted.",
      "",
      `Abstract ID: ${submission.id}`,
      `Event: ${eventTitle}`,
      `Submitter Email: ${submitterEmail}`,
      `Main Author: ${submission.main_author}`,
      `Abstract Title: ${submission.title}`,
      `Keywords: ${formatKeywords(submission.keywords)}`,
    ].join("\n"),
    to: recipient,
  });
}
