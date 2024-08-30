"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";
import { ImSpinner3 } from "react-icons/im";
import { PiSpinnerGap } from "react-icons/pi";

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
  disabled?: boolean;
  shadowDisabled?: boolean;
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
  disabled,
  shadowDisabled,
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
  ) : disabled ? (
    <button
      key={label}
      disabled={disabled}
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
      type={"button"}
    >
      {/* {iconPosition === "left" && icon} {label} {children}
      {iconPosition === "right" && icon} */}

      <ImSpinner3 className="text-center block mx-auto text-2xl font-bold animate-spin" />
    </button>
  ) : (
    <button
      key={label}
      disabled={disabled || shadowDisabled}
      className={cn(
        "text-sm md:text-base lg:text-lg xl:text-xl font-light min-w-fit",
        icon && "flex items-center gap-1 md:gap-2",
        variant === "filled"
          ? "btnFilled"
          : variant === "outlined"
          ? "btnOutlined"
          : "btnNoDesign",
        className,
        "disabled:bg-primary/50"
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
