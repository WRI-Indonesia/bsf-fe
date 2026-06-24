export const foodPreferenceOptions = [
  "Halal",
  "Vegetarian",
  "No restriction",
  "Other",
] as const;

export type FoodPreference = (typeof foodPreferenceOptions)[number] | null;

export type EventRegistrationStatus = "draft" | "submitted";

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
  prefix: string;
  signatureFile: EventRegistrationFileValue;
  whatsappOrViber: string;
};

export type EventRegistrationPayloadValues = Omit<
  EventRegistrationFormValues,
  "cvFile" | "passportInfoPageFile" | "profilePhotoFile" | "signatureFile"
> & {
  cvFile: EventRegistrationFileValue | number | string | null;
  passportInfoPageFile: EventRegistrationFileValue | number | string | null;
  profilePhotoFile: EventRegistrationFileValue | number | string | null;
  signatureFile: EventRegistrationFileValue | number | string | null;
};

export type EventRegistrationFieldName =
  keyof EventRegistrationPayloadValues;

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

const trimString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeOptionalDate = (value: unknown) => {
  const normalized = trimString(value);
  return normalized || "";
};

const normalizeFoodPreference = (value: unknown): FoodPreference => {
  if (typeof value !== "string") {
    return null;
  }

  return foodPreferenceOptions.includes(value as (typeof foodPreferenceOptions)[number])
    ? (value as FoodPreference)
    : null;
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

  return typeof value === "object" && "id" in value;
};

export const normalizeEventRegistrationValues = (
  values: Partial<EventRegistrationPayloadValues>,
): EventRegistrationPayloadValues => ({
  bioSketch: trimString(values.bioSketch),
  cvFile: values.cvFile ?? null,
  department: trimString(values.department),
  email: trimString(values.email),
  fieldOfExpertise: trimString(values.fieldOfExpertise),
  firstName: trimString(values.firstName),
  flightNotes: trimString(values.flightNotes),
  foodPreference: normalizeFoodPreference(values.foodPreference),
  fullAddress: trimString(values.fullAddress),
  isInternationalParticipant: normalizeBoolean(values.isInternationalParticipant),
  lastName: trimString(values.lastName),
  middleName: trimString(values.middleName),
  mobile: trimString(values.mobile),
  nationality: trimString(values.nationality),
  organization: trimString(values.organization),
  passportInfoPageFile: values.passportInfoPageFile ?? null,
  passportNumber: trimString(values.passportNumber),
  postalCode: trimString(values.postalCode),
  positionTitle: trimString(values.positionTitle),
  preferredArrivalDate: normalizeOptionalDate(values.preferredArrivalDate),
  preferredDepartureDate: normalizeOptionalDate(values.preferredDepartureDate),
  profilePhotoFile: values.profilePhotoFile ?? null,
  prefix: trimString(values.prefix),
  signatureFile: values.signatureFile ?? null,
  whatsappOrViber: trimString(values.whatsappOrViber),
});

const requiredOnSubmit: EventRegistrationFieldName[] = [
  "firstName",
  "lastName",
  "email",
  "organization",
  "department",
  "postalCode",
  "fullAddress",
  "positionTitle",
  "fieldOfExpertise",
  "bioSketch",
  "mobile",
];

const requiredFileFields: Array<
  | "cvFile"
  | "profilePhotoFile"
  | "signatureFile"
> = ["cvFile", "profilePhotoFile", "signatureFile"];

export const validateEventRegistration = (
  values: Partial<EventRegistrationPayloadValues>,
  status: EventRegistrationStatus,
) => {
  const normalized = normalizeEventRegistrationValues(values);
  const errors: EventRegistrationFieldErrors = {};

  if (status === "draft") {
    return { errors, normalized };
  }

  for (const field of requiredOnSubmit) {
    if (!normalized[field]) {
      errors[field] = "This field is required.";
    }
  }

  for (const field of requiredFileFields) {
    if (!hasFileValue(normalized[field])) {
      errors[field] = "Please upload a file.";
    }
  }

  if (!normalized.foodPreference) {
    errors.foodPreference = "Please select a food preference.";
  }

  if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (normalized.isInternationalParticipant) {
    const internationalRequired: EventRegistrationFieldName[] = [
      "passportNumber",
      "nationality",
      "preferredArrivalDate",
      "preferredDepartureDate",
    ];

    for (const field of internationalRequired) {
      if (!normalized[field]) {
        errors[field] = "This field is required for international participants.";
      }
    }

    if (!hasFileValue(normalized.passportInfoPageFile)) {
      errors.passportInfoPageFile =
        "Please upload the passport information page.";
    }
  }

  if (
    normalized.preferredArrivalDate &&
    normalized.preferredDepartureDate &&
    normalized.preferredDepartureDate < normalized.preferredArrivalDate
  ) {
    errors.preferredDepartureDate =
      "Departure date must be on or after the arrival date.";
  }

  return { errors, normalized };
};
