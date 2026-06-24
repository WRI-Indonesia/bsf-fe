import { z } from "zod";

export const foodPreferenceOptions = [
  "Halal",
  "Vegetarian",
  "No restriction",
  "Other",
] as const;

export const registrationPrefixOptions = ["Mr.", "Ms.", "Mrs."] as const;
export const REGISTRATION_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
export const REGISTRATION_PHONE_EXAMPLE = "+628123456789";
export const worldNationalityOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
] as const;

export type FoodPreference = (typeof foodPreferenceOptions)[number] | null;
export type RegistrationPrefix =
  | ""
  | (typeof registrationPrefixOptions)[number];
export type RegistrationNationality =
  | ""
  | (typeof worldNationalityOptions)[number];

export type EventRegistrationStatus = "draft" | "submitted";
export type EventRegistrationStep = 1 | 2 | 3 | 4 | 5;

export type UploadedRegistrationAsset = {
  filename?: string | null;
  id: number | string;
  url?: string | null;
};

export type EventRegistrationFileValue = File | UploadedRegistrationAsset | null;

export type EventRegistrationFormValues = {
  bioSketch: string;
  cvFile: EventRegistrationFileValue;
  department: string;
  email: string;
  fieldOfExpertise: string;
  firstName: string;
  flightNotes: string;
  foodPreference: FoodPreference;
  foodPreferenceOther: string;
  fullAddress: string;
  isInternationalParticipant: boolean;
  lastName: string;
  middleName: string;
  mobile: string;
  nationality: RegistrationNationality;
  organization: string;
  passportInfoPageFile: EventRegistrationFileValue;
  passportNumber: string;
  postalCode: string;
  positionTitle: string;
  preferredArrivalDate: string;
  preferredDepartureDate: string;
  profilePhotoFile: EventRegistrationFileValue;
  prefix: RegistrationPrefix;
  signatureFile: EventRegistrationFileValue;
  whatsappOrViber: string;
};

export type EventRegistrationPayloadValues = Omit<
  EventRegistrationFormValues,
  | "cvFile"
  | "passportInfoPageFile"
  | "preferredArrivalDate"
  | "preferredDepartureDate"
  | "profilePhotoFile"
  | "signatureFile"
> & {
  cvFile: EventRegistrationFileValue | number | string | null;
  passportInfoPageFile: EventRegistrationFileValue | number | string | null;
  preferredArrivalDate: null | string;
  preferredDepartureDate: null | string;
  profilePhotoFile: EventRegistrationFileValue | number | string | null;
  signatureFile: EventRegistrationFileValue | number | string | null;
};

export type EventRegistrationFieldName = keyof EventRegistrationPayloadValues;

export type EventRegistrationFieldErrors = Partial<
  Record<EventRegistrationFieldName, string>
>;

export type EventRegistrationResponse =
  | {
      message: string;
      ok: true;
      status: EventRegistrationStatus;
    }
  | {
      errors?: EventRegistrationFieldErrors;
      message: string;
      ok: false;
    };

const trimString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeOptionalDate = (value: unknown): null | string => {
  const normalized = trimString(value);
  return normalized || null;
};

const normalizeBoolean = (value: unknown) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value === "true" || value === "on" || value === "1";
  }

  return false;
};

const normalizeFileValue = (value: unknown) => value ?? null;

const fileLikeSchema = z.custom<
  EventRegistrationPayloadValues["cvFile"]
>(() => true);

