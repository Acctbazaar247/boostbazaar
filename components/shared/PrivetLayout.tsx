"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  logOut,
  selectCurrentUser,
  useCurrentToken
} from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

const PrivateLayout = ({
  children,
  roles
}: Readonly<{
  children: React.ReactNode;
  roles?: string[];
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const accessToken = useAppSelector(useCurrentToken);
  const { theme } = useAppSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user?.isBlocked) {
      toast.error("Your are blocked", { toastId: 1 });
      router.push("/auth/sign-up");
      dispatch(logOut());
    } else if (user && user.id && user?.isVerified === false) {
      toast.error("You are not verified", { toastId: 1 });
      const redirectTo = `/auth/verify-user?from=${encodeURIComponent(
        pathname
      )}`;
      router.push(redirectTo);
    } else if (user && roles && !roles.includes(user?.role)) {
      const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
      router.push(redirectTo);
      dispatch(logOut());
    } else if (!accessToken) {
      const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
      router.push(redirectTo);
    }
  }, [user, roles, accessToken, pathname, router, dispatch]);
  if (user && !user.isVerified) {
    return null;
  }
  if (user && user.isBlocked) {
    return null;
  }
  // If user doesn't have access or is being redirected, don't render children
  if ((user && roles && !roles.includes(user?.role)) || !accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateLayout;
