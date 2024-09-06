import Image from "next/image";
import React from "react";

type Props = {};

const OnDevelopment = (props: Props) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Image
        width={1000}
        height={1000}
        alt=""
        className="max-w-[600px] w-full"
        src="https://media.istockphoto.com/id/1348157796/vector/website-under-construction-page-web-page-under-construction-website-under-maintenance-page.jpg?s=612x612&w=0&k=20&c=vJCWlc0t7pZY3b41LciyKsXQAtcDlMqzq2M7zOsl5rI="
      ></Image>
    </div>
  );
};

export default OnDevelopment;
