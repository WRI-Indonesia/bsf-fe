import { cookies } from "next/headers";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginPageClient from "./LoginPageClient";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  return (
    <div className="min-h-screen bg-background-base-lime-light">
      <Header locale={locale} />
      <main className="flex flex-col">
        <LoginPageClient />
      </main>
      <Footer />
    </div>
  );
}
