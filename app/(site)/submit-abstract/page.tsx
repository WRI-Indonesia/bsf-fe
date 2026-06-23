import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import Footer from "../components/Footer";
import Header from "../components/Header";
import AbstractSubmissionForm from "./AbstractSubmissionForm";
import { getPublicUserFromHeaders } from "@/lib/public-user-session";

type SubmitAbstractPageProps = {
  searchParams: Promise<{
    event?: string;
  }>;
};

async function getEvent(eventId: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "events",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      id: {
        equals: eventId,
      },
    },
  });

  return result.docs[0] ?? null;
}

export default async function SubmitAbstractPage({
  searchParams,
}: SubmitAbstractPageProps) {
  const resolvedSearchParams = await searchParams;
  const eventId = resolvedSearchParams.event?.trim();

  if (!eventId) {
    redirect("/events");
  }

  const requestHeaders = await headers();
  const [publicUser, event] = await Promise.all([
    getPublicUserFromHeaders(requestHeaders),
    getEvent(eventId),
  ]);

  console.log("pub user", publicUser, event);

  if (!event) {
    redirect("/events");
  }

  if (!publicUser) {
    redirect(
      `/login?redirect=${encodeURIComponent(`/submit-abstract?event=${eventId}`)}`,
    );
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="flex flex-col">
        <section className="mt-[98px] flex justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-[120px]">
          <div className="flex w-full max-w-[1280px] flex-col items-center gap-[72px]">
            <div className="flex max-w-[800px] flex-col items-center gap-6 text-center">
              <h1 className="font-sans text-[40px] leading-none font-semibold text-text-black">
                Abstract Submission
              </h1>
              <p className="font-['inter'] text-base leading-normal text-text-black sm:text-xl">
                Complete the form below. Your submission will be reviewed
                internally by the organising committee. Accepted authors will be
                invited to register by email.
              </p>
              <p className="font-['inter'] text-sm leading-5 text-text-grey-mid">
                Submitting as {publicUser.email}
              </p>
              {"title" in event && typeof event.title === "string" ? (
                <p className="font-['inter'] text-sm leading-5 text-text-grey-mid">
                  For event: {event.title}
                </p>
              ) : null}
            </div>

            <AbstractSubmissionForm eventId={eventId} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
