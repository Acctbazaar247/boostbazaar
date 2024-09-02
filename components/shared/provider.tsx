"use client";

import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/app/store";
import AntdTheme from "./AntdTheme";
import { useAppSelector } from "@/redux/hook";

type TProviders = {
  children: React.ReactNode;
};

const Providers = ({ children }: TProviders) => {
  return (
    <Provider store={store}>
      <AntdTheme>{children}</AntdTheme>
    </Provider>
  );
};

export default Providers;
