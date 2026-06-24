import assert from "node:assert/strict";
import test from "node:test";

import { sendAbstractSubmissionAdminNotification } from "@/lib/abstract-submission-admin-notification";

test("sends an admin notification email with submission details", async () => {
  const messages: Array<{ subject: string; text: string; to: string }> = [];

  await sendAbstractSubmissionAdminNotification({
    adminEmail: "admin@example.com",
    defaultFromAddress: "no-reply@example.com",
    defaultFromName: "ASEAN Biodiversity Science Forum",
    eventTitle: "ASEAN Biodiversity Forum",
    payload: {
      sendEmail: async (message) => {
        messages.push(message);
      },
    },
    submission: {
      id: 42,
      keywords: [{ keyword: "peatland" }, { keyword: "restoration" }],
      main_author: "Jane Doe",
      title: "Protecting Wetlands",
    },
    submitterEmail: "submitter@example.com",
  });

  assert.equal(messages.length, 1);
  assert.deepEqual(messages[0], {
    from: "\"ASEAN Biodiversity Science Forum\" <no-reply@example.com>",
    subject: "New abstract submitted",
    text: [
      "A new abstract has been submitted.",
      "",
      "Abstract ID: 42",
      "Event: ASEAN Biodiversity Forum",
      "Submitter Email: submitter@example.com",
      "Main Author: Jane Doe",
      "Abstract Title: Protecting Wetlands",
      "Keywords: peatland, restoration",
    ].join("\n"),
    to: "admin@example.com",
  });
});

test("skips email delivery and logs a warning when ADMIN_EMAIL is missing", async () => {
  let sendEmailCalled = false;
  const warnings: string[] = [];

  await sendAbstractSubmissionAdminNotification({
    adminEmail: "   ",
    defaultFromAddress: "no-reply@example.com",
    defaultFromName: "ASEAN Biodiversity Science Forum",
    eventTitle: "ASEAN Biodiversity Forum",
    payload: {
      logger: {
        warn: (message) => {
          warnings.push(message);
        },
      },
      sendEmail: async () => {
        sendEmailCalled = true;
      },
    },
    submission: {
      id: 43,
      keywords: [{ keyword: "biodiversity" }],
      main_author: "John Doe",
      title: "Forest Monitoring",
    },
    submitterEmail: "submitter@example.com",
  });

  assert.equal(sendEmailCalled, false);
  assert.deepEqual(warnings, [
    "ADMIN_EMAIL is not configured. Admin abstract notification email was skipped.",
  ]);
});

test("propagates email errors so the caller can handle them", async () => {
  await assert.rejects(
    sendAbstractSubmissionAdminNotification({
      adminEmail: "admin@example.com",
      defaultFromAddress: "no-reply@example.com",
      defaultFromName: "ASEAN Biodiversity Science Forum",
      eventTitle: "ASEAN Biodiversity Forum",
      payload: {
        sendEmail: async () => {
          throw new Error("SMTP failed");
        },
      },
      submission: {
        id: 44,
        keywords: [{ keyword: "species" }],
        main_author: "Alex Doe",
        title: "Species Recovery",
      },
      submitterEmail: "submitter@example.com",
    }),
    /SMTP failed/,
  );
});
