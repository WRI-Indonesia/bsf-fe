import config from "@payload-config";
import { getPayload, type TypedUser } from "payload";

type PublicUser = TypedUser & {
  collection?: string;
  email?: string;
  id: number | string;
  name?: string | null;
};

export async function getPublicUserFromHeaders(
  requestHeaders: Headers,
): Promise<PublicUser | null> {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({
    headers: requestHeaders,
  });

  if (!user || user.collection !== "public-users") {
    return null;
  }

  return user as PublicUser;
}
