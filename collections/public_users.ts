import type { CollectionConfig } from "payload";

const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";

const publicUsers: CollectionConfig = {
  slug: "public-users",
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        const verificationURL = `${serverURL}/api/auth/public/verify?token=${token}`;

        return [
          `<p>Hello ${user.name || "there"},</p>`,
          "<p>Thanks for creating your account for the ASEAN Biodiversity Science Forum.</p>",
          `<p>Please verify your email by clicking <a href="${verificationURL}">this link</a>.</p>`,
          `<p>If the button does not work, copy and paste this URL into your browser:</p>`,
          `<p>${verificationURL}</p>`,
        ].join("");
      },
      generateEmailSubject: () => "Verify your BSF account",
    },
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },
  ],
};

export default publicUsers;
