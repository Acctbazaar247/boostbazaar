import React from "react";
import { TiInfo } from "react-icons/ti";

type Props = {
  message?: string;
  children?: React.ReactNode;
};

const AppInfo = (props: Props) => {
  return (
    <div className="flex mt-10 border border-primary p-5 rounded  gap-4 ">
      <div className="size-">
        <TiInfo className="text-5xl text-primary"></TiInfo>
      </div>
      <div>{props.message}</div>
      <div>{props.children}</div>
    </div>
  );
};

export default AppInfo;
