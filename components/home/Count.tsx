"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Count = ({ amount }: { amount: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div ref={ref}>{inView ? <CountUp end={amount} duration={3} /> : null}</div>
  );
};

export default Count;
