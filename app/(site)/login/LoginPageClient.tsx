"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  getSafeRedirect,
  PUBLIC_AUTH_ERROR_CODES,
  PUBLIC_AUTH_FALLBACK_REDIRECT,
  type PublicAuthResponse,
} from "@/lib/public-auth";

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

export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [formValues, setFormValues] = useState({
    login: {
      email: "",
      password: "",
    },
    signup: {
      email: "",
      name: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);

  const currentTab = tabContent[activeTab];
  const redirectTarget = getSafeRedirect(
    searchParams.get("redirect"),
    PUBLIC_AUTH_FALLBACK_REDIRECT,
  );
  const verified = searchParams.get("verified") === "1";
  const verifyError = searchParams.get("verifyError") === "1";
  const visibleSuccessMessage =
    verified && activeTab === "login"
      ? "Your email has been verified. You can log in now."
      : successMessage;
  const visibleErrorMessage =
    verifyError && activeTab === "login"
      ? "That verification link is invalid or has expired."
      : errorMessage;
  const currentValues = formValues[activeTab];

  const handleInputChange =
    (tab: AuthTab, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setFormValues((current) => ({
        ...current,
        [tab]: {
          ...current[tab],
          [field]: value,
        },
      }));
    };

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (tab === "signup") {
      setIsAwaitingVerification(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload =
        activeTab === "login"
          ? {
              ...formValues.login,
              redirect: redirectTarget,
            }
          : formValues.signup;

      const response = await fetch(`/api/auth/public/${activeTab}`, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response.json()) as PublicAuthResponse;

      if (!result.ok) {
        if (result.code === PUBLIC_AUTH_ERROR_CODES.unverifiedEmail) {
          setIsAwaitingVerification(true);
        }

        setErrorMessage(result.message);
        return;
      }

      if (activeTab === "signup") {
        setIsAwaitingVerification(true);
        setSuccessMessage(result.message);
        setFormValues((current) => ({
          ...current,
          signup: {
            email: "",
            name: "",
            password: "",
          },
        }));
        return;
      }

      router.push(result.redirect || redirectTarget);
      router.refresh();
    } catch (error) {
      console.error("Public auth request failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-[98px] flex justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-[120px]">
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
                  onClick={() => handleTabChange("login")}
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
                  onClick={() => handleTabChange("signup")}
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
              onSubmit={handleSubmit}
            >
              {visibleSuccessMessage ? (
                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-['inter'] text-sm leading-5 text-green-900">
                  {visibleSuccessMessage}
                </p>
              ) : null}

              {visibleErrorMessage ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-['inter'] text-sm leading-5 text-red-900">
                  {visibleErrorMessage}
                </p>
              ) : null}

              {activeTab === "signup" && isAwaitingVerification ? (
                <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-['inter'] text-sm leading-5 text-slate-700">
                  Check your inbox for a verification email before logging in.
                </p>
              ) : null}

              <div className="flex flex-col gap-6 pb-6">
                {currentTab.fields.map((field) => (
                  <div
                    key={`${activeTab}-${field.id}`}
                    className="flex flex-col gap-2"
                  >
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
                      value={String(
                        currentValues[field.id as keyof typeof currentValues] ??
                          "",
                      )}
                      onChange={handleInputChange(activeTab, field.id)}
                      minLength={field.id === "password" ? 8 : undefined}
                      required
                      disabled={isSubmitting}
                      className="h-10 w-full rounded-md border border-outline-grey-light px-3 font-['inter'] text-sm leading-5 text-text-black placeholder:text-slate-500 focus:border-text-green focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center rounded-xl bg-text-green px-3 py-2 font-['inter'] text-sm leading-6 font-medium text-slate-50 transition-opacity hover:opacity-95"
              >
                {isSubmitting ? "Please wait..." : currentTab.cta}
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
    </section>
  );
}
