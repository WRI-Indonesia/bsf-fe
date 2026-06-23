import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  PUBLIC_AUTH_ERROR_CODES,
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

export async function POST(request: Request) {
  const payload = await getPayload({ config });

  try {
    const body = (await request.json()) as Partial<{
      email: string;
      name: string;
      password: string;
    }>;

    const name = body.name?.trim() || "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = body.password || "";

    if (!name) {
      return invalidInput("Full name is required.");
    }

    if (!email) {
      return invalidInput("Email is required.");
    }

    if (!password || password.length < 8) {
      return invalidInput("Password must be at least 8 characters long.");
    }

    const existing = await payload.find({
      collection: "public-users",
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existing.docs.length > 0) {
      return NextResponse.json<PublicAuthResponse>(
        {
          code: PUBLIC_AUTH_ERROR_CODES.duplicateEmail,
          message: "An account with that email already exists.",
          ok: false,
        },
        { status: 409 },
      );
    }

    await payload.create({
      collection: "public-users",
      data: {
        email,
        name,
        password,
      },
    });

    return NextResponse.json<PublicAuthResponse>({
      message: "Account created. Check your email to verify your account.",
      ok: true,
    });
  } catch (error) {
    console.error("Public signup failed:", error);

    return NextResponse.json<PublicAuthResponse>(
      {
        code: PUBLIC_AUTH_ERROR_CODES.unknown,
        message: "We couldn't create your account. Please try again.",
        ok: false,
      },
      { status: 500 },
    );
  }
}
