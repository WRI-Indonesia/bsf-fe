import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export const AUTH_STATE_PATH = path.join(
  process.cwd(),
  "playwright",
  ".auth",
  "public-user.json",
);

const FIXTURE_STATE_PATH = path.join(
  process.cwd(),
  "playwright",
  ".cache",
  "fixtures.json",
);

const FIXTURE_SCRIPT_PATH = path.join(
  process.cwd(),
  "e2e",
  "support",
  "payload-fixtures.ts",
);

export type E2EFixtureState = {
  eventId: string;
  userEmail: string;
  userPassword: string;
};

type AbstractDoc = {
  id: number | string;
  title?: string;
};

const ensureParentDir = (filePath: string) => {
  mkdirSync(path.dirname(filePath), { recursive: true });
};

const runFixtureCommand = <T>(command: string) => {
  const output = execFileSync(
    process.execPath,
    ["--import", "tsx", FIXTURE_SCRIPT_PATH, command],
    {
      cwd: process.cwd(),
      encoding: "utf8",
    },
  );

  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const jsonLine = [...lines].reverse().find((line) => line.startsWith("{") || line.startsWith("["));

  if (!jsonLine) {
    throw new Error(`Fixture command "${command}" did not return JSON output.`);
  }

  return JSON.parse(jsonLine) as T;
};

export async function ensureFixtureState(): Promise<E2EFixtureState> {
  const state = runFixtureCommand<E2EFixtureState>("ensure-state");

  ensureParentDir(FIXTURE_STATE_PATH);
  writeFileSync(FIXTURE_STATE_PATH, JSON.stringify(state, null, 2), "utf8");

  return state;
}

export function readFixtureState(): E2EFixtureState {
  return JSON.parse(readFileSync(FIXTURE_STATE_PATH, "utf8")) as E2EFixtureState;
}

export async function clearFixtureAbstracts() {
  runFixtureCommand<{ deleted: number }>("clear-abstracts");
}

export async function getFixtureAbstracts() {
  return runFixtureCommand<AbstractDoc[]>("get-abstracts");
}

export function ensureAuthStateDir() {
  ensureParentDir(AUTH_STATE_PATH);
}
