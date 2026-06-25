import assert from "node:assert/strict";
import test from "node:test";

import { getVisibleKeyDates } from "./event-key-dates";

test("getVisibleKeyDates returns only visible key dates from the provided event", () => {
  const keyDates = getVisibleKeyDates({
    key_dates: [
      {
        date: "2026-11-10",
        label: "Visible date",
      },
      {
        date: "2026-11-11",
        label: "Hidden date",
        show: false,
      },
    ],
  });

  assert.deepEqual(keyDates, [
    {
      date: "2026-11-10",
      label: "Visible date",
    },
  ]);
});

test("getVisibleKeyDates returns an empty array when the upcoming event has no key dates", () => {
  assert.deepEqual(getVisibleKeyDates(null), []);
  assert.deepEqual(getVisibleKeyDates({}), []);
});
