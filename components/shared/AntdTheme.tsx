"use client";

import * as React from "react";
import { ConfigProvider } from "antd";
import { useAppSelector } from "@/redux/hook";

type TAntdTheme = {
  children: React.ReactNode;
};

const AntdTheme = ({ children }: TAntdTheme) => {
  const theme = useAppSelector((state) => state.auth.theme);

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
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdTheme;
