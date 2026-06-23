import { loadEnvConfig } from "@next/env";
import { getPayload } from "payload";

const FIXTURE_USER = {
  email: "playwright.public-user@bsf.local",
  name: "Playwright Public User",
  password: "PlaywrightPassword123!",
};

const FIXTURE_EVENT = {
  description: "Fixture event used by the Playwright e2e suite.",
  endDate: "2026-10-16T17:00:00.000Z",
  location: "Jakarta",
  participants: "__playwright_e2e_fixture__",
  startDate: "2026-10-15T09:00:00.000Z",
  title: "Playwright E2E Event",
};

type PayloadDocument = {
  id: number | string;
};

type AbstractDoc = PayloadDocument & {
  title?: string;
};

type EventDoc = PayloadDocument;

type PublicUserDoc = PayloadDocument;

type E2EFixtureState = {
  eventId: string;
  userEmail: string;
  userPassword: string;
};

async function getPayloadClient() {
  loadEnvConfig(process.cwd());
  const { default: config } = await import("../../payload.config");
  return getPayload({ config });
}

async function ensureVerifiedPublicUser() {
  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection: "public-users",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: FIXTURE_USER.email,
      },
    },
  });

  const user = existing.docs[0] as PublicUserDoc | undefined;

  if (user) {
    await payload.update({
      collection: "public-users",
      data: {
        _verified: true,
        email: FIXTURE_USER.email,
        name: FIXTURE_USER.name,
        password: FIXTURE_USER.password,
        verified: true,
      },
      id: user.id,
    });

    return;
  }

  await payload.create({
    collection: "public-users",
    data: {
      _verified: true,
      email: FIXTURE_USER.email,
      name: FIXTURE_USER.name,
      password: FIXTURE_USER.password,
      verified: true,
    },
  });
}

async function ensureFixtureEvent(): Promise<EventDoc> {
  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection: "events",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      participants: {
        equals: FIXTURE_EVENT.participants,
      },
    },
  });

  const event = existing.docs[0] as EventDoc | undefined;

  if (event) {
    const updated = await payload.update({
      collection: "events",
      data: {
        description: FIXTURE_EVENT.description,
        end_date: FIXTURE_EVENT.endDate,
        location: FIXTURE_EVENT.location,
        participants: FIXTURE_EVENT.participants,
        start_date: FIXTURE_EVENT.startDate,
        title: FIXTURE_EVENT.title,
      },
      id: event.id,
    });

    return updated as EventDoc;
  }

  const created = await payload.create({
    collection: "events",
    data: {
      description: FIXTURE_EVENT.description,
      end_date: FIXTURE_EVENT.endDate,
      location: FIXTURE_EVENT.location,
      participants: FIXTURE_EVENT.participants,
      start_date: FIXTURE_EVENT.startDate,
      title: FIXTURE_EVENT.title,
    },
  });

  return created as EventDoc;
}

async function getFixtureUserId() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "public-users",
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: FIXTURE_USER.email,
      },
    },
  });

  const user = result.docs[0] as PublicUserDoc | undefined;

  if (!user) {
    throw new Error("Playwright fixture user was not found.");
  }

  return user.id;
}

async function clearFixtureAbstracts() {
  const payload = await getPayloadClient();
  const userId = await getFixtureUserId();
  const event = await ensureFixtureEvent();
  const result = await payload.find({
    collection: "abstracts",
    depth: 0,
    limit: 100,
    pagination: false,
    where: {
      and: [
        {
          event: {
            equals: event.id,
          },
        },
        {
          user: {
            equals: userId,
          },
        },
      ],
    },
  });

  for (const doc of result.docs as AbstractDoc[]) {
    await payload.delete({
      collection: "abstracts",
      id: doc.id,
    });
  }

  return {
    deleted: result.docs.length,
  };
}

async function getFixtureAbstracts() {
  const payload = await getPayloadClient();
  const userId = await getFixtureUserId();
  const event = await ensureFixtureEvent();
  const result = await payload.find({
    collection: "abstracts",
    depth: 0,
    limit: 100,
    pagination: false,
    where: {
      and: [
        {
          event: {
            equals: event.id,
          },
        },
        {
          user: {
            equals: userId,
          },
        },
      ],
    },
  });

  return result.docs as AbstractDoc[];
}

async function ensureFixtureState(): Promise<E2EFixtureState> {
  await ensureVerifiedPublicUser();
  const event = await ensureFixtureEvent();

  return {
    eventId: String(event.id),
    userEmail: FIXTURE_USER.email,
    userPassword: FIXTURE_USER.password,
  };
}

async function main() {
  const command = process.argv[2];

  if (!command) {
    throw new Error("A fixture command is required.");
  }

  switch (command) {
    case "ensure-state":
      process.stdout.write(JSON.stringify(await ensureFixtureState()));
      return;
    case "clear-abstracts":
      process.stdout.write(JSON.stringify(await clearFixtureAbstracts()));
      return;
    case "get-abstracts":
      process.stdout.write(JSON.stringify(await getFixtureAbstracts()));
      return;
    default:
      throw new Error(`Unknown fixture command: ${command}`);
  }
}

void main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
