"use client";

import Image from "next/image";
import { useId, useState, type ChangeEvent, type ReactNode } from "react";

import {
  createEmptyEventRegistrationValues,
  foodPreferenceOptions,
  type EventRegistrationFieldErrors,
  type EventRegistrationFileValue,
  type EventRegistrationFormValues,
  type EventRegistrationResponse,
  type EventRegistrationStatus,
  type FoodPreference,
  type UploadedRegistrationAsset,
  validateEventRegistration,
} from "@/lib/event-registration";

const steps = [
  "Personal",
  "Professional",
  "Additional",
  "Travel",
  "Declaration",
] as const;

type RegistrationDocument = {
  bioSketch?: string | null;
  cvFile?: number | UploadedRegistrationAsset | null;
  department?: string | null;
  email?: string | null;
  fieldOfExpertise?: string | null;
  firstName?: string | null;
  flightNotes?: string | null;
  foodPreference?: FoodPreference;
  fullAddress?: string | null;
  isInternationalParticipant?: boolean | null;
  lastName?: string | null;
  middleName?: string | null;
  mobile?: string | null;
  nationality?: string | null;
  organization?: string | null;
  passportInfoPageFile?: number | UploadedRegistrationAsset | null;
  passportNumber?: string | null;
  postalCode?: string | null;
  positionTitle?: string | null;
  preferredArrivalDate?: string | null;
  preferredDepartureDate?: string | null;
  profilePhotoFile?: number | UploadedRegistrationAsset | null;
  prefix?: string | null;
  signatureFile?: number | UploadedRegistrationAsset | null;
  status?: EventRegistrationStatus | null;
  whatsappOrViber?: string | null;
};

type EventRegistrationFormProps = {
  initialRegistration: RegistrationDocument;
  registrationKey: string;
};

const fieldClassName =
  "h-10 w-full rounded-md border border-outline-grey-light bg-white px-3 font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none";

const labelClassName = "font-['inter'] text-base leading-none text-text-black";
const secondaryButtonClassName =
  "flex h-9 items-center justify-center rounded-lg border border-outline-green bg-white px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5] disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClassName =
  "flex h-9 w-full items-center justify-center rounded-lg bg-text-green px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-white-broken shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[200px]";
const iconButtonClassName =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-outline-green bg-white text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5] disabled:cursor-not-allowed disabled:opacity-60";
const textareaClassName =
  "min-h-[140px] w-full rounded-md border border-outline-grey-light bg-white px-3 py-[10px] font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none sm:min-h-[200px]";
const downloadButtonClassName =
  "flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-outline-green bg-white px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5]";

function toUploadedAsset(
  value: number | UploadedRegistrationAsset | null | undefined,
): UploadedRegistrationAsset | null {
  if (value == null) {
    return null;
  }

  if (typeof value === "number" || typeof value === "string") {
    return { id: value };
  }

  return {
    filename: value.filename ?? null,
    id: value.id,
    url: value.url ?? null,
  };
}

function getFileLabel(file: EventRegistrationFileValue) {
  if (!file) {
    return "Click to upload";
  }

  if (file instanceof File) {
    return file.name;
  }

  return file.filename || "File uploaded";
}

function getInitialValues(
  registration: RegistrationDocument,
): EventRegistrationFormValues {
  const empty = createEmptyEventRegistrationValues();

  return {
    ...empty,
    bioSketch: registration.bioSketch ?? "",
    cvFile: toUploadedAsset(registration.cvFile),
    department: registration.department ?? "",
    email: registration.email ?? "",
    fieldOfExpertise: registration.fieldOfExpertise ?? "",
    firstName: registration.firstName ?? "",
    flightNotes: registration.flightNotes ?? "",
    foodPreference: registration.foodPreference ?? null,
    fullAddress: registration.fullAddress ?? "",
    isInternationalParticipant:
      registration.isInternationalParticipant ?? false,
    lastName: registration.lastName ?? "",
    middleName: registration.middleName ?? "",
    mobile: registration.mobile ?? "",
    nationality: registration.nationality ?? "",
    organization: registration.organization ?? "",
    passportInfoPageFile: toUploadedAsset(registration.passportInfoPageFile),
    passportNumber: registration.passportNumber ?? "",
    postalCode: registration.postalCode ?? "",
    positionTitle: registration.positionTitle ?? "",
    preferredArrivalDate: registration.preferredArrivalDate
      ? registration.preferredArrivalDate.slice(0, 10)
      : "",
    preferredDepartureDate: registration.preferredDepartureDate
      ? registration.preferredDepartureDate.slice(0, 10)
      : "",
    profilePhotoFile: toUploadedAsset(registration.profilePhotoFile),
    prefix: registration.prefix ?? "",
    signatureFile: toUploadedAsset(registration.signatureFile),
    whatsappOrViber: registration.whatsappOrViber ?? "",
  };
}

