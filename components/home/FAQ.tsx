import Image from "next/image";
import message from "@/assets/image/message.png";
import arrow from "@/assets/image/left-arrow.png";
import faq from "@/assets/image/faq.png";
import FaqCard from "./FaqCard";
import AnimationWrapper from "../ui/AnimationWrapper";

const FAQ = () => {
  const faqCards = [
    {
      title: "What is an SMM Panel?",
      text: "An SMM panel is an online platform that provides social media marketing (SMM) services, including engagement boosts like followers, likes, views, and comments. AcctPanel is a powerful SMM panel offering both engagement services and SMS verification. We help brands grow their social presence by providing seamless access to real interactions and verification solutions for various online platforms.",
    },
    {
      title: "What is SMS Service?",
      text: "SMS service allows users to send and receive text messages for verification, authentication, and communication purposes across various platforms. AcctPanel provides reliable SMS verification services, enabling users to receive one-time passwords (OTPs) and verification codes for different online platforms. This ensures seamless access to services like social media accounts, financial platforms, and other digital tools requiring phone verification.",
    },
    {
      title: "What payment options do you accept?",
      text: "At AcctPanel, we aim to provide seamless and convenient payment options, including debit/credit cards, cryptocurrency payments like BTC and USDT, and bank transfers for the Nigerian market.",
    },
    {
      title: "What services does AcctPanel offer?",
      text: "AcctPanel provides both SMS verification services and SMM panel solutions. For SMS services, we support verification for various online platforms, ensuring secure and seamless account creation and access. For social media marketing, we help boost engagement on platforms like Facebook, X (formerly Twitter), Telegram, YouTube, Instagram, Snapchat, and many more, offering services such as followers, likes, views, and comments.",
    },
  ];
  return (
    <section id="FAQ" className="container  scroll-m-28 md:scroll-m-44">
      <h1 data-aos="fade-right" className="heading max-w-[400px]">
        Frequently Asked Questions
      </h1>
      <p data-aos="fade-right" className="text-dark-grey text-lg font-light">
        Can’t find what you are looking for?
      </p>
      <div className="pt-2.5 md:grid grid-cols-2">
        <div data-aos="fade-right" className="">
          <h2 className="text-2xl">We would like to have a chat with you.</h2>
          <div className="flex gap-4">
            <Image
              src={message}
              width={60}
              height={60}
              className="aspect-square mt-5"
              alt="message icon"
            />
            <div className="">
              <Image
                src={arrow}
                width={70}
                height={40}
                className="flex-none h-fit"
                alt="message icon"
              />
            </div>
          </div>
          <div className="center justify-normal h-[85%] py-12">
            <Image
              src={faq}
              width={385}
              height={385}
              className="max-sm:w-1/2 aspect-square"
              alt="faq icon"
            />
          </div>
        </div>
        <div data-aos="fade-left" className="">
          {faqCards.map((faq, i) => (
            <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
              <FaqCard i={i} faq={faq} />
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
