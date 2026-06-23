export const PUBLIC_AUTH_FALLBACK_REDIRECT = "/";

export const PUBLIC_AUTH_ERROR_CODES = {
  duplicateEmail: "DUPLICATE_EMAIL",
  invalidCredentials: "INVALID_CREDENTIALS",
  invalidInput: "INVALID_INPUT",
  unverifiedEmail: "UNVERIFIED_EMAIL",
  unknown: "UNKNOWN_ERROR",
} as const;

export type PublicAuthErrorCode =
  (typeof PUBLIC_AUTH_ERROR_CODES)[keyof typeof PUBLIC_AUTH_ERROR_CODES];

export type PublicAuthErrorResponse = {
  code: PublicAuthErrorCode;
  message: string;
  ok: false;
};

export type PublicAuthSuccessResponse = {
  message: string;
  ok: true;
  redirect?: string;
};

export type PublicAuthResponse =
  | PublicAuthErrorResponse
  | PublicAuthSuccessResponse;

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const getSafeRedirect = (
  candidate: null | string | undefined,
  fallback = PUBLIC_AUTH_FALLBACK_REDIRECT,
) => {
  if (!candidate) return fallback;

  const normalized = candidate.trim();

  if (!normalized.startsWith("/") || normalized.startsWith("//")) {
    return fallback;
  }

  return normalized;
};