function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="relative mx-auto min-w-[760px] max-w-[1074px] px-8">
        <div
          aria-hidden="true"
          className="absolute top-3 left-[68px] right-[68px] h-px border-t border-dashed border-[#C8D2C3]"
        />
        <ol className="relative flex items-start justify-between gap-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isDone = stepNumber < activeStep;
            const isActive = stepNumber === activeStep;

            return (
              <li
                key={step}
                className="flex min-w-[88px] flex-col items-center gap-2 text-center"
              >
                <div
                  className={`flex min-w-7 items-center justify-center rounded-2xl border px-3 py-1 font-['inter'] text-xl leading-none ${
                    isActive
                      ? "border-text-lime bg-text-lime font-semibold text-text-white-broken"
                      : isDone
                        ? "border-[#3A463D] bg-[#3A463D] font-semibold text-text-white-broken"
                        : "border-[#C8D2C3] bg-text-white-broken font-normal text-text-grey-mid"
                  }`}
                >
                  {isDone ? (
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8.25 6.5 10.75 12 5.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`font-['inter'] text-xl leading-none ${
                    isActive
                      ? "font-semibold text-text-black"
                      : "font-normal text-text-grey-mid"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="font-['inter'] text-sm text-red-700">{error}</p>;
}

function TextField({
  disabled,
  error,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  disabled?: boolean;
  error?: string;
  id: keyof EventRegistrationFormValues;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClassName}>{label}</span>
      <input
        className={fieldClassName}
        disabled={disabled}
        id={id}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <FieldError error={error} />
    </label>
  );
}

function CardShell({
  actions,
  children,
  description,
  title,
}: {
  actions: ReactNode;
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="w-full max-w-[1074px] rounded-2xl border border-outline-grey-light bg-white p-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-1 text-text-black">
          <h2 className="text-[32px] leading-none font-semibold">{title}</h2>
          <p className="font-['inter'] text-sm leading-5">{description}</p>
        </div>

        {children}

        <div className="flex flex-col gap-4 border-t border-outline-grey-light pt-6 sm:flex-row sm:items-center sm:justify-between">
          {actions}
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4.5L6 8l3.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function UploadField({
  acceptedFilesLabel,
  accept,
  disabled,
  error,
  file,
  id,
  label,
  onChange,
}: {
  acceptedFilesLabel: string;
  accept: string;
  disabled?: boolean;
  error?: string;
  file: EventRegistrationFileValue;
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <label
        className="flex min-h-[106px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-[#CEE2D8] bg-[#F2FAF6] px-3 py-8 text-center transition-colors hover:bg-[#ECF7F1]"
        htmlFor={id}
      >
        <span className="font-['inter'] text-sm leading-none text-text-black">
          {getFileLabel(file)}
        </span>
        <span className="font-['inter'] text-xs leading-none text-text-grey-mid">
          {acceptedFilesLabel}
        </span>
      </label>
      <input
        accept={accept}
        className="sr-only"
        disabled={disabled}
        id={id}
        name={id}
        onChange={onChange}
        type="file"
      />
      <FieldError error={error} />
    </div>
  );
}

function CheckboxMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8.25 6.5 10.75 12 5.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function RadioOption({
  checked,
  disabled,
  label,
  onClick,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={checked}
      className="flex items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-colors ${
          checked ? "border-text-green" : "border-[#EAEAF0] bg-white"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full transition-colors ${
            checked ? "bg-text-green" : "bg-transparent"
          }`}
        />
      </span>
      <span className="font-['inter'] text-[13px] leading-none text-text-black">
        {label}
      </span>
    </button>
  );
}