const normalizedEventRegistrationSchema = z.object({
  bioSketch: z.preprocess(trimString, z.string()),
  cvFile: z.preprocess(normalizeFileValue, fileLikeSchema),
  department: z.preprocess(trimString, z.string()),
  email: z.preprocess(trimString, z.string()),
  fieldOfExpertise: z.preprocess(trimString, z.string()),
  firstName: z.preprocess(trimString, z.string()),
  flightNotes: z.preprocess(trimString, z.string()),
  foodPreference: z.preprocess((value) => {
    if (typeof value !== "string") {
      return null;
    }

    return foodPreferenceOptions.includes(
      value as (typeof foodPreferenceOptions)[number],
    )
      ? value
      : null;
  }, z.nullable(z.enum(foodPreferenceOptions))),
  foodPreferenceOther: z.preprocess(trimString, z.string()),
  fullAddress: z.preprocess(trimString, z.string()),
  isInternationalParticipant: z.preprocess(normalizeBoolean, z.boolean()),
  lastName: z.preprocess(trimString, z.string()),
  middleName: z.preprocess(trimString, z.string()),
  mobile: z.preprocess(trimString, z.string()),
  nationality: z.preprocess((value) => {
    const normalized = trimString(value);

    return worldNationalityOptions.includes(
      normalized as (typeof worldNationalityOptions)[number],
    )
      ? normalized
      : "";
  }, z.union([z.literal(""), z.enum(worldNationalityOptions)])),
  organization: z.preprocess(trimString, z.string()),
  passportInfoPageFile: z.preprocess(normalizeFileValue, fileLikeSchema),
  passportNumber: z.preprocess(trimString, z.string()),
  postalCode: z.preprocess(trimString, z.string()),
  positionTitle: z.preprocess(trimString, z.string()),
  preferredArrivalDate: z.preprocess(
    normalizeOptionalDate,
    z.string().nullable(),
  ),
  preferredDepartureDate: z.preprocess(
    normalizeOptionalDate,
    z.string().nullable(),
  ),
  profilePhotoFile: z.preprocess(normalizeFileValue, fileLikeSchema),
  prefix: z.preprocess((value) => {
    const normalized = trimString(value);

    return registrationPrefixOptions.includes(
      normalized as (typeof registrationPrefixOptions)[number],
    )
      ? normalized
      : "";
  }, z.union([z.literal(""), z.enum(registrationPrefixOptions)])),
  signatureFile: z.preprocess(normalizeFileValue, fileLikeSchema),
  whatsappOrViber: z.preprocess(trimString, z.string()),
});

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const e164PhonePattern = /^\+[1-9]\d{7,14}$/;

const hasFileValue = (value: unknown) => {
  if (!value) {
    return false;
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return true;
  }

  if (typeof value === "number" || typeof value === "string") {
    return true;
  }

  return typeof value === "object" && value != null && "id" in value;
};

const hasOversizedFile = (value: unknown) =>
  typeof File !== "undefined" &&
  value instanceof File &&
  value.size > REGISTRATION_UPLOAD_MAX_BYTES;

const validateFileSize = (
  ctx: z.RefinementCtx,
  field: "cvFile" | "profilePhotoFile" | "signatureFile",
  value: unknown,
) => {
  if (hasOversizedFile(value)) {
    addIssue(ctx, field, "File size must be 5 MB or less.");
  }
};

const validatePhoneNumber = (
  ctx: z.RefinementCtx,
  field: "mobile" | "whatsappOrViber",
  value: string,
  required: boolean,
) => {
  if (!value) {
    if (required) {
      addIssue(ctx, field, "This field is required.");
    }
    return;
  }

  if (!e164PhonePattern.test(value)) {
    addIssue(
      ctx,
      field,
      `Enter a valid phone number with country code, for example ${REGISTRATION_PHONE_EXAMPLE}.`,
    );
  }
};

const isValidNationality = (value: string) =>
  worldNationalityOptions.includes(
    value as (typeof worldNationalityOptions)[number],
  );

const addIssue = (
  ctx: z.RefinementCtx,
  field: EventRegistrationFieldName,
  message: string,
) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message,
    path: [field],
  });
};

const mapZodIssuesToFieldErrors = (issues: z.ZodIssue[]) => {
  const errors: EventRegistrationFieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      !(field in errors)
    ) {
      errors[field as EventRegistrationFieldName] = issue.message;
    }
  }

  return errors;
};

export const registrationStepFields: Record<
  EventRegistrationStep,
  EventRegistrationFieldName[]
