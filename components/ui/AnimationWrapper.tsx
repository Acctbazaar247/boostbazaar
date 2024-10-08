"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useAppSelector } from "@/redux/hook";

type TAnimationWrapper = {
  children: ReactNode;
  keyValue?: string;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  transition?: MotionProps["transition"];
  className?: string;
};

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className
}: TAnimationWrapper) => {
  const theme = useAppSelector((state) => state.auth.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export default AnimationWrapper;
