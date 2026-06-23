"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  ABSTRACT_TEXT_MAX_LENGTH,
  type AbstractSubmissionFieldErrors,
  type AbstractSubmissionResponse,
  type AbstractSubmissionValues,
  validateAbstractSubmission,
} from "@/lib/abstract-submission";

type AbstractSubmissionFormProps = {
  eventId: string;
};

const initialValues = (eventId: string): AbstractSubmissionValues => ({
  affiliation: "",
  citation: "",
  event: eventId,
  keywords: "",
  main_author: "",
  text: "",
  title: "",
});

const inputClassName =
  "h-10 w-full rounded-md border border-outline-grey-light px-3 font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none";

const labelClassName =
  "font-['inter'] text-base leading-none text-text-black";

export default function AbstractSubmissionForm({
  eventId,
}: AbstractSubmissionFormProps) {
  const [formValues, setFormValues] = useState<AbstractSubmissionValues>(
    initialValues(eventId),
  );
  const [fieldErrors, setFieldErrors] = useState<AbstractSubmissionFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof Omit<AbstractSubmissionValues, "event">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setFormValues((current) => ({
        ...current,
        [field]: nextValue,
      }));

      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }

        return {
          ...current,
          [field]: undefined,
        };
      });

      if (formError) {
        setFormError(null);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { errors } = validateAbstractSubmission(formValues);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/abstracts/submit", {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response.json()) as AbstractSubmissionResponse;

      if (!result.ok) {
        setFieldErrors(result.errors || {});
        setFormError(result.message);
        return;
      }

      setSuccessMessage(result.message);
    } catch (error) {
      console.error("Abstract submission request failed:", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="flex w-full max-w-[724px] flex-col items-center gap-10">
        <div className="w-full rounded-2xl border border-outline-grey-light bg-white p-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
          <div className="rounded-xl border border-[#CFE8D9] bg-[#E9F8F1] px-5 py-6 text-center">
            <p className="font-['inter'] text-base leading-6 text-text-black">
              {successMessage}
            </p>
          </div>
        </div>
        <Link
          href="/events"
          className="font-['inter'] text-xl leading-normal text-text-grey-mid transition-colors hover:text-text-green"
        >
          <span aria-hidden="true">← </span>
          Back to Events
        </Link>
      </div>
    );
  }

  const remainingCharacters = ABSTRACT_TEXT_MAX_LENGTH - formValues.text.length;

  return (
    <div className="flex w-full max-w-[724px] flex-col items-center gap-10">
      <div className="w-full rounded-2xl border border-outline-grey-light bg-white p-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {formError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-['inter'] text-sm leading-5 text-red-900">
              {formError}
            </p>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className={labelClassName} htmlFor="main_author">
                Main Author
              </label>
              <input
                id="main_author"
                className={inputClassName}
                disabled={isSubmitting}
                onChange={handleChange("main_author")}
                placeholder="Full name"
                required
                value={formValues.main_author}
              />
              {fieldErrors.main_author ? (
                <p className="font-['inter'] text-sm text-red-700">
                  {fieldErrors.main_author}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClassName} htmlFor="affiliation">
                Affiliation
              </label>
              <input
                id="affiliation"
                className={inputClassName}
                disabled={isSubmitting}
                onChange={handleChange("affiliation")}
                placeholder="Institution / organisation"
                required
                value={formValues.affiliation}
              />
              {fieldErrors.affiliation ? (
                <p className="font-['inter'] text-sm text-red-700">
                  {fieldErrors.affiliation}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="title">
              Abstract Title
            </label>
            <input
              id="title"
              className={inputClassName}
              disabled={isSubmitting}
              onChange={handleChange("title")}
              placeholder="A concise, descriptive title"
              required
              value={formValues.title}
            />
            {fieldErrors.title ? (
              <p className="font-['inter'] text-sm text-red-700">
                {fieldErrors.title}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label className={labelClassName} htmlFor="text">
                Abstract Text
              </label>
              <p className="font-['inter'] text-sm text-text-grey-mid">
                {remainingCharacters} characters left
              </p>
            </div>
            <textarea
              id="text"
              className="min-h-[200px] w-full rounded-md border border-outline-grey-light px-3 py-[10px] font-['inter'] text-sm leading-5 text-text-black placeholder:text-[#717D96] focus:border-text-green focus:outline-none"
              disabled={isSubmitting}
              maxLength={ABSTRACT_TEXT_MAX_LENGTH}
              onChange={handleChange("text")}
              placeholder="Background, methods, results, conclusions (max 300 characters)..."
              required
              value={formValues.text}
            />
            {fieldErrors.text ? (
              <p className="font-['inter'] text-sm text-red-700">
                {fieldErrors.text}
              </p>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className={labelClassName} htmlFor="keywords">
                Keywords
              </label>
              <input
                id="keywords"
                className={inputClassName}
                disabled={isSubmitting}
                onChange={handleChange("keywords")}
                placeholder="e.g. peatland, restoration, REDD+"
                required
                value={formValues.keywords}
              />
              {fieldErrors.keywords ? (
                <p className="font-['inter'] text-sm text-red-700">
                  {fieldErrors.keywords}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClassName} htmlFor="citation">
                Suggested citation
              </label>
              <input
                id="citation"
                className={inputClassName}
                disabled={isSubmitting}
                onChange={handleChange("citation")}
                placeholder="Author et al., 2026.."
                required
                value={formValues.citation}
              />
              {fieldErrors.citation ? (
                <p className="font-['inter'] text-sm text-red-700">
                  {fieldErrors.citation}
                </p>
              ) : null}
            </div>
          </div>

          <button
            className="mt-3 flex h-10 w-full items-center justify-center rounded-lg bg-text-green px-4 py-2 font-['inter'] text-sm font-semibold tracking-[0.1px] text-text-white-broken transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Abstract"}
          </button>
        </form>
      </div>

      <Link
        href="/events"
        className="font-['inter'] text-xl leading-normal text-text-grey-mid transition-colors hover:text-text-green"
      >
        <span aria-hidden="true">← </span>
        Back to Events
      </Link>
    </div>
  );
}
