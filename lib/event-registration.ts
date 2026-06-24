import { z } from "zod";

export const foodPreferenceOptions = [
  "Halal",
  "Vegetarian",
  "No restriction",
  "Other",
] as const;

export const registrationPrefixOptions = ["Mr.", "Ms.", "Mrs."] as const;

export type FoodPreference = (typeof foodPreferenceOptions)[number] | null;
export type RegistrationPrefix =
  | ""
  | (typeof registrationPrefixOptions)[number];

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
  nationality: string;
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

type NormalizedEventRegistration = EventRegistrationPayloadValues;

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
  nationality: z.preprocess(trimString, z.string()),
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

      if (!hasFileValue(values.profilePhotoFile)) {
        addIssue(ctx, "profilePhotoFile", "Please upload a file.");
      }
    }),
  3: normalizedEventRegistrationSchema
    .pick({
      foodPreference: true,
      foodPreferenceOther: true,
      mobile: true,
    })
    .superRefine((values, ctx) => {
      if (!values.mobile) {
        addIssue(ctx, "mobile", "This field is required.");
      }

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
) => ({
  errors: {} as EventRegistrationFieldErrors,
  normalized: normalizeEventRegistrationValues(values),
});

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
