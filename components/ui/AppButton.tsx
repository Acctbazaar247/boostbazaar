"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

type TAppButton = {
  label: string;
  className?: string;
  children?: any;
  type?: "button" | "reset" | "submit";
  href?: string;
  variant?: "filled" | "outlined" | "noDesign";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
};

const AppButton = ({
  label,
  className,
  children,
  type = "button",
  href,
  variant = "filled",
  icon,
  iconPosition = "right",
  onClick,
}: TAppButton) => {
  return href ? (
    <Link key={label} href={href} className="block min-w-fit">
      <button
        className={cn(
          "text-sm md:text-base lg:text-lg xl:text-xl font-light min-w-fit",
          icon && "flex items-center gap-1 md:gap-2",
          variant === "filled"
            ? "btnFilled"
            : variant === "outlined"
            ? "btnOutlined"
            : "btnNoDesign",
          className
        )}
        // className={cn(
        //   `${icon && "flex items-center gap-2"} ${
        //     variant === "filled"
        //       ? filledClass
        //       : variant === "outlined"
        //       ? outlineClass
        //       : noDesignClass
        //   } text-sm md:text-base lg:text-lg xl:text-xl font-medium min-w-fit ${className}`
        // )}
        type={type}
      >
        {iconPosition === "left" && icon} {label}{" "}
        {iconPosition === "right" && icon}
      </button>
    </Link>
  ) : (
    <button
      key={label}
      className={cn(
        "text-sm md:text-base lg:text-lg xl:text-xl font-light min-w-fit",
        icon && "flex items-center gap-1 md:gap-2",
        variant === "filled"
          ? "btnFilled"
          : variant === "outlined"
          ? "btnOutlined"
          : "btnNoDesign",
        className
      )}
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {iconPosition === "left" && icon} {label} {children}
      {iconPosition === "right" && icon}
    </button>
  );
};

export default AppButton;
