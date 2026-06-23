import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { createLocalReq, getPayload } from "payload";
import config from "@payload-config";

import {
  PUBLIC_AUTH_ERROR_CODES,
  type PublicAuthErrorCode,
} from "@/lib/public-auth";
import {
  type AbstractSubmissionFieldErrors,
  type AbstractSubmissionResponse,
  type AbstractSubmissionValues,
  validateAbstractSubmission,
} from "@/lib/abstract-submission";

const jsonError = (
  body: {
    code: PublicAuthErrorCode | "ALREADY_SUBMITTED" | "EVENT_NOT_FOUND" | "UNAUTHENTICATED";
    errors?: AbstractSubmissionFieldErrors;
    message: string;
  },
  status: number,
) =>
  NextResponse.json<AbstractSubmissionResponse>(
    {
      ...body,
      ok: false,
    },
    { status },
  );

export async function POST(request: Request) {
  const payload = await getPayload({ config });

  try {
    const body = (await request.json()) as Partial<AbstractSubmissionValues>;
    const input: AbstractSubmissionValues = {
      affiliation: typeof body.affiliation === "string" ? body.affiliation : "",
      citation: typeof body.citation === "string" ? body.citation : "",
      event: typeof body.event === "string" ? body.event : "",
      keywords: typeof body.keywords === "string" ? body.keywords : "",
      main_author: typeof body.main_author === "string" ? body.main_author : "",
      text: typeof body.text === "string" ? body.text : "",
      title: typeof body.title === "string" ? body.title : "",
    };

    const requestHeaders = new Headers(await headers());
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    if (cookieHeader) {
      requestHeaders.set("cookie", cookieHeader);
    }

    const { user } = await payload.auth({
      headers: requestHeaders,
    });

    if (!user || user.collection !== "public-users") {
      return jsonError(
        {
          code: "UNAUTHENTICATED",
          message: "Log in to submit an abstract.",
        },
        401,
      );
    }

    const payloadRequest = await createLocalReq({ user }, payload);

    const { errors, normalized } = validateAbstractSubmission(input);

    if (Object.keys(errors).length > 0) {
      return jsonError(
        {
          code: PUBLIC_AUTH_ERROR_CODES.invalidInput,
          errors,
          message: "Please correct the highlighted fields.",
        },
        400,
      );
    }

    const eventResult = await payload.find({
      collection: "events",
      depth: 0,
      limit: 1,
      pagination: false,
      req: payloadRequest,
      where: {
        id: {
          equals: normalized.event,
        },
      },
    });

    const event = eventResult.docs[0];

    if (!event) {
      return jsonError(
        {
          code: "EVENT_NOT_FOUND",
          message: "We couldn't find that event.",
        },
        404,
      );
    }

    await payload.create({
      collection: "abstracts",
      data: normalized as never,
      req: payloadRequest,
    });

    return NextResponse.json<AbstractSubmissionResponse>({
      message: "Abstract submitted successfully. The organising committee will review it internally.",
      ok: true,
    });
  } catch (error) {
    console.error("Abstract submission failed:", error);

    const message = error instanceof Error ? error.message : "We couldn't submit your abstract. Please try again.";

    if (message === "A user can only submit one abstract per event.") {
      return jsonError(
        {
          code: "ALREADY_SUBMITTED",
          message: "You have already submitted an abstract for this event.",
        },
        409,
      );
    }

    if (
      message.includes("characters or fewer") ||
      message === "At least one keyword is required." ||
      message === "A valid event is required."
    ) {
      return jsonError(
        {
          code: PUBLIC_AUTH_ERROR_CODES.invalidInput,
          message,
        },
        400,
      );
    }

    return jsonError(
      {
        code: PUBLIC_AUTH_ERROR_CODES.unknown,
        message: "We couldn't submit your abstract. Please try again.",
      },
      500,
    );
  }
}
