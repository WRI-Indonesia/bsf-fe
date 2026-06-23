import type { FullConfig } from "@playwright/test";
import { chromium } from "@playwright/test";

import {
  AUTH_STATE_PATH,
  ensureAuthStateDir,
  ensureFixtureState,
} from "./test-data";

export default async function globalSetup(config: FullConfig) {
  const state = await ensureFixtureState();
  const baseURL =
    config.projects[0]?.use?.baseURL?.toString() || "http://127.0.0.1:3000";

  ensureAuthStateDir();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL,
  });
  const page = await context.newPage();
  await page.goto(baseURL);

  const response = await page.evaluate(
    async (loginPayload) => {
      const result = await fetch("/api/auth/public/login", {
        body: JSON.stringify(loginPayload),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      return {
        body: await result.text(),
        ok: result.ok,
        status: result.status,
      };
    },
    {
      email: state.userEmail,
      password: state.userPassword,
      redirect: `/submit-abstract?event=${state.eventId}`,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Global e2e login failed with status ${response.status}: ${response.body}`,
    );
  }

  await context.storageState({ path: AUTH_STATE_PATH });
  await browser.close();
}
