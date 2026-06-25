type KeyDate = {
  date: string;
  label: string;
  show?: boolean;
};

type EventWithKeyDates = {
  key_dates?: KeyDate[] | null;
};

export function getVisibleKeyDates(
  event: EventWithKeyDates | null | undefined,
): KeyDate[] {
  return (event?.key_dates ?? []).filter((keyDate) => keyDate.show !== false);
}
