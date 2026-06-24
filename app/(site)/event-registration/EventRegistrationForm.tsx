"use client";

import Image from "next/image";

import { useId, useState, type ChangeEvent, type ReactNode } from "react";

const steps = [
  "Personal",
  "Professional",
  "Additional",
  "Travel",
  "Declaration",
] as const;

const foodPreferenceOptions = [
  "Halal",
  "Vegetarian",
  "No restriction",
  "Other",
] as const;

type FoodPreference = (typeof foodPreferenceOptions)[number] | null;

type RegistrationFormValues = {
  bioSketch: string;
  cvFile: File | null;
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
  organization: string;
  nationality: string;
  passportInfoPageFile: File | null;
  passportNumber: string;
  postalCode: string;
  positionTitle: string;
  preferredArrivalDate: string;
  preferredDepartureDate: string;
  profilePhotoFile: File | null;
  prefix: string;
  signatureFile: File | null;
  whatsappOrViber: string;
};

const initialValues: RegistrationFormValues = {
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
  organization: "",
  nationality: "",
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
};

const fieldClassName =
  "h-10 w-full rounded-md border border-outline-grey-light bg-white px-3 font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none";

const labelClassName = "font-['inter'] text-base leading-none text-text-black";
const secondaryButtonClassName =
  "flex h-9 items-center justify-center rounded-lg border border-outline-green bg-white px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5]";
const primaryButtonClassName =
  "flex h-9 w-full items-center justify-center rounded-lg bg-text-green px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-white-broken shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-opacity hover:opacity-95 sm:w-[200px]";
const iconButtonClassName =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-outline-green bg-white text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5]";
const textareaClassName =
  "min-h-[140px] w-full rounded-md border border-outline-grey-light bg-white px-3 py-[10px] font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none sm:min-h-[200px]";
const downloadButtonClassName =
  "flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-outline-green bg-white px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-green shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] transition-colors hover:bg-[#F6F9F5]";

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
                      : isDone
                        ? "font-normal text-text-grey-mid"
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

