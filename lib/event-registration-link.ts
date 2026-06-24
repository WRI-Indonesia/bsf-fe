const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const getEventRegistrationURL = (registrationKey: string) =>
  `${serverURL}/event-registration?registration=${encodeURIComponent(registrationKey)}`;
