import nodemailer from "nodemailer";
import type { PayloadEmailAdapter, SendEmailOptions } from "payload";

const smtpPort = Number(process.env.SMTP_PORT || 587);

const createTransport = () =>
  nodemailer.createTransport({
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            pass: process.env.SMTP_PASS,
            user: process.env.SMTP_USER,
          }
        : undefined,
    host: process.env.SMTP_HOST,
    port: Number.isNaN(smtpPort) ? 587 : smtpPort,
    secure: smtpPort === 465,
  });

export const smtpEmailAdapter: PayloadEmailAdapter = ({ payload }) => {
  const transport = createTransport();

  return {
    defaultFromAddress: process.env.SMTP_FROM || "no-reply@example.com",
    defaultFromName: "ASEAN Biodiversity Science Forum",
    name: "smtp",
    sendEmail: async (message: SendEmailOptions) => {
      if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) {
        payload.logger.warn(
          "SMTP email is not fully configured. Email delivery was skipped.",
        );
        return;
      }

      await transport.sendMail(message);
    },
  };
};
