"use client";

import { useId, useState, type ChangeEvent, type ReactNode } from "react";

const steps = [
  "Personal",
  "Professional",
  "Additional",
  "Travel",
  "Declaration",
  "Conforme",
] as const;

type RegistrationFormValues = {
  bioSketch: string;
  cvFile: File | null;
  department: string;
  email: string;
  fieldOfExpertise: string;
  firstName: string;
  fullAddress: string;
  lastName: string;
  middleName: string;
  organization: string;
  postalCode: string;
  positionTitle: string;
  profilePhotoFile: File | null;
  prefix: string;
};

const initialValues: RegistrationFormValues = {
  bioSketch: "",
  cvFile: null,
  department: "",
  email: "",
  fieldOfExpertise: "",
  firstName: "",
  fullAddress: "",
  lastName: "",
  middleName: "",
  organization: "",
  postalCode: "",
  positionTitle: "",
  profilePhotoFile: null,
  prefix: "",
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

export default function EventRegistrationForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const cvUploadId = useId();
  const profilePhotoUploadId = useId();

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
    (field: "cvFile" | "profilePhotoFile") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null;

      setValues((current) => ({
        ...current,
        [field]: nextFile,
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
      ) : (
        <CardShell
          actions={
            <>
              <button
                className={secondaryButtonClassName}
                onClick={() => setActiveStep(2)}
                type="button"
              >
                Back to professional information
              </button>
              <div className="font-['inter'] text-sm leading-5 text-text-grey-mid">
                Additional registration steps will be implemented next.
              </div>
            </>
          }
          description="This placeholder keeps the wizard flow moving while the remaining registration steps are still being built."
          title="Additional"
        >
          <div className="rounded-xl border border-dashed border-[#C8D2C3] bg-[#FBFBF9] px-6 py-10">
            <p className="font-['inter'] text-base leading-7 text-text-black">
              Additional registration details are coming next. This placeholder
              keeps the wizard progression intact while the remaining steps are
              still under development.
            </p>
          </div>
        </CardShell>
      )}
    </div>
  );
}
