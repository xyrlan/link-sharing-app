"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: any;
};

export const NextAuthProvider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};
