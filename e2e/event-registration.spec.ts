import { expect, test } from "@playwright/test";

test.describe("event registration page", () => {
  test("renders the figma-based first step and advances through professional information", async ({
    page,
  }) => {
    await page.goto("/event-registration");

    await expect(
      page.getByRole("heading", { name: "Forum registration" }),
    ).toBeVisible();
    await expect(page.getByText("Invitation Only")).toBeVisible();
    await expect(
      page.getByText(
        "Welcome! your abstract has been accepted. Please complete the steps below to finalize your participation.",
      ),
    ).toBeVisible();

    await expect(page.getByText("Personal")).toBeVisible();
    await expect(page.getByText("Professional")).toBeVisible();
    await expect(page.getByText("Additional")).toBeVisible();
    await expect(page.getByText("Travel")).toBeVisible();
    await expect(page.getByText("Declaration")).toBeVisible();
    await expect(page.getByText("Conforme")).toBeVisible();

    await expect(page.getByLabel("Prefix")).toBeVisible();
    await expect(page.getByLabel("First name")).toBeVisible();
    await expect(page.getByLabel("Middle name")).toBeVisible();
    await expect(page.getByLabel("Last name")).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Organization")).toBeVisible();
    await expect(page.getByLabel("Department / unit")).toBeVisible();
    await expect(page.getByLabel("Postal code")).toBeVisible();
    await expect(page.getByLabel("Full address")).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("heading", { name: "Professional information" }),
    ).toBeVisible();
    await expect(page.getByLabel("Position title")).toBeVisible();
    await expect(page.getByLabel("Field of expertise")).toBeVisible();
    await expect(page.getByLabel("CV upload")).toBeVisible();
    await expect(page.getByLabel("Profile photo")).toBeVisible();
    await expect(page.getByText("Bio sketch")).toBeVisible();

    await page.locator('input[type="file"]').nth(0).setInputFiles({
      buffer: Buffer.from("cv file"),
      mimeType: "application/pdf",
      name: "speaker-cv.pdf",
    });
    await page.locator('input[type="file"]').nth(1).setInputFiles({
      buffer: Buffer.from("profile image"),
      mimeType: "image/png",
      name: "profile-photo.png",
    });

    await expect(page.getByText("speaker-cv.pdf")).toBeVisible();
    await expect(page.getByText("profile-photo.png")).toBeVisible();

    await page.getByRole("button", { name: "Back to personal details" }).click();
    await expect(
      page.getByRole("heading", { name: "Personal details" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByRole("heading", { name: "Additional" })).toBeVisible();
    await expect(
      page.getByText("Additional registration details are coming next."),
    ).toBeVisible();
  });
});