> = {
  1: [
    "prefix",
    "firstName",
    "middleName",
    "lastName",
    "email",
    "organization",
    "department",
    "postalCode",
    "fullAddress",
  ],
  2: [
    "positionTitle",
    "fieldOfExpertise",
    "cvFile",
    "profilePhotoFile",
    "bioSketch",
  ],
  3: ["mobile", "whatsappOrViber", "foodPreference", "foodPreferenceOther"],
  4: [
    "passportInfoPageFile",
    "passportNumber",
    "nationality",
    "preferredArrivalDate",
    "preferredDepartureDate",
    "flightNotes",
    "isInternationalParticipant",
  ],
  5: ["signatureFile"],
};

const stepValidationSchemas: Record<EventRegistrationStep, z.ZodTypeAny> = {
  1: normalizedEventRegistrationSchema
    .pick({
      department: true,
      email: true,
      firstName: true,
      fullAddress: true,
      lastName: true,
      organization: true,
      postalCode: true,
      prefix: true,
    })
    .superRefine((values, ctx) => {
      if (!values.prefix) {
        addIssue(ctx, "prefix", "Please select a prefix.");
      }

      if (!values.firstName) {
        addIssue(ctx, "firstName", "This field is required.");
      }

      if (!values.lastName) {
        addIssue(ctx, "lastName", "This field is required.");
      }

      if (!values.email) {
        addIssue(ctx, "email", "This field is required.");
      } else if (!isValidEmail(values.email)) {
        addIssue(ctx, "email", "Please enter a valid email address.");
      }

      if (!values.organization) {
        addIssue(ctx, "organization", "This field is required.");
      }

      if (!values.department) {
        addIssue(ctx, "department", "This field is required.");
      }

      if (!values.postalCode) {
        addIssue(ctx, "postalCode", "This field is required.");
      }

      if (!values.fullAddress) {
        addIssue(ctx, "fullAddress", "This field is required.");
      }
    }),
  2: normalizedEventRegistrationSchema
    .pick({
      bioSketch: true,
      cvFile: true,
      fieldOfExpertise: true,
      positionTitle: true,
      profilePhotoFile: true,
    })
    .superRefine((values, ctx) => {
      if (!values.positionTitle) {
        addIssue(ctx, "positionTitle", "This field is required.");
      }

      if (!values.fieldOfExpertise) {
        addIssue(ctx, "fieldOfExpertise", "This field is required.");
      }

      if (!values.bioSketch) {
        addIssue(ctx, "bioSketch", "This field is required.");
      }

      if (!hasFileValue(values.cvFile)) {
        addIssue(ctx, "cvFile", "Please upload a file.");
      }
      validateFileSize(ctx, "cvFile", values.cvFile);

      if (!hasFileValue(values.profilePhotoFile)) {
        addIssue(ctx, "profilePhotoFile", "Please upload a file.");
      }
      validateFileSize(ctx, "profilePhotoFile", values.profilePhotoFile);
    }),
  3: normalizedEventRegistrationSchema
    .pick({
      foodPreference: true,
      foodPreferenceOther: true,
      mobile: true,
      whatsappOrViber: true,
    })
    .superRefine((values, ctx) => {
      validatePhoneNumber(ctx, "mobile", values.mobile, true);
      validatePhoneNumber(
        ctx,
        "whatsappOrViber",
        values.whatsappOrViber,
        false,
      );

      if (!values.foodPreference) {
        addIssue(ctx, "foodPreference", "Please select a food preference.");
      }

      if (
        values.foodPreference === "Other" &&
        !values.foodPreferenceOther
      ) {
        addIssue(
          ctx,
          "foodPreferenceOther",
          "Please tell us your food preference.",
        );
      }
    }),
  4: normalizedEventRegistrationSchema
    .pick({
      isInternationalParticipant: true,
      nationality: true,
      passportInfoPageFile: true,
      passportNumber: true,
      preferredArrivalDate: true,
      preferredDepartureDate: true,
    })
    .superRefine((values, ctx) => {
      if (!values.isInternationalParticipant) {
        return;
      }

      if (!hasFileValue(values.passportInfoPageFile)) {
        addIssue(
          ctx,
          "passportInfoPageFile",
          "Please upload the passport information page.",
        );
      }

      if (!values.passportNumber) {
        addIssue(
          ctx,
          "passportNumber",
          "This field is required for international participants.",
        );
      }

      if (!values.nationality) {
        addIssue(
          ctx,
          "nationality",
          "This field is required for international participants.",
        );
      } else if (!isValidNationality(values.nationality)) {
        addIssue(ctx, "nationality", "Please select a valid nationality.");
      }

      if (!values.preferredArrivalDate) {
        addIssue(
          ctx,
          "preferredArrivalDate",
          "This field is required for international participants.",
        );
      }

      if (!values.preferredDepartureDate) {
        addIssue(
          ctx,
          "preferredDepartureDate",
          "This field is required for international participants.",
        );
      }

      if (
        values.preferredArrivalDate &&
        values.preferredDepartureDate &&
        values.preferredDepartureDate < values.preferredArrivalDate
      ) {
        addIssue(
          ctx,
          "preferredDepartureDate",
          "Departure date must be on or after the arrival date.",
        );
      }
    }),
  5: normalizedEventRegistrationSchema
    .pick({
      signatureFile: true,
    })
    .superRefine((values, ctx) => {
      if (!hasFileValue(values.signatureFile)) {
        addIssue(ctx, "signatureFile", "Please upload a file.");
      }

      validateFileSize(ctx, "signatureFile", values.signatureFile);
    }),
};

