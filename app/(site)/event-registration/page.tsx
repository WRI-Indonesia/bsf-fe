import { cookies } from "next/headers";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

import Footer from "../components/Footer";
import Header from "../components/Header";
import EventRegistrationForm from "./EventRegistrationForm";

type EventRegistrationPageProps = {
  searchParams: Promise<{
    registration?: string;
  }>;
};

function RegistrationStateCard({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  return (
    <div className="w-full max-w-[724px] rounded-2xl border border-outline-grey-light bg-white p-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-[#CFE8D9] bg-[#E9F8F1] px-5 py-8 text-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-[32px] leading-none font-semibold text-text-black">
            {title}
          </h2>
          <p className="font-['inter'] text-base leading-6 text-text-black">
            {message}
          </p>
        </div>
        <Link
          className="font-['inter'] text-base font-semibold text-text-green transition-colors hover:text-text-lime"
          href="/events"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}

async function getRegistration(registrationKey: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "event-registrations",
    depth: 1,
    limit: 1,
    pagination: false,
    where: {
      registrationKey: {
        equals: registrationKey,
      },
    },
  });

  return result.docs[0] ?? null;
}

export default async function EventRegistrationPage({
  searchParams,
}: EventRegistrationPageProps) {
  const resolvedSearchParams = await searchParams;
  const registrationKey = resolvedSearchParams.registration?.trim();
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const registration = registrationKey
    ? await getRegistration(registrationKey)
    : null;

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="flex flex-col">
        <section className="mt-[98px] px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-[120px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[72px]">
            <div className="flex max-w-[800px] flex-col items-center gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-[40px] leading-none font-semibold text-text-black">
                  Forum registration
                </h1>
                <p className="font-['inter'] text-xl leading-none font-semibold text-text-lime">
                  Invitation Only
                </p>
              </div>
              <p className="max-w-[800px] font-['inter'] text-base leading-normal text-text-black sm:text-xl">
                Welcome! your abstract has been accepted. Please complete the
                steps below to finalize your participation.
              </p>
            </div>

            {!registrationKey ? (
              <RegistrationStateCard
                message="This registration link is missing its invitation key. Please use the full link from your invitation email."
                title="Registration link required"
              />
            ) : !registration ? (
              <RegistrationStateCard
                message="We couldn't find that registration. Please check the link or contact the organising committee for a fresh invitation."
                title="Registration not found"
              />
            ) : (
              <EventRegistrationForm
                initialRegistration={registration}
                registrationKey={registrationKey}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
