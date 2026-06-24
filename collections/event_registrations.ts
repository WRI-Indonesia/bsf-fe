import type {
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
} from "payload";

import { normalizeEventRegistrationValues } from "@/lib/event-registration";

type RequestUser = {
  collection?: string;
};

const isCmsUser = (user: RequestUser | null | undefined) =>
  user?.collection === "users";

const getRelationId = (
  value: number | string | { id?: number | string | null } | null | undefined,
): number | string | null => {
  if (value == null) return null;
  if (typeof value === "object") return value.id ?? null;
  return value;
};

const validateRegistrationShape: CollectionBeforeValidateHook = async ({
  data,
}) => {
  if (!data) {
    return data;
  }

  const normalized = normalizeEventRegistrationValues(data);

  Object.assign(data, normalized);

  return data;
};

const ensureSingleRegistrationPerAbstract: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (
    operation === "update" &&
    typeof originalDoc?.registrationKey === "string" &&
    !isCmsUser(req.user as RequestUser | undefined)
  ) {
    data.registrationKey = originalDoc.registrationKey;
  }

  const abstractId =
    getRelationId(data.abstract) ?? getRelationId(originalDoc?.abstract);
  const currentDocId = getRelationId(originalDoc?.id);

  if (!abstractId) {
    return data;
  }

  const existing = await req.payload.find({
    collection: "event-registrations",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          abstract: {
            equals: abstractId,
          },
        },
        ...(operation === "update" && currentDocId != null
          ? [
              {
                id: {
                  not_equals: currentDocId,
                },
              },
            ]
          : []),
      ],
    },
  });

  if (existing.docs.length > 0) {
    throw new Error("Each abstract can only have one event registration.");
  }

  return data;
};

const eventRegistrations: CollectionConfig = {
  slug: "event-registrations",
  access: {
    create: ({ req }) => isCmsUser(req.user as RequestUser | undefined),
    delete: ({ req }) => isCmsUser(req.user as RequestUser | undefined),
    read: ({ req }) => isCmsUser(req.user as RequestUser | undefined),
    update: ({ req }) => isCmsUser(req.user as RequestUser | undefined),
  },
  admin: {
    useAsTitle: "registrationKey",
    defaultColumns: ["registrationKey", "abstract", "status", "updatedAt"],
  },
  hooks: {
    beforeValidate: [validateRegistrationShape],
    beforeChange: [ensureSingleRegistrationPerAbstract],
  },
  fields: [
    {
      name: "abstract",
      type: "relationship",
      relationTo: "abstracts",
      required: true,
    },
    {
      name: "registrationKey",
      type: "text",
      required: true,
      unique: true,
      index: true,
      defaultValue: () => crypto.randomUUID(),
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Submitted",
          value: "submitted",
        },
      ],
    },
    {
      name: "prefix",
      type: "text",
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "middleName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "email",
      type: "text",
    },
    {
      name: "organization",
      type: "text",
    },
    {
      name: "department",
      type: "text",
    },
    {
      name: "postalCode",
      type: "text",
    },
    {
      name: "fullAddress",
      type: "textarea",
    },
    {
      name: "positionTitle",
      type: "text",
    },
    {
      name: "fieldOfExpertise",
      type: "text",
    },
    {
      name: "bioSketch",
      type: "textarea",
    },
    {
      name: "mobile",
      type: "text",
    },
    {
      name: "whatsappOrViber",
      type: "text",
    },
    {
      name: "foodPreference",
      type: "select",
      options: [
        {
          label: "Halal",
          value: "Halal",
        },
        {
          label: "Vegetarian",
          value: "Vegetarian",
        },
        {
          label: "No restriction",
          value: "No restriction",
        },
        {
          label: "Other",
          value: "Other",
        },
      ],
    },
    {
      name: "isInternationalParticipant",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "passportNumber",
      type: "text",
    },
    {
      name: "nationality",
      type: "text",
    },
    {
      name: "preferredArrivalDate",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "preferredDepartureDate",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "flightNotes",
      type: "textarea",
    },
    {
      name: "cvFile",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "profilePhotoFile",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "passportInfoPageFile",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "signatureFile",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default eventRegistrations;
