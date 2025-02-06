'use client';

import * as React from 'react';
import { ConfigProvider, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetProfileQuery } from '@/redux/features/dashboard/dashboardApi';
import { logOut, setLoading, setUser } from '@/redux/features/auth/authSlice';
import Loading from '../ui/Loading';
import { ToastContainer } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

type TAntdTheme = {
  children: React.ReactNode;
};

const AntdTheme = ({ children }: TAntdTheme) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.auth.theme);
  const user = useAppSelector(state => state.auth.user);
  const [shouldRender, setShouldRender] = React.useState<Boolean>(false);
  const { data, isSuccess, isError, isLoading, error } = useGetProfileQuery(
    '',
    // { skip: Boolean(user?.email) }
  );

  React.useEffect(() => {
    if (!isLoading) {
      if (data) {
        if (isSuccess) {
          dispatch(
            setUser({
              user: data?.data?.user,
              accessToken: data?.data?.accessToken,
            }),
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
  }, [data, isError, isLoading, error, isSuccess, dispatch]);

  const lightTheme = {
    colorBgBase: '#fff',
  };

  const darkTheme = {
    colorBgBase: '#000',
    colorText: '#fff',
    // controlItemBgHover: "#fff",
  };

  return (
    <ConfigProvider
      theme={{
        token: theme === 'light' ? lightTheme : darkTheme,
        components: {
          Table: {
            headerBg: theme === 'light' ? '#fff' : '#4E4E4EFF',

            rowHoverBg: theme === 'light' ? '#F4F4F4FF' : '#2D2D2DFF',
            colorBgContainer: theme === 'light' ? '#fff' : '#434242FF',
          },
          Select: {
            optionSelectedColor: theme === 'light' ? '#000' : '#000',
            colorTextPlaceholder: '#999',
            fontSize: 16,
          },
          Checkbox: {
            colorBgContainer: theme === 'light' ? '#fff' : '#fff', // Background color
            // colorPrimary: theme === "light" ? "#fff" : "#fff", // Checkmark color
            colorBorder: '#878787', // Border color
            // colorPrimaryHover: "#878787"
            colorInfoBorderHover: 'red',
          },
          Empty: {
            colorTextDescription: theme === 'light' ? '#000' : '#fff',
          },
          Modal: {
            contentBg: theme === 'light' ? '#fff' : '#2D2D2DFF',
            headerBg: theme === 'light' ? '#fff' : '#2D2D2DFF',
            colorBgMask: theme === 'light' ? 'rgba(0,0,0,0.88)' : '#0000009E',
          },
        },
      }}
    >
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          {/* <Loading></Loading> */}
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: '#5D5FDF', fontSize: 48 }}
                spin
              />
            }
            size="large"
          />
        </div>
      ) : (
        children
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
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
