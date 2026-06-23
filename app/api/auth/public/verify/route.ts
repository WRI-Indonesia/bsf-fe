import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?verifyError=1", request.url));
  }

  try {
    const verified = await payload.verifyEmail({
      collection: "public-users",
      token,
    });

    if (!verified) {
      return NextResponse.redirect(new URL("/login?verifyError=1", request.url));
    }

    return NextResponse.redirect(new URL("/login?verified=1", request.url));
  } catch (error) {
    console.error("Public email verification failed:", error);
    return NextResponse.redirect(new URL("/login?verifyError=1", request.url));
  }
}
