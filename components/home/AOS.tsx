"use client";

import React, { useEffect } from "react";
import AOS from "aos";

export default function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: window.innerHeight * 0.1,
    });
  }, []);

  return <></>;
}
