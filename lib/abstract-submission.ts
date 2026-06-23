import { PUBLIC_AUTH_ERROR_CODES } from "@/lib/public-auth";

export const ABSTRACT_TEXT_MAX_LENGTH = 300;

export type AbstractSubmissionValues = {
  affiliation: string;
  citation: string;
  event: string;
  keywords: string;
  main_author: string;
  text: string;
  title: string;
};

export type AbstractSubmissionFieldErrors = Partial<
  Record<keyof Omit<AbstractSubmissionValues, "event">, string>
>;

export type AbstractSubmissionErrorCode =
  | (typeof PUBLIC_AUTH_ERROR_CODES)[keyof typeof PUBLIC_AUTH_ERROR_CODES]
  | "ALREADY_SUBMITTED"
  | "EVENT_NOT_FOUND"
  | "UNAUTHENTICATED";

export type AbstractSubmissionSuccessResponse = {
  message: string;
  ok: true;
};

export type AbstractSubmissionErrorResponse = {
  code: AbstractSubmissionErrorCode;
  errors?: AbstractSubmissionFieldErrors;
  message: string;
  ok: false;
};

export type AbstractSubmissionResponse =
  | AbstractSubmissionErrorResponse
  | AbstractSubmissionSuccessResponse;

export type NormalizedAbstractSubmission = {
  affiliation: string;
  citation: string;
  event: number;
  keywords: Array<{ keyword: string }>;
  main_author: string;
  text: string;
  title: string;
};

const buildKeywordRows = (rawKeywords: string) => {
  return rawKeywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .map((keyword) => ({ keyword }));
};

export const normalizeAbstractSubmission = (
  values: AbstractSubmissionValues,
): NormalizedAbstractSubmission => ({
  affiliation: values.affiliation.trim(),
  citation: values.citation.trim(),
  event: Number(values.event.trim()),
  keywords: buildKeywordRows(values.keywords),
  main_author: values.main_author.trim(),
  text: values.text.trim(),
  title: values.title.trim(),
});

export const validateAbstractSubmission = (
  values: AbstractSubmissionValues,
): {
  errors: AbstractSubmissionFieldErrors;
  normalized: NormalizedAbstractSubmission;
} => {
  const normalized = normalizeAbstractSubmission(values);
  const errors: AbstractSubmissionFieldErrors = {};

  if (!normalized.main_author) {
    errors.main_author = "Main author is required.";
  }

  if (!normalized.affiliation) {
    errors.affiliation = "Affiliation is required.";
  }

  if (!normalized.title) {
    errors.title = "Abstract title is required.";
  }

  if (!normalized.text) {
    errors.text = "Abstract text is required.";
  } else if (normalized.text.length > ABSTRACT_TEXT_MAX_LENGTH) {
    errors.text = `Abstract text must be ${ABSTRACT_TEXT_MAX_LENGTH} characters or fewer.`;
  }

  if (normalized.keywords.length === 0) {
    errors.keywords = "At least one keyword is required.";
  }

  if (!normalized.citation) {
    errors.citation = "Suggested citation is required.";
  }

  if (!Number.isInteger(normalized.event) || normalized.event <= 0) {
    throw new Error("A valid event is required.");
  }

  return { errors, normalized };
};
