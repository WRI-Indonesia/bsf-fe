import { cookies } from "next/headers";

import Footer from "../components/Footer";
import Header from "../components/Header";
import EventRegistrationForm from "./EventRegistrationForm";

export default async function EventRegistrationPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

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

            <EventRegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
