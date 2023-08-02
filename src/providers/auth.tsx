"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: {
    name: string | null,
    links: JSON | null,
    email: string | null,
  };
};

export const NextAuthProvider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};
