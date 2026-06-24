'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type PublicUserSession = {
  email?: string;
  isLoggedIn: boolean;
  name?: string | null;
};

const defaultSession: PublicUserSession = {
  isLoggedIn: false,
};

const PublicUserContext = createContext<PublicUserSession>(defaultSession);

export function PublicUserProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: PublicUserSession;
}) {
  return (
    <PublicUserContext.Provider value={session}>
      {children}
    </PublicUserContext.Provider>
  );
}

export function usePublicUser(): PublicUserSession {
  return useContext(PublicUserContext);
}
