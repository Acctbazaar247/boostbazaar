"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";

const PrivateLayout = ({
  children,
  roles,
}: Readonly<{
  children: React.ReactNode;
  roles?: string[];
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const accessToken = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (user && roles && !roles.includes(user?.role)) {
      const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
      router.push(redirectTo);
    } else if (!accessToken) {
      const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
      router.push(redirectTo);
    }
  }, [user, roles, accessToken, pathname, router]);

  // If user doesn't have access or is being redirected, don't render children
  if ((user && roles && !roles.includes(user?.role)) || !accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateLayout;
