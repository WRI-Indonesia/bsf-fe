import { NextResponse } from "next/server";
import { generatePayloadCookie, getPayload } from "payload";
import config from "@payload-config";

import {
  getSafeRedirect,
  PUBLIC_AUTH_ERROR_CODES,
  PUBLIC_AUTH_FALLBACK_REDIRECT,
  type PublicAuthResponse,
  normalizeEmail,
} from "@/lib/public-auth";

const invalidInput = (message: string, status = 400) =>
  NextResponse.json<PublicAuthResponse>(
    {
      code: PUBLIC_AUTH_ERROR_CODES.invalidInput,
      message,
      ok: false,
    },
    { status },
  );

const isNamedError = (error: unknown, name: string) =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === name;

export async function POST(request: Request) {
  const payload = await getPayload({ config });

  try {
    const body = (await request.json()) as Partial<{
      email: string;
      password: string;
      redirect: string;
    }>;

    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = body.password || "";
    const redirect = getSafeRedirect(
      body.redirect,
      PUBLIC_AUTH_FALLBACK_REDIRECT,
    );

    if (!email) {
      return invalidInput("Email is required.");
    }

    if (!password) {
      return invalidInput("Password is required.");
    }

    const result = await payload.login({
      collection: "public-users",
      data: {
        email,
        password,
      },
    });

    if (!result.token) {
      return NextResponse.json<PublicAuthResponse>(
        {
          code: PUBLIC_AUTH_ERROR_CODES.unknown,
          message: "Login succeeded but no session token was returned.",
          ok: false,
        },
        { status: 500 },
      );
    }

    const publicUsersCollection = payload.collections["public-users"];
    const cookie = generatePayloadCookie({
      collectionAuthConfig: publicUsersCollection.config.auth,
      cookiePrefix: payload.config.cookiePrefix,
      token: result.token,
    });

    return NextResponse.json<PublicAuthResponse>(
      {
        message: "Login successful.",
        ok: true,
        redirect,
      },
      {
        headers: {
          "Set-Cookie": cookie,
        },
      },
    );
  } catch (error) {
    if (isNamedError(error, "UnverifiedEmail")) {
      return NextResponse.json<PublicAuthResponse>(
        {
          code: PUBLIC_AUTH_ERROR_CODES.unverifiedEmail,
          message: "Verify your email before logging in.",
          ok: false,
        },
        { status: 403 },
      );
    }

    if (isNamedError(error, "AuthenticationError")) {
      return NextResponse.json<PublicAuthResponse>(
        {
          code: PUBLIC_AUTH_ERROR_CODES.invalidCredentials,
          message: "Email or password is incorrect.",
          ok: false,
        },
        { status: 401 },
      );
    }

    console.error("Public login failed:", error);

    return NextResponse.json<PublicAuthResponse>(
      {
        code: PUBLIC_AUTH_ERROR_CODES.unknown,
        message: "We couldn't log you in. Please try again.",
        ok: false,
      },
      { status: 500 },
    );
  }
}
