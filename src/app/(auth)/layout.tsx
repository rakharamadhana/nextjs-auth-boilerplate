import { FC, ReactNode } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  // If the user is authenticated, redirect to /
  if (session) {
    redirect('/');
  }

  return <div className='bg-slate-200 p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;
