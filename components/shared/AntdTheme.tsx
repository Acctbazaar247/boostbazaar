"use client";

import * as React from "react";
import { ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetProfileQuery } from "@/redux/features/dashboard/dashboardApi";
import { logOut, setUser } from "@/redux/features/auth/authSlice";

type TAntdTheme = {
  children: React.ReactNode;
};

const AntdTheme = ({ children }: TAntdTheme) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.auth.theme);
  const { data, isSuccess } = useGetProfileQuery("");

  React.useEffect(() => {
    if (data) {
      if (isSuccess) {
        dispatch(setUser({ user: data?.user, accessToken: data.accessToken }));
      } else {
        dispatch(logOut());
      }
    }
  }, []);

  const lightTheme = {
    colorBgBase: "#fff",
  };

  const darkTheme = {
    colorBgBase: "#000",
    colorText: "#fff",
    // controlItemBgHover: "#fff",
  };

  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
        components: {
          Table: {
            headerBg: theme === "light" ? "#fff" : "#000",
          },
          Select: {
            optionSelectedColor: theme === "light" ? "#fff" : "#000",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdTheme;