export default function EventRegistrationForm({
  initialRegistration,
  registrationKey,
}: EventRegistrationFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [values, setValues] = useState<EventRegistrationFormValues>(
    getInitialValues(initialRegistration),
  );
  const [fieldErrors, setFieldErrors] = useState<EventRegistrationFieldErrors>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<EventRegistrationStatus>(
    initialRegistration.status ?? "draft",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cvUploadId = useId();
  const passportInfoPageUploadId = useId();
  const profilePhotoUploadId = useId();
  const signatureUploadId = useId();

  const clearMessages = () => {
    if (formError) {
      setFormError(null);
    }

    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const clearFieldError = (field: keyof EventRegistrationFieldErrors) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined,
      };
    });
  };

  const handleChange =
    (field: keyof EventRegistrationFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }));
      clearFieldError(field);
      clearMessages();
    };

  const handleFileChange =
    (
      field:
        | "cvFile"
        | "passportInfoPageFile"
        | "profilePhotoFile"
        | "signatureFile",
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null;

      setValues((current) => ({
        ...current,
        [field]: nextFile,
      }));
      clearFieldError(field);
      clearMessages();
    };

  const handleFoodPreferenceChange = (option: FoodPreference) => {
    setValues((current) => ({
      ...current,
      foodPreference: current.foodPreference === option ? null : option,
    }));
    clearFieldError("foodPreference");
    clearMessages();
  };

  const toggleInternationalParticipant = () => {
    setValues((current) => ({
      ...current,
      isInternationalParticipant: !current.isInternationalParticipant,
    }));
    clearFieldError("passportInfoPageFile");
    clearFieldError("passportNumber");
    clearFieldError("nationality");
    clearFieldError("preferredArrivalDate");
    clearFieldError("preferredDepartureDate");
    clearMessages();
  };

  const buildFormData = (status: EventRegistrationStatus) => {
    const formData = new FormData();

    formData.append("registrationKey", registrationKey);
    formData.append("status", status);

    const scalarEntries: Array<[keyof EventRegistrationFormValues, string]> = [
      ["bioSketch", values.bioSketch],
      ["department", values.department],
      ["email", values.email],
      ["fieldOfExpertise", values.fieldOfExpertise],
      ["firstName", values.firstName],
      ["flightNotes", values.flightNotes],
      ["fullAddress", values.fullAddress],
      ["lastName", values.lastName],
      ["middleName", values.middleName],
      ["mobile", values.mobile],
      ["nationality", values.nationality],
      ["organization", values.organization],
      ["passportNumber", values.passportNumber],
      ["postalCode", values.postalCode],
      ["positionTitle", values.positionTitle],
      ["preferredArrivalDate", values.preferredArrivalDate],
      ["preferredDepartureDate", values.preferredDepartureDate],
      ["prefix", values.prefix],
      ["whatsappOrViber", values.whatsappOrViber],
    ];

    for (const [key, value] of scalarEntries) {
      formData.append(key, value);
    }

    formData.append(
      "isInternationalParticipant",
      String(values.isInternationalParticipant),
    );

    if (values.foodPreference) {
      formData.append("foodPreference", values.foodPreference);
    }

    const fileEntries: Array<
      [
        | "cvFile"
        | "passportInfoPageFile"
        | "profilePhotoFile"
        | "signatureFile",
        EventRegistrationFileValue,
      ]
    > = [
      ["cvFile", values.cvFile],
      ["passportInfoPageFile", values.passportInfoPageFile],
      ["profilePhotoFile", values.profilePhotoFile],
      ["signatureFile", values.signatureFile],
    ];

    for (const [key, value] of fileEntries) {
      if (value instanceof File) {
        formData.append(key, value);
      }
    }

    return formData;
  };

  const persistRegistration = async (status: EventRegistrationStatus) => {
    const { errors } = validateEventRegistration(values, status);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("Please correct the highlighted fields.");
      return false;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/event-registration/save", {
        body: buildFormData(status),
        method: "POST",
      });

      const result = (await response.json()) as EventRegistrationResponse;

      if (!result.ok) {
        setFieldErrors(result.errors || {});
        setFormError(result.message);
        return false;
      }

      setSavedStatus(result.status);
      setSuccessMessage(result.message);
      return true;
    } catch (error) {
      console.error("Event registration request failed:", error);
      setFormError("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStatusBanner = () => {
    if (formError) {
      return (
        <p className="w-full max-w-[1074px] rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-['inter'] text-sm leading-5 text-red-900">
          {formError}
        </p>
      );
    }

    if (successMessage) {
      return (
        <p className="w-full max-w-[1074px] rounded-xl border border-[#CFE8D9] bg-[#E9F8F1] px-4 py-3 font-['inter'] text-sm leading-5 text-text-black">
          {successMessage}
        </p>
      );
    }

    return null;
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full max-w-[1074px] rounded-xl border border-[#CFE8D9] bg-[#F4FAF6] px-4 py-3 font-['inter'] text-sm leading-5 text-text-black">
        Registration status:{" "}
        <span className="font-semibold capitalize">{savedStatus}</span>
      </div>
      {renderStatusBanner()}
      <div className="flex w-full flex-col items-center gap-11">
        <StepIndicator activeStep={activeStep} />

        {activeStep === 1 ? (
          <CardShell
            actions={
              <>
                <button
                  aria-label="Go back"
                  className={iconButtonClassName}
                  disabled
                  type="button"
                >
                  <BackIcon />
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <button
                    className={secondaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("draft")}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "Save as draft"}
                  </button>
                  <button
                    className={primaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => setActiveStep(2)}
                    type="button"
                  >
                    Continue
                  </button>
                </div>
              </>
            }
            description="As they should appear on your forum badge and travel documents."
            title="Personal details"
          >
            <div className="flex flex-col gap-6 pb-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <TextField
                  disabled={isSubmitting}
                  id="prefix"
                  label="Prefix"
                  onChange={handleChange("prefix")}
                  placeholder="Dr."
                  value={values.prefix}
                />
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.firstName}
                  id="firstName"
                  label="First name"
                  onChange={handleChange("firstName")}
                  value={values.firstName}
                />
                <TextField
                  disabled={isSubmitting}
                  id="middleName"
                  label="Middle name"
                  onChange={handleChange("middleName")}
                  value={values.middleName}
                />
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.lastName}
                  id="lastName"
                  label="Last name"
                  onChange={handleChange("lastName")}
                  value={values.lastName}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.email}
                  id="email"
                  label="Email address"
                  onChange={handleChange("email")}
                  type="email"
                  value={values.email}
                />
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.organization}
                  id="organization"
                  label="Organization"
                  onChange={handleChange("organization")}
                  value={values.organization}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.department}
                  id="department"
                  label="Department / unit"
                  onChange={handleChange("department")}
                  value={values.department}
                />
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.postalCode}
                  id="postalCode"
                  label="Postal code"
                  onChange={handleChange("postalCode")}
                  value={values.postalCode}
                />
              </div>

              <label className="flex flex-col gap-2">
                <span className={labelClassName}>Full address</span>
                <textarea
                  className={textareaClassName}
                  disabled={isSubmitting}
                  name="fullAddress"
                  onChange={handleChange("fullAddress")}
                  value={values.fullAddress}
                />
                <FieldError error={fieldErrors.fullAddress} />
              </label>
            </div>
          </CardShell>
        ) : activeStep === 2 ? (
          <CardShell
            actions={
              <>
                <button
                  aria-label="Back to personal details"
                  className={iconButtonClassName}
                  disabled={isSubmitting}
                  onClick={() => setActiveStep(1)}
                  type="button"
                >
                  <BackIcon />
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <button
                    className={secondaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("draft")}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "Save as draft"}
                  </button>
                  <button
                    className={primaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => setActiveStep(3)}
                    type="button"
                  >
                    Continue
                  </button>
                </div>
              </>
            }
            description="Helps us place you in the right thematic sessions."
            title="Professional information"
          >
            <div className="flex flex-col gap-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.positionTitle}
                  id="positionTitle"
                  label="Position title"
                  onChange={handleChange("positionTitle")}
                  value={values.positionTitle}
                />
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.fieldOfExpertise}
                  id="fieldOfExpertise"
                  label="Field of expertise"
                  onChange={handleChange("fieldOfExpertise")}
                  value={values.fieldOfExpertise}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <UploadField
                  accept="application/pdf"
                  acceptedFilesLabel="PDF. max 5 MB"
                  disabled={isSubmitting}
                  error={fieldErrors.cvFile}
                  file={values.cvFile}
                  id={cvUploadId}
                  label="CV upload"
                  onChange={handleFileChange("cvFile")}
                />
                <UploadField
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  acceptedFilesLabel="JPG / PNG . square preferred"
                  disabled={isSubmitting}
                  error={fieldErrors.profilePhotoFile}
                  file={values.profilePhotoFile}
                  id={profilePhotoUploadId}
                  label="Profile photo"
                  onChange={handleFileChange("profilePhotoFile")}
                />
              </div>

              <label className="flex flex-col gap-2">
                <span className={labelClassName}>Bio sketch</span>
                <textarea
                  className="min-h-[190px] w-full rounded-md border border-outline-grey-light bg-white px-3 py-[10px] font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none sm:min-h-[200px]"
                  disabled={isSubmitting}
                  name="bioSketch"
                  onChange={handleChange("bioSketch")}
                  value={values.bioSketch}
                />
                <FieldError error={fieldErrors.bioSketch} />
              </label>
            </div>
          </CardShell>
        ) : activeStep === 3 ? (
          <CardShell
            actions={
              <>
                <button
                  aria-label="Back to professional information"
                  className={iconButtonClassName}
                  disabled={isSubmitting}
                  onClick={() => setActiveStep(2)}
                  type="button"
                >
                  <BackIcon />
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <button
                    className={secondaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("draft")}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "Save as draft"}
                  </button>
                  <button
                    className={primaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => setActiveStep(4)}
                    type="button"
                  >
                    Continue
                  </button>
                </div>
              </>
            }
            description="Logistics for your stay during the forum."
            title="Additional details"
          >
            <div className="flex flex-col gap-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting}
                  error={fieldErrors.mobile}
                  id="mobile"
                  label="Mobile"
                  onChange={handleChange("mobile")}
                  value={values.mobile}
                />
                <TextField
                  disabled={isSubmitting}
                  id="whatsappOrViber"
                  label="Whatsapp / viber"
                  onChange={handleChange("whatsappOrViber")}
                  value={values.whatsappOrViber}
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className={labelClassName}>Food preference</span>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {foodPreferenceOptions.map((option) => (
                    <RadioOption
                      checked={values.foodPreference === option}
                      disabled={isSubmitting}
                      key={option}
                      label={option}
                      onClick={() => handleFoodPreferenceChange(option)}
                    />
                  ))}
                </div>
                <FieldError error={fieldErrors.foodPreference} />
              </div>

              <button
                aria-pressed={values.isInternationalParticipant}
                className="flex w-full items-start gap-4 rounded-xl border border-[#EAEAEA] bg-[#F6F7F9] p-4 text-left"
                disabled={isSubmitting}
                onClick={toggleInternationalParticipant}
                type="button"
              >
                <span
                  className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] transition-colors ${
                    values.isInternationalParticipant
                      ? "bg-[#017649] text-white"
                      : "border-2 border-[#EAEAF0] bg-white text-transparent"
                  }`}
                >
                  <CheckboxMark />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-2 font-['inter']">
                  <span className="text-base leading-none text-text-black">
                    I am an international participant
                  </span>
                  <span className="text-sm leading-5 text-text-grey-mid">
                    You&apos;ll be asked to upload passport details and flight
                    info in the next step.
                  </span>
                </span>
              </button>
            </div>
          </CardShell>
        ) : activeStep === 4 ? (
          <CardShell
            actions={
              <>
                <button
                  aria-label="Back to additional details"
                  className={iconButtonClassName}
                  disabled={isSubmitting}
                  onClick={() => setActiveStep(3)}
                  type="button"
                >
                  <BackIcon />
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <button
                    className={secondaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("draft")}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "Save as draft"}
                  </button>
                  <button
                    className={primaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => setActiveStep(5)}
                    type="button"
                  >
                    Continue
                  </button>
                </div>
              </>
            }
            description="Required for international participants."
            title="Travel - Flight booking & passport (international)"
          >
            <div className="flex flex-col gap-6 pb-6">
              <UploadField
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                acceptedFilesLabel="PDF / PNG / JPG . max 5 MB"
                disabled={isSubmitting || !values.isInternationalParticipant}
                error={fieldErrors.passportInfoPageFile}
                file={values.passportInfoPageFile}
                id={passportInfoPageUploadId}
                label="Passport info page"
                onChange={handleFileChange("passportInfoPageFile")}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting || !values.isInternationalParticipant}
                  error={fieldErrors.passportNumber}
                  id="passportNumber"
                  label="Passport number"
                  onChange={handleChange("passportNumber")}
                  value={values.passportNumber}
                />
                <TextField
                  disabled={isSubmitting || !values.isInternationalParticipant}
                  error={fieldErrors.nationality}
                  id="nationality"
                  label="Nationality"
                  onChange={handleChange("nationality")}
                  value={values.nationality}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  disabled={isSubmitting || !values.isInternationalParticipant}
                  error={fieldErrors.preferredArrivalDate}
                  id="preferredArrivalDate"
                  label="Preferred arrival date"
                  onChange={handleChange("preferredArrivalDate")}
                  type="date"
                  value={values.preferredArrivalDate}
                />

                <TextField
                  disabled={isSubmitting || !values.isInternationalParticipant}
                  error={fieldErrors.preferredDepartureDate}
                  id="preferredDepartureDate"
                  label="Preferred departure date"
                  onChange={handleChange("preferredDepartureDate")}
                  type="date"
                  value={values.preferredDepartureDate}
                />
              </div>

              <label className="flex flex-col gap-2">
                <span className={labelClassName}>Flight notes</span>
                <textarea
                  className={textareaClassName}
                  disabled={isSubmitting || !values.isInternationalParticipant}
                  name="flightNotes"
                  onChange={handleChange("flightNotes")}
                  value={values.flightNotes}
                />
              </label>
            </div>
          </CardShell>
        ) : (
          <CardShell
            actions={
              <>
                <button
                  aria-label="Back to travel details"
                  className={iconButtonClassName}
                  disabled={isSubmitting}
                  onClick={() => setActiveStep(4)}
                  type="button"
                >
                  <BackIcon />
                </button>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <button
                    className={secondaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("draft")}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "Save as draft"}
                  </button>
                  <button
                    className={primaryButtonClassName}
                    disabled={isSubmitting}
                    onClick={() => void persistRegistration("submitted")}
                    type="button"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </>
            }
            description="Download the PDF document, sign it, then upload it below."
            title="Conforme"
          >
            <div className="flex flex-col gap-6 pb-6">
              <a
                className={downloadButtonClassName}
                download
                href="/publication.pdf"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  height={16}
                  src="/download.svg"
                  width={16}
                />
                Download PDF document
              </a>

              <UploadField
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                acceptedFilesLabel="PDF / PNG / JPG . max 5 MB"
                disabled={isSubmitting}
                error={fieldErrors.signatureFile}
                file={values.signatureFile}
                id={signatureUploadId}
                label="Signature"
                onChange={handleFileChange("signatureFile")}
              />
            </div>
          </CardShell>
        )}
      </div>
    </div>
  );
}