function TextField({
  id,
  label,
  onChange,
  placeholder,
  value,
}: {
  id: keyof RegistrationFormValues;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClassName}>{label}</span>
      <input
        className={fieldClassName}
        id={id}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
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
  file,
  id,
  label,
  onChange,
}: {
  acceptedFilesLabel: string;
  accept: string;
  file: File | null;
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
          {file ? file.name : "Click to upload"}
        </span>
        <span className="font-['inter'] text-xs leading-none text-text-grey-mid">
          {file ? acceptedFilesLabel : acceptedFilesLabel}
        </span>
      </label>
      <input
        accept={accept}
        className="sr-only"
        id={id}
        name={id}
        onChange={onChange}
        type="file"
      />
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
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={checked}
      className="flex items-center gap-3 text-left"
      onClick={onClick}
      type="button"
    >
      <span
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-text-green"
            : "border-[#EAEAF0] bg-white"
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

export default function EventRegistrationForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const cvUploadId = useId();
  const passportInfoPageUploadId = useId();
  const profilePhotoUploadId = useId();
  const signatureUploadId = useId();

  const handleChange =
    (field: keyof RegistrationFormValues) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const nextValue = event.target.value;

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }));
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
    };

  const handleFoodPreferenceChange = (option: FoodPreference) => {
    setValues((current) => ({
      ...current,
      foodPreference: current.foodPreference === option ? null : option,
    }));
  };

  const toggleInternationalParticipant = () => {
    setValues((current) => ({
      ...current,
      isInternationalParticipant: !current.isInternationalParticipant,
    }));
  };

  return (
    <div className="flex w-full flex-col items-center gap-11">
      <StepIndicator activeStep={activeStep} />

      {activeStep === 1 ? (
        <CardShell
          actions={
            <>
              <button
                aria-label="Go back"
                className={iconButtonClassName}
                type="button"
              >
                <BackIcon />
              </button>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                <button
                  className={secondaryButtonClassName}
                  type="button"
                >
                  Save as draft
                </button>
                <button
                  className={primaryButtonClassName}
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
            <div className="grid gap-6 lg:grid-cols-4 sm:grid-cols-2">
              <TextField
                id="prefix"
                label="Prefix"
                onChange={handleChange("prefix")}
                placeholder="Dr."
                value={values.prefix}
              />
              <TextField
                id="firstName"
                label="First name"
                onChange={handleChange("firstName")}
                value={values.firstName}
              />
              <TextField
                id="middleName"
                label="Middle name"
                onChange={handleChange("middleName")}
                value={values.middleName}
              />
              <TextField
                id="lastName"
                label="Last name"
                onChange={handleChange("lastName")}
                value={values.lastName}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="email"
                label="Email address"
                onChange={handleChange("email")}
                value={values.email}
              />
              <TextField
                id="organization"
                label="Organization"
                onChange={handleChange("organization")}
                value={values.organization}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="department"
                label="Department / unit"
                onChange={handleChange("department")}
                value={values.department}
              />
              <TextField
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
                name="fullAddress"
                onChange={handleChange("fullAddress")}
                value={values.fullAddress}
              />
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
                onClick={() => setActiveStep(1)}
                type="button"
              >
                <BackIcon />
              </button>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                <button className={secondaryButtonClassName} type="button">
                  Save as draft
                </button>
                <button
                  className={primaryButtonClassName}
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
                id="positionTitle"
                label="Position title"
                onChange={handleChange("positionTitle")}
                value={values.positionTitle}
              />
              <TextField
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
                file={values.cvFile}
                id={cvUploadId}
                label="CV upload"
                onChange={handleFileChange("cvFile")}
              />
              <UploadField
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                acceptedFilesLabel="JPG / PNG . square preferred"
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
                name="bioSketch"
                onChange={handleChange("bioSketch")}
                value={values.bioSketch}
              />
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
                onClick={() => setActiveStep(2)}
                type="button"
              >
                <BackIcon />
              </button>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                <button className={secondaryButtonClassName} type="button">
                  Save as draft
                </button>
                <button
                  className={primaryButtonClassName}
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
                id="mobile"
                label="Mobile"
                onChange={handleChange("mobile")}
                value={values.mobile}
              />
              <TextField
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
                    key={option}
                    label={option}
                    onClick={() => handleFoodPreferenceChange(option)}
                  />
                ))}
              </div>
            </div>

            <button
              aria-pressed={values.isInternationalParticipant}
              className="flex w-full items-start gap-4 rounded-xl border border-[#EAEAEA] bg-[#F6F7F9] p-4 text-left"
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
                onClick={() => setActiveStep(3)}
                type="button"
              >
                <BackIcon />
              </button>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                <button className={secondaryButtonClassName} type="button">
                  Save as draft
                </button>
                <button
                  className={primaryButtonClassName}
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
              file={values.passportInfoPageFile}
              id={passportInfoPageUploadId}
              label="Passport info page"
              onChange={handleFileChange("passportInfoPageFile")}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="passportNumber"
                label="Passport number"
                onChange={handleChange("passportNumber")}
                value={values.passportNumber}
              />
              <TextField
                id="nationality"
                label="Nationality"
                onChange={handleChange("nationality")}
                value={values.nationality}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className={labelClassName}>Preferred arrival date</span>
                <input
                  className={fieldClassName}
                  name="preferredArrivalDate"
                  onChange={handleChange("preferredArrivalDate")}
                  type="date"
                  value={values.preferredArrivalDate}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClassName}>Preferred departure date</span>
                <input
                  className={fieldClassName}
                  name="preferredDepartureDate"
                  onChange={handleChange("preferredDepartureDate")}
                  type="date"
                  value={values.preferredDepartureDate}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className={labelClassName}>Flight notes</span>
              <textarea
                className={textareaClassName}
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
                onClick={() => setActiveStep(4)}
                type="button"
              >
                <BackIcon />
              </button>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                <button className={secondaryButtonClassName} type="button">
                  Save as draft
                </button>
                <button className={primaryButtonClassName} type="button">
                  Submit
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
              file={values.signatureFile}
              id={signatureUploadId}
              label="Signature"
              onChange={handleFileChange("signatureFile")}
            />
          </div>
        </CardShell>
      )}
    </div>
  );
}
