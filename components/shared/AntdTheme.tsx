"use client";

import * as React from "react";
import { ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetProfileQuery } from "@/redux/features/dashboard/dashboardApi";
import { logOut, setLoading, setUser } from "@/redux/features/auth/authSlice";
import Loading from "../ui/Loading";
import { ToastContainer } from "react-toastify";

type TAntdTheme = {
  children: React.ReactNode;
};

const AntdTheme = ({ children }: TAntdTheme) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.auth.theme);
  const user = useAppSelector((state) => state.auth.user);
  const [shouldRender, setShouldRender] = React.useState<Boolean>(false);
  const { data, isSuccess, isError, isLoading, error } = useGetProfileQuery(
    "",
    { skip: Boolean(user?.email) }
  );

  React.useEffect(() => {
    if (!isLoading) {
      if (data) {
        if (isSuccess) {
          dispatch(
            setUser({
              user: data?.data?.user,
              accessToken: data?.data?.accessToken
            })
          );
          setShouldRender(true);
        }
      }
      if (isError) {
        dispatch(logOut());
        setShouldRender(true);
      }
      dispatch(setLoading(false));
    }
  }, [data, isError, isLoading, error]);

  const lightTheme = {
    colorBgBase: "#fff"
  };

  const darkTheme = {
    colorBgBase: "#000",
    colorText: "#fff"
    // controlItemBgHover: "#fff",
  };

  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
        components: {
          Table: {
            headerBg: theme === "light" ? "#fff" : "#000"
          },
          Select: {
            optionSelectedColor: theme === "light" ? "#fff" : "#000"
          }
        }
      }}
    >
      {isLoading ? (
        <div>
          <Loading></Loading>
        </div>
      ) : (
        children
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        stacked
        // transition:Bounce
      />
    </ConfigProvider>
  );
};

export default AntdTheme;
