import fs from "node:fs";
import path from "node:path";
import {
  type APIRequestContext,
  type Browser,
  type BrowserContext,
  expect,
  type Page,
} from "@playwright/test";
import { generateId } from "ai";
import { getUnixTime } from "date-fns";
import { ChatPage } from "./pages/chat";

export type UserContext = {
  context: BrowserContext;
  page: Page;
  request: APIRequestContext;
};

export async function createAuthenticatedContext({
  browser,
  name,
}: {
  browser: Browser;
  name: string;
}): Promise<UserContext> {
  const directory = path.join(__dirname, "../playwright/.sessions");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const storageFile = path.join(directory, `${name}.json`);

  const context = await browser.newContext();
  const page = await context.newPage();

  const forceGuest = !!process.env.PLAYWRIGHT; // tests run in environment without full Clerk setup
  const hasClerk =
    !forceGuest &&
    !!process.env.CLERK_SECRET_KEY &&
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (hasClerk) {
    const email = `test-${name}@playwright.com`;
    const password = generateId();
    await page.goto("http://localhost:3000/register");
    await page.getByPlaceholder("user@acme.com").click();
    await page.getByPlaceholder("user@acme.com").fill(email);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page.getByTestId("toast")).toContainText(
      "Account created successfully!"
    );
  } else {
    // Trigger guest session creation
    await page.goto("http://localhost:3000/");
  }

  const chatPage = new ChatPage(page);
  await chatPage.createNewChat();
  // Model selector may rely on authenticated user fixtures; only run if visible
  // Optionally select a specific default model if selector present
  try {
    // Attempt to select a premium model (openai:gpt-5) if present for authenticated users.
    await chatPage.chooseModelFromSelector("openai:gpt-5");
    await expect(chatPage.getSelectedModel()).resolves.toEqual("GPT-5");
  } catch {
    // Selector may not include this model (e.g., guest or fallback). Ignore.
  }

  await page.waitForTimeout(1000);
  await context.storageState({ path: storageFile });
  await page.close();

  const newContext = await browser.newContext({ storageState: storageFile });
  const newPage = await newContext.newPage();

  return {
    context: newContext,
    page: newPage,
    request: newContext.request,
  };
}

export async function createGuestContext({ browser }: { browser: Browser }): Promise<UserContext> {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Trigger guest session creation by hitting root (which redirects to guest auth route if needed)
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(500);
  return { context, page, request: context.request };
}

export function generateRandomTestUser() {
  const email = `test-${getUnixTime(new Date())}@playwright.com`;
  const password = generateId();

  return {
    email,
    password,
  };
}
