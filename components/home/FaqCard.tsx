"use client";

import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

type TFaqCard = {
  faq: {
    title: string;
    text: string;
  };
  i: number;
};

const FaqCard = ({ faq, i }: TFaqCard) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-b-black/30 pb-6 ${
        i !== 0 && "pt-8 md:pt-12"
      }`}
    >
      <h2
        onClick={() => setOpen(!open)}
        className="text-xl md:text-2xl md:leading-9 pb-6 flex items-center gap-2.5 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <IoIosArrowUp className="text-dark-grey" />
        </motion.div>
        {faq.title}
      </h2>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ overflow: "hidden" }}
      >
        <p className="text-lg md:text-xl md:leading-7 font-light px-4 text-black/90">
          {faq.text}
        </p>
      </motion.div>
    </div>
  );
};

export default FaqCard;
