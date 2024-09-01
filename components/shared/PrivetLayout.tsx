"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  logOut,
  selectCurrentUser,
  setUser,
  useCurrentToken
} from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "../ui/Loading";

const PrivateLayout = ({
  children,
  roles
}: Readonly<{
  children: React.ReactNode;
  roles?: string[];
}>) => {
  const { data } = useGetProfileQuery("");

  // useEffect(() => {
  //   if (data?.profile) {
  //     dispatch(setUser({ user: data?.user, accessToken: data.accessToken }));
  //   }
  // }, []);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const accessToken = useAppSelector(useCurrentToken);
  const theme = useAppSelector((state) => state.auth.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isLoading) {
    } else if (user?.isBlocked) {
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
    } else if (!accessToken) {
      const redirectTo = `/auth/sign-in?from=${encodeURIComponent(pathname)}`;
      router.push(redirectTo);
    }
  }, [user, roles, accessToken, pathname, router, dispatch]);
  if (isLoading) {
    return <Loading></Loading>;
  }
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