export const createEmptyEventRegistrationValues =
  (): EventRegistrationFormValues => ({
    bioSketch: "",
    cvFile: null,
    department: "",
    email: "",
    fieldOfExpertise: "",
    firstName: "",
    flightNotes: "",
    foodPreference: null,
    foodPreferenceOther: "",
    fullAddress: "",
    isInternationalParticipant: false,
    lastName: "",
    middleName: "",
    mobile: "",
    nationality: "",
    organization: "",
    passportInfoPageFile: null,
    passportNumber: "",
    postalCode: "",
    positionTitle: "",
    preferredArrivalDate: "",
    preferredDepartureDate: "",
    profilePhotoFile: null,
    prefix: "",
    signatureFile: null,
    whatsappOrViber: "",
  });

export const normalizeEventRegistrationValues = (
  values: Partial<EventRegistrationPayloadValues>,
): EventRegistrationPayloadValues => {
  const normalized = normalizedEventRegistrationSchema.parse({
    ...createEmptyEventRegistrationValues(),
    ...values,
  });

  return {
    ...normalized,
    foodPreferenceOther:
      normalized.foodPreference === "Other" ? normalized.foodPreferenceOther : "",
  };
};

export const validateEventRegistrationDraft = (
  values: Partial<EventRegistrationPayloadValues>,
) => {
  const normalized = normalizeEventRegistrationValues(values);
  const errors: EventRegistrationFieldErrors = {};

  for (const [field, value] of [
    ["cvFile", normalized.cvFile],
    ["profilePhotoFile", normalized.profilePhotoFile],
    ["signatureFile", normalized.signatureFile],
  ] as const) {
    if (hasOversizedFile(value)) {
      errors[field] = "File size must be 5 MB or less.";
    }
  }

  return { errors, normalized };
};

export const validateEventRegistrationStep = (
  values: Partial<EventRegistrationPayloadValues>,
  step: EventRegistrationStep,
) => {
  const normalized = normalizeEventRegistrationValues(values);
  const result = stepValidationSchemas[step].safeParse(normalized);

  return {
    errors: result.success ? {} : mapZodIssuesToFieldErrors(result.error.issues),
    normalized,
  };
};

export const validateEventRegistrationSubmission = (
  values: Partial<EventRegistrationPayloadValues>,
) => {
  const normalized = normalizeEventRegistrationValues(values);
  const errors = {} as EventRegistrationFieldErrors;

  for (const step of [1, 2, 3, 4, 5] as const) {
    const result = stepValidationSchemas[step].safeParse(normalized);

    if (!result.success) {
      Object.assign(errors, {
        ...mapZodIssuesToFieldErrors(result.error.issues),
        ...errors,
      });
    }
  }

  return { errors, normalized };
};

export const validateEventRegistration = (
  values: Partial<EventRegistrationPayloadValues>,
  status: EventRegistrationStatus,
) =>
  status === "submitted"
    ? validateEventRegistrationSubmission(values)
    : validateEventRegistrationDraft(values);
