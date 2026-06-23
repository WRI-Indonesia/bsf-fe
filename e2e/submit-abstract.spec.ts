import { expect, test, type Page } from "@playwright/test";

import {
  AUTH_STATE_PATH,
  clearFixtureAbstracts,
  getFixtureAbstracts,
  readFixtureState,
} from "./support/test-data";

const getFixtureState = () => readFixtureState();

const validSubmission = {
  affiliation: "ASEAN Centre for Biodiversity",
  citation: "Public User et al., 2026.",
  keywords: "peatland, restoration, biodiversity",
  mainAuthor: "Playwright Public User",
  text: "Playwright abstract body.",
  title: "Playwright Submission Happy Path",
};

async function waitForClientFormReady(page: Page) {
  await expect(page.getByRole("button", { name: "Submit Abstract" })).toBeEnabled();
  await expect(page.getByText("300 characters left")).toBeVisible();
}

test.describe("submit abstract redirects", () => {
  test("redirects to /events when the event query is missing", async ({ page }) => {
    await page.goto("/submit-abstract");

    await expect(page).toHaveURL(/\/events$/);
  });

  test("redirects unauthenticated users to login with the original destination", async ({
    page,
  }) => {
    const fixtureState = getFixtureState();

    await page.goto(`/submit-abstract?event=${fixtureState.eventId}`);

    await expect(page).toHaveURL(/\/login\?redirect=/);
    await expect(page).toHaveURL(
      new RegExp(
        encodeURIComponent(`/submit-abstract?event=${fixtureState.eventId}`),
      ),
    );
    await expect(
      page.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();
  });
});

test.describe("authenticated abstract submission", () => {
  test.use({ storageState: AUTH_STATE_PATH });

  test.beforeEach(async () => {
    await clearFixtureAbstracts();
  });

  test("submits a valid abstract successfully", async ({ page }) => {
    const fixtureState = getFixtureState();

    await page.goto(`/submit-abstract?event=${fixtureState.eventId}`);
    await waitForClientFormReady(page);

    await page.getByLabel("Main Author").fill(validSubmission.mainAuthor);
    await page.getByLabel("Affiliation").fill(validSubmission.affiliation);
    await page.getByLabel("Abstract Title").fill(validSubmission.title);
    await page.getByLabel("Abstract Text").fill(validSubmission.text);
    await expect(page.getByText("275 characters left")).toBeVisible();
    await page.getByLabel("Keywords").fill(validSubmission.keywords);
    await page.getByLabel("Suggested citation").fill(validSubmission.citation);
    await page.getByRole("button", { name: "Submit Abstract" }).click();

    await expect(
      page.getByText(
        "Abstract submitted successfully. The organising committee will review it internally.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to Events" }),
    ).toBeVisible();

    const abstracts = await getFixtureAbstracts();
    expect(abstracts).toHaveLength(1);
    expect(abstracts[0]?.title).toBe(validSubmission.title);
  });

  test("shows validation errors for whitespace-only values", async ({ page }) => {
    const fixtureState = getFixtureState();

    await page.goto(`/submit-abstract?event=${fixtureState.eventId}`);
    await waitForClientFormReady(page);

    await page.getByLabel("Main Author").fill("   ");
    await page.getByLabel("Affiliation").fill("   ");
    await page.getByLabel("Abstract Title").fill("   ");
    await page.getByLabel("Abstract Text").fill("   ");
    await expect(page.getByText("297 characters left")).toBeVisible();
    await page.getByLabel("Keywords").fill("   ");
    await page.getByLabel("Suggested citation").fill("   ");
    await page.getByRole("button", { name: "Submit Abstract" }).click();

    await expect(
      page.getByText("Please correct the highlighted fields."),
    ).toBeVisible();
    await expect(page.getByText("Main author is required.")).toBeVisible();
    await expect(page.getByText("Affiliation is required.")).toBeVisible();
    await expect(page.getByText("Abstract title is required.")).toBeVisible();
    await expect(page.getByText("Abstract text is required.")).toBeVisible();
    await expect(
      page.getByText("At least one keyword is required."),
    ).toBeVisible();
    await expect(
      page.getByText("Suggested citation is required."),
    ).toBeVisible();
  });

  test("shows the duplicate submission error on a second submission", async ({
    page,
  }) => {
    const fixtureState = getFixtureState();

    await page.goto(`/submit-abstract?event=${fixtureState.eventId}`);
    await waitForClientFormReady(page);

    await page.getByLabel("Main Author").fill(validSubmission.mainAuthor);
    await page.getByLabel("Affiliation").fill(validSubmission.affiliation);
    await page.getByLabel("Abstract Title").fill(validSubmission.title);
    await page.getByLabel("Abstract Text").fill(validSubmission.text);
    await expect(page.getByText("275 characters left")).toBeVisible();
    await page.getByLabel("Keywords").fill(validSubmission.keywords);
    await page.getByLabel("Suggested citation").fill(validSubmission.citation);
    await page.getByRole("button", { name: "Submit Abstract" }).click();

    await expect(
      page.getByText(
        "Abstract submitted successfully. The organising committee will review it internally.",
      ),
    ).toBeVisible();

    await page.goto(`/submit-abstract?event=${fixtureState.eventId}`);
    await waitForClientFormReady(page);

    await page.getByLabel("Main Author").fill(validSubmission.mainAuthor);
    await page.getByLabel("Affiliation").fill(validSubmission.affiliation);
    await page
      .getByLabel("Abstract Title")
      .fill("Playwright Duplicate Submission");
    await page.getByLabel("Abstract Text").fill(validSubmission.text);
    await expect(page.getByText("275 characters left")).toBeVisible();
    await page.getByLabel("Keywords").fill(validSubmission.keywords);
    await page.getByLabel("Suggested citation").fill(validSubmission.citation);
    await page.getByRole("button", { name: "Submit Abstract" }).click();

    await expect(
      page.getByText("You have already submitted an abstract for this event."),
    ).toBeVisible();
  });
});
