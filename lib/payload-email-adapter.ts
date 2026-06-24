import nodemailer from "nodemailer";
import type { PayloadEmailAdapter, SendEmailOptions } from "payload";

const smtpPort = Number(process.env.SMTP_PORT || 587);
const defaultFromName = "ASEAN Biodiversity Science Forum";

const trimEnv = (value: string | undefined) => value?.trim();
const smtpHost = trimEnv(process.env.SMTP_HOST);
const smtpUser = trimEnv(process.env.SMTP_USER);
const smtpPass = trimEnv(process.env.SMTP_PASS);
const smtpFrom = trimEnv(process.env.SMTP_FROM);

const buildDefaultFrom = () =>
  smtpFrom ? `"${defaultFromName}" <${smtpFrom}>` : undefined;

const buildEnvelopeFrom = (message: SendEmailOptions) => {
  if (typeof message.envelope?.from === "string" && message.envelope.from.trim()) {
    return message.envelope.from.trim();
  }

  if (typeof message.sender === "string" && message.sender.trim()) {
    return message.sender.trim();
  }

  if (smtpFrom) {
    return smtpFrom;
  }

  return undefined;
};

const createTransport = () =>
  nodemailer.createTransport({
    auth:
      smtpUser && smtpPass
        ? {
            pass: smtpPass,
            user: smtpUser,
          }
        : undefined,
    host: smtpHost,
    port: Number.isNaN(smtpPort) ? 587 : smtpPort,
    secure: smtpPort === 465,
  });

export const smtpEmailAdapter: PayloadEmailAdapter = ({ payload }) => {
  const transport = createTransport();

  return {
    defaultFromAddress: smtpFrom || "no-reply@example.com",
    defaultFromName,
    name: "smtp",
    sendEmail: async (message: SendEmailOptions) => {
      if (!smtpHost || !smtpFrom) {
        payload.logger.warn(
          "SMTP email is not fully configured. Email delivery was skipped.",
        );
        return;
      }

      const from = message.from ?? buildDefaultFrom();
      const envelopeFrom = buildEnvelopeFrom(message);

      await transport.sendMail({
        ...message,
        envelope: {
          ...message.envelope,
          from: envelopeFrom,
        },
        from,
        sender: message.sender ?? envelopeFrom,
      });
    },
  };
};
