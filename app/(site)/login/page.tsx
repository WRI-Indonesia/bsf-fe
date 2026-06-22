"use client";

import Link from "next/link";
import { useState } from "react";

type AuthTab = "login" | "signup";

const tabContent: Record<
  AuthTab,
  {
    title: string;
    cta: string;
    fields: Array<{
      id: string;
      label: string;
      type: "email" | "password" | "text";
      placeholder: string;
      autoComplete: string;
    }>;
  }
> = {
  login: {
    title: "Sign in",
    cta: "Login & Continue",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "m@example",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "**********",
        autoComplete: "current-password",
      },
    ],
  },
  signup: {
    title: "Create your Account",
    cta: "Create account & continue",
    fields: [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Name",
        autoComplete: "name",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "m@example",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "**********",
        autoComplete: "new-password",
      },
    ],
  },
};

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const currentTab = tabContent[activeTab];

  return (
    <main className="flex min-h-screen items-center justify-center bg-background-base-lime-light px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-[120px]">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 lg:gap-20">
        <div className="flex w-full max-w-[500px] flex-col items-center gap-6 text-center">
          <h1 className="font-sans text-[40px] leading-none font-semibold text-text-black">
            {currentTab.title}
          </h1>
          <p className="font-['inter'] text-base leading-normal text-text-black sm:text-xl">
            You&apos;ll use this account to submit your abstract and if accepted,
            to complete registration later.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-6">
            <div className="rounded-xl border border-[#D9DCE0] bg-[#C8D2C3] p-1">
              <div className="grid grid-cols-2 gap-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  aria-pressed={activeTab === "login"}
                  className={`rounded-lg px-3 py-2 text-base transition-colors ${
                    activeTab === "login"
                      ? "bg-text-green font-['inter'] font-semibold text-[#F8FBFC] shadow-[0px_2px_12px_0px_rgba(87,86,86,0.12)]"
                      : "font-['inter'] font-normal text-[#5D7087]"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  aria-pressed={activeTab === "signup"}
                  className={`rounded-lg px-3 py-2 text-base transition-colors ${
                    activeTab === "signup"
                      ? "bg-text-green font-['inter'] font-semibold text-[#F8FBFC] shadow-[0px_2px_12px_0px_rgba(87,86,86,0.12)]"
                      : "font-['inter'] font-normal text-[#5D7087]"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <form
              className="mt-6 flex flex-col gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex flex-col gap-6 pb-6">
                {currentTab.fields.map((field) => (
                  <div key={`${activeTab}-${field.id}`} className="flex flex-col gap-2">
                    <label
                      htmlFor={`${activeTab}-${field.id}`}
                      className="font-['inter'] text-base leading-none text-[#020617]"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`${activeTab}-${field.id}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className="h-10 w-full rounded-md border border-outline-grey-light px-3 font-['inter'] text-sm leading-5 text-text-black placeholder:text-slate-500 focus:border-text-green focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center rounded-xl bg-text-green px-3 py-2 font-['inter'] text-sm leading-6 font-medium text-slate-50 transition-opacity hover:opacity-95"
              >
                {currentTab.cta}
              </button>

              <p className="px-6 text-center font-['inter'] text-sm leading-5 text-[#020617]">
                By continuing you agree to the Forum&apos;s submission
                guidelines.
              </p>
            </form>
          </div>

          <Link
            href="/events"
            className="font-['inter'] text-xl leading-normal text-text-grey-mid transition-colors hover:text-text-green"
          >
            <span aria-hidden="true">← </span>
            Back to Events
          </Link>
        </div>
      </div>
    </main>
  );
}
