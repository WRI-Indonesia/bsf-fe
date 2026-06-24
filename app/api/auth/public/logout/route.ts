import { NextResponse } from "next/server";
import { generateExpiredPayloadCookie, getPayload } from "payload";
import config from "@payload-config";

export async function POST() {
  const payload = await getPayload({ config });
  const publicUsersCollection = payload.collections["public-users"];
  const expiredCookie = generateExpiredPayloadCookie({
    collectionAuthConfig: publicUsersCollection.config.auth,
    cookiePrefix: payload.config.cookiePrefix,
  });

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": expiredCookie,
      },
    },
  );
}
